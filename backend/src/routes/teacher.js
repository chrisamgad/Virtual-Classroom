const express = require('express')
const Teacher =require('../Models/teacher') 
const TeacherAuth=require('../middleware/TeacherAuth')
const Student = require('../Models/student')
const Course = require('../Models/course')
const encrypt = require('../GlobalMethods/encrypt')

var router = express.Router()

 
router.post('/teacher-signup',async(req,res)=>{ //API Only known by admin as only I can create email and password
    //res.send("Still teachers signup page is not done. Credentiials are provided physically by admin")

    try{
      const DuplicateTeacherFound=await Teacher.findOne({email:req.body.email})
      if(DuplicateTeacherFound)
        return res.send('An account already exists with same email').status(500)
        
      const teacher=new Teacher({
        fullname:req.body.fullname,
        email:req.body.email,
        password: await encrypt.encryptPass(req.body.password),
        mobilenumber:req.body.mobilenumber,
        role:req.body.role
      });
      await teacher.save()
      const token=  await teacher.GenerateAuthToken()
    res.send({teacher,token}).status(200);
    }catch(e){
      res.send(e).status(500)
      console.log(e)
    }
  })

router.post('/login',async(req,res)=>{
  try{
    const teacher= await Teacher.FindCredentials(req.body.email,req.body.password)
    if (!teacher)
        return res.send('Incorrect email or password').status(404)
    
    const token=  await teacher.GenerateAuthToken()
    res.send({teacher,token}).status(200)
      
  }catch(e){
    res.send(e).status(500)
    console.log(e)
  }
})

router.post('/logout', TeacherAuth,async (req,res)=>{

    try{
      //Removes the current token from the array of tokens(array of currently logged in sessions)
      req.teacher.tokens= req.teacher.tokens.filter((token)=>{
          return token.token !== req.token //if token not equal the current token, return it
      })
      await req.teacher.save() //save

      res.send(req.teacher)
      
  }catch(e){
      res.send(e).status(500)
  }
})

router.get('/myprofile',TeacherAuth, (req,res)=>{
  try{
    
    let teacher= ({...req.teacher}._doc);
    
    //exclude tokens array and password to be sent to user for better security
    delete teacher.tokens;
    delete teacher.password;

    res.send(teacher).status(200)
  }catch(e){
    res.send(e)
    console.log(e)
  }
})



router.post('/teacher/createcourse',TeacherAuth,async(req,res)=>{
  try{
      const course= new Course({
          name:req.body.name,
          instructor:req.teacher._id
      })
      //console.log(course._id)
      req.teacher.CoursesList.push(course._id)
      await req.teacher.save()
      await course.save()
      res.send(course)

  }catch(e){
      console.log(e)
      res.status(500).send(e)
  }
})

router.get('/teacher/getmycourses',TeacherAuth,async(req,res)=>{
    try{
      const teacher=req.teacher;
      
      Teacher.findOne({email:teacher.email}) //send the CoursesList array to frontend that the teacher authenticated with this email has
        .populate('CoursesList')
        .exec(function(err,teacher){
          if(teacher)
            res.status(200).send(teacher.CoursesList)
          else
            throw new Error(err);
        })
      
    }catch(e){
      console.log(e)
      res.status(500).send(e)
    }
})

router.get('/teacher/getmycourse/:id',TeacherAuth,async(req,res)=>{
  try{
    const courseID=req.params.id

    const teacher=req.teacher;
    Teacher.findOne({email:teacher.email}) //send the CoursesList array to frontend that the teacher authenticated with this email has
      .populate('CoursesList')
      .exec(function(err,teacher){
        if(teacher)
        {
            const course=  Course.findById(courseID).then((course)=>{
              if(course)
                res.status(200).send(course)
              else
                throw new Error('no course found with this ID')
            }).catch((e)=>{
              console.log(e)
              res.status(404).send(e)
            })
        }
          
        else
          throw new Error(err);
      })
    
  }catch(e){
    console.log(e)
    res.status(500).send(e)
  }
})

router.patch('/teacher/removecourse/:id',TeacherAuth, async(req,res)=>{
  try{
    
    const teacher=req.teacher
    const InitialCoursesList=await Course.find({instructor:teacher._id}) //send the CoursesList array to frontend that the teacher authenticated with this email has
    console.log(InitialCoursesList.length)
    const UpdatedCoursesIDList = InitialCoursesList.filter((course)=>{
      if(course._id.toString() !== req.params.id.toString())  
          return true
        
      else //if id matches the id of the course we want to delete
        {
          // console.log(course._id.toString())
          // console.log('req.params.id is '+req.params.id.toString())
          Course.findByIdAndDelete(req.params.id).then((course))
          return false
        }
    })
    .map((course)=>{
      return course._id
    })

    //console.log(UpdatedCoursesIDList.length) 

    if(UpdatedCoursesIDList.length === InitialCoursesList.length)
      {
        throw new Error('ID of course was not found')
      }
    else{
      teacher.CoursesList=UpdatedCoursesIDList; //update the courses list in the teacher
      await teacher.save()//save the new teacher
      res.send(teacher.CoursesList)
    }


  }catch(e){
    console.log(e)
    res.status(500).send(e)
  }
})

router.post('/teacher/addstudent', TeacherAuth,async (req,res)=>{
  try{

    const teacher=req.teacher;
    //res.send(teacher)
    const student = await Student.findOne({email:req.body.email}) //student email to be input by teacher in front end
   //courseid to be sent by frontend
    if(student) //if student was found with this email
      { 
        const StudentAlreadyEnrolledInCourse= student.CoursesList.some((courseID)=>{
          return(courseID.toString() === req.body._id)
            
        })
        //console.log(StudentAlreadyEnrolledInCourse)
        if(StudentAlreadyEnrolledInCourse)
          throw new Error('Student already is enrolled in this course')

        const courseFoundInTeacher=  teacher.CoursesList.some((courseID)=>{
          return (courseID.toString() === req.body._id)
        })
        if(!courseFoundInTeacher)
          throw new Error('No course with this ID')
      
        const course= await Course.findById(req.body._id)
        course.studentsList.push(student._id)// add student to course studentlist
        //console.log(course)
        await course.save()

        student.CoursesList.push(course._id)//add course to student coursesList
        await student.save()
        res.send(student)
    }
    else
      res.status(404).send('No student with this email')
  }catch(e){
    res.status(500).send(e)
    console.log(e)
  }
})


router.patch('/removestudent', TeacherAuth,async (req,res)=>{
  try{

    const student = await Student.findOne({email:req.body.email}) //student email to be input by teacher in front end
    const teacherStudentsList= req.teacher.StudentsList;
    if(teacherStudentsList.length>0)
    {
      const newteacherStudentsList=teacherStudentsList.filter((teacher_student_id)=>{
        return (teacher_student_id.toString() !== student._id.toString() )
      })
      
      req.teacher.StudentsList=newteacherStudentsList; //update new StudentsList in the teacher model
      await req.teacher.save()
      // console.log(req.teacher)
      res.send(req.teacher).status(200)
    }
    else{
     // console.log('No students in StudentsList array')
      res.send('There are no students to remove').status(500)
    }
    
  }catch(e){

  }
})

router.get('/getstudentslist', TeacherAuth,async(req,res)=>{
  await Teacher.
    findOne({email: req.teacher.email}). //find the teacher email that we want to populate the StudenstList of
    populate('StudentsList').
    exec(function (err, teacher) {
      if (err) return handleError(err);
      console.log(teacher.StudentsList);
      res.send(teacher.StudentsList)
      
    });

})


module.exports=router