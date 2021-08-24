const express = require('express')
const Teacher =require('../Models/teacher') 
const TeacherAuth=require('../middleware/TeacherAuth')
const Student = require('../Models/student')
const Course = require('../Models/course')
const encrypt = require('../GlobalMethods/encrypt')
const FindDifferanceInBothArrs=require('../GlobalMethods/FindDifferanceInBothArrs')

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

    res.send({teacher,role:teacher.role}).status(200)
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

router.patch('/teacher/updatecourses', TeacherAuth,async(req,res)=>{

  try{
    const teacher=req.teacher;
    const ReceivedcoursesArr=req.body.courses;
    // console.log(teacher.CoursesList)
    const ReceivedcoursesIDsArr= ReceivedcoursesArr.map((course)=>course._id.toString()) 
    const CurrentTeachersCoursesIDs=teacher.CoursesList
    CurrentTeachersCoursesIDs== CurrentTeachersCoursesIDs.map((course)=>course._id.toString()) 
    // console.log(CurrentTeachersCoursesIDs)
    // console.log(ReceivedcoursesIDsArr)
 

    //1. update new courses list of teacher
    teacher.CoursesList=ReceivedcoursesIDsArr
    teacher.save()  
    //console.log(teacher.CoursesList)
    
    
    //2. remove any courses from Course model with filtered IDs
     CoursesIDsToBeRemoved=FindDifferanceInBothArrs(CurrentTeachersCoursesIDs,ReceivedcoursesIDsArr);
     console.log(CoursesIDsToBeRemoved)
     if(CoursesIDsToBeRemoved.length >0)
        CoursesIDsToBeRemoved.forEach(courseID => {
          Course.findByIdAndDelete(courseID).then((res)=>console.log(res)).catch(e=>console.log(e))
        })
      else if(CoursesIDsToBeRemoved.length ===0)
      {
        console.log('test')
        await Course.deleteMany({})
      }
        


    //3. update courseList in student (dawar 3la kol elstudents elwa5deen elcourse da)
    //This is too complex, dawar 3la tare2a tanya w 7awel tesala7ha
    console.log('start here')
      Student.find({}).then((students)=>{   
          students.forEach(student=>{
            //console.log(student.fullname)
              CoursesIDsToBeRemoved.forEach((courseID)=>{
                const CourseList=student.CoursesList
                student.CoursesList=CourseList.filter((course_id)=>{
                    return (courseID.toString() !== course_id.toString() )
                  })
                //console.log(CourseList)
              })
          //console.log(student)
          student.save().then()
      })
    })  


    res.status(200).send(teacher.CoursesList)
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
  //takes in from client req.body.course_id --> course id and req.body.email--> student email
    const teacher=req.teacher;
    //res.send(teacher)
    const student = await Student.findOne({email:req.body.email}) //student email to be input by teacher in front end
   //courseid to be sent by frontend
    if(student) //if student was found with this email
      { 
        const StudentAlreadyEnrolledInCourse= student.CoursesList.some((courseID)=>{
          return(courseID.toString() === req.body.course_id)
            
        })
        //console.log(StudentAlreadyEnrolledInCourse)
        if(StudentAlreadyEnrolledInCourse)
          throw new Error('Student already is enrolled in this course')

        const courseFoundInTeacher=  teacher.CoursesList.some((courseID)=>{
          return (courseID.toString() === req.body.course_id)
        })
        if(!courseFoundInTeacher)
          throw new Error('No course with this ID')
      
        const course= await Course.findById(req.body.course_id)
        course.studentsList.push(student._id)// add student to course studentlist
        //console.log(course)
        await course.save()

        student.CoursesList.push(course._id)//add course to student coursesList
        await student.save()
        res.send({student,course})
    }
    else
      res.status(404).send('No student with this email')
  }catch(e){
    res.status(500).send(e)
    console.log(e)
  }
})


router.patch('/teacher/removestudent', TeacherAuth,async (req,res)=>{
  try{
    //takes in from client req.body.course_id --> course id and req.body.email--> student email
    const teacher=req.teacher;
    const student = await Student.findOne({email:req.body.email}) //student email to be input by teacher in front end
    //const courseID=req.body.course_id;
    if(student)
    {   
      const courseIDFoundInTeacherCourses=  teacher.CoursesList.some((courseID)=>{
        return (courseID.toString() === req.body.course_id)
      })
      
      if(!courseIDFoundInTeacherCourses)
        throw new Error('No course with this ID')

      const courseIDFoundInStudents=  student.CoursesList.some((courseID)=>{
        return (courseID.toString() === req.body.course_id)
      })
      //console.log(courseIDFoundInStudents)
      
      
      if(!courseIDFoundInStudents)
        throw new Error('Student isnt enrolled already in this course')

      
      //remove student from course Model
      await Course.findById(req.body.course_id)
        .populate('studentsList')
        .exec(function(err,course){
          if (err) 
            return handleError(err);
          //console.log(student.studentsList)
          const NewstudentsArr=course.studentsList.filter((Student)=>{
            return (Student.email !== req.body.email)
          })
          course.studentsList=NewstudentsArr
          course.save().then((course)).catch((e)=>console.log(e))
          //console.log(course)
        })

      //remove course from student model
      const updatedCoursesList= student.CoursesList.filter((courseID)=>{
        return(courseID.toString() !==req.body.course_id)
      })
      //console.log(updatedCoursesList)
      student.CoursesList=updatedCoursesList
      await student.save()

      res.send(student)
  
    }
    else
      res.status(404).send('No student with this email')
    
  }catch(e){
    console.log(e)
    res.status(500).send(e)
  }
})

router.get('/getstudentslist', TeacherAuth,async(req,res)=>{
  await Teacher.
    findOne({email: req.teacher.email}). //find the teacher email that we want to populate the StudentsList of
    populate('StudentsList').
    exec(function (err, teacher) {
      if (err) return handleError(err);
      console.log(teacher.StudentsList);
      res.send(teacher.StudentsList)
      
    });

})


module.exports=router