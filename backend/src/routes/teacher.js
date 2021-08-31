const express = require('express')
const mongoose = require('mongoose')
const Teacher =require('../Models/teacher') 
const TeacherAuth=require('../middleware/TeacherAuth')
const Student = require('../Models/student')
const Course = require('../Models/course')
const Assignment = require ('../Models/assignment')
const encrypt = require('../GlobalMethods/encrypt')
const FindDifferanceInBothArrs=require('../GlobalMethods/FindDifferanceInBothArrs')
const multer = require('multer')
const File = require('../Models/file')
const fs=require('fs')
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
          name:req.body.coursename,
          instructor:req.teacher._id,
          description:req.body.description
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

router.get('/teacher/:courseid/getstudentslist', TeacherAuth,async(req,res)=>{
 
  try{
    // console.log("limit is "+parseInt(req.query.limit))
    // console.log("skip is "+parseInt(req.query.skip))
    // console.log(req.query)
   
    OwnerOfCourseFlag=req.teacher.CoursesList.includes(req.params.courseid)
  
    if(OwnerOfCourseFlag)
    {
      let TotalStudentsArrLength;
      //1. get student length
      await Course.findById(req.params.courseid)
      .populate({
        path:'studentsList'
      })
      .exec(function (err, course) {
        if (err) return handleError(err);
        //console.log(course.studentsList);
        TotalStudentsArrLength=course.studentsList.length;
      });

      await Course.findById(req.params.courseid)
      .populate({
        path:'studentsList',
        options:{
          limit:parseInt(req.query.limit),
          skip:parseInt(req.query.skip)
        }
      })
      .exec(function (err, course) {
        if (err) return handleError(err);

        console.log(TotalStudentsArrLength);
        res.send({studentsList:course.studentsList, TotalStudentsArrLength})
        
      });
    }
    else
      throw new error('You are not the owner of the course!')
  }catch(e){
    console.log(e)
    res.status(500).send(e)
  }
  
  

})




//Configuration for Multer
const multerStorage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, "public/files");
    
  },
  filename: (req, file, cb) => {
    //const ext = file.mimetype.split("/")[1];
    //console.log(file)
    var re = /(?:\.([^.]+))?$/;//regex
    var ext = re.exec(file.originalname)[1];   // extension extracted

    const assignment = new Assignment({
      name:req.body.name,
      course:req.params.courseid,
      description:req.body.description,
      status:'In-Progress', // 3-States--> In-Progress, Submitted, Deadline-Passed
      DueDate: req.body.duedate,
      
      grade: undefined
      })

    const newFile = new File({
      name: file.originalname,
      ext:ext,
      assignment:assignment._id

    });
    newFile.save().then()

    assignment.assignmentfile=newFile._id;
    
    assignment.save().then() //save assignment
    req.assignment=assignment
    //console.log(req.body)
    req.assignmentid=assignment._id;
    

    Assignment.findByIdAndUpdate(req.assignmentid,{assignmentfile:newFile._id})
      .then()
      .catch((e)=>console.log(e))

    //Add assignment to student
    Student.find().then((students)=>{
        students.forEach((student)=>{
          if(student.CoursesList.includes( mongoose.Types.ObjectId(req.params.courseid)))
            student.assignmentsList.push({
              assignment: req.assignmentid,
              SubmissionStatus: 'Available-To-Submit-Attempt'
            })      
          //console.log(student)
          student.save().then()
        })

      //console.log(students)
    })
    
    cb(null, `assignment-${req.assignmentid}.${ext}`); //save file uploaded in its destination (/public/files) 

  }
});

// Multer Filter to filter files types
const multerFilter = async(req, file, cb) => {
  if(!file.originalname.match(/\.(pdf|docx|doc)$/)) //if file extension is not jpg or jpeg or png
    return cb(new Error('Please upload only pdf or docx or doc'))  //return error using the callback
  
  
  const course=await Course.findById(req.params.courseid);
  if(!course)
    throw new Error('No course with this courseid')
  if(course.instructor.toString() !== req.teacher._id.toString())
    throw new Error('This is not your course to upload an assignment to!!')
  

  cb(null,true)
  
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post('/teacher/:courseid/createassignment',TeacherAuth,upload.single('myFile'),async(req,res,next)=>{

  try{
    //console.log(req.name)

  // req.assignmentid=assignment._id
    //console.log(req.assignmentid)

    const course=await Course.findById(req.params.courseid);
    course.assignmentsList.push(req.assignmentid)
    //console.log(course)
    await course.save()
    res.status(200).send(req.assignment)
    //next() // go to the next middleware upload.single, which is called in line 503
  }catch(e){
    res.status(500).send('couldnt create new file')
    console.log(e)
  }
})


router.get('/teacher/:courseid/getassignments',async(req,res)=>{

  try{
    const course=await Course.findById(req.params.courseid);
    if(!course)
      throw new Error('No coures with this courseid')

    if(course.instructor.toString() !== req.teacher._id.toString()) 
      throw new Error('This is not your course to get assignments from!!')

    await Course.
      findById(req.params.courseid). 
      populate('assignmentsList').
      exec(function (err, course) {
        if (err) return handleError(err);
        //console.log(course.assignmentsList);
        res.send(course.assignmentsList)
        
      });
  }catch(e){
    console.log(e)
    res.status(500).send(e.message)
  }
})

router.patch('/teacher/:courseid/deleteassignment/:assignmentid', TeacherAuth,async(req,res)=>{

  try{
  console.log(req.params)
  //First check if teacher is the owner of this assignment (by using courseid and searching for this course in the teacher)
  const OwnerOfAssignmentFlag=req.teacher.CoursesList.includes(mongoose.Types.ObjectId(req.params.courseid));
  if(OwnerOfAssignmentFlag)
  {
    //1. delete assignment from Course
    const course=await Course.findById(req.params.courseid)
    //console.log(course)
    //console.log(course.assignmentsList)
    const AssignmentFound=course.assignmentsList.includes(mongoose.Types.ObjectId(req.params.assignmentid))
    if(!AssignmentFound)
      throw new Error('Assignment Not found in course')

    course.assignmentsList=course.assignmentsList.filter((assID)=>{
      return (assID.toString()!==req.params.assignmentid)
    })
    await course.save()


  
    //2.delete assignment from student
    Student.find().then((students)=>{
      students.forEach((student)=>{
        if(student.CoursesList.includes( mongoose.Types.ObjectId(req.params.courseid)))
          student.assignmentsList=student.assignmentsList.filter((ass)=>{
            return(ass.assignment.toString() !== req.params.assignmentid)
          })
        //console.log(student)
        student.save().then()
      })

    //console.log(students)
    })
    
    let ext='';

    //3.delete the actual file from destination
    await Assignment.findById(req.params.assignmentid) //we extract the extenstion of file by doing 
      .populate('assignmentfile')
      .exec(function(err,assignment){
        //console.log(assignment)
        ext=assignment.assignmentfile.ext

        var filePath =`public/files/assignment-${req.params.assignmentid}.${ext}`
        fs.unlinkSync(filePath); //Delete the file 
      })
  

    //4. delete the assignment file instance pointed at by the assignment
      const assignmentfileID=await Assignment.findById(req.params.assignmentid).then((assignment)=>assignment.assignmentfile)
      await File.findByIdAndDelete(assignmentfileID)

    //5.delete  Assignment from Assignment model
    await Assignment.findByIdAndDelete(req.params.assignmentid)


    //Send back course.assignmentsList as response
    await Course.
    findById(req.params.courseid). 
    populate('assignmentsList').
    exec(function (err, course) {
      if (err) return handleError(err);
      //console.log(course.assignmentsList);
      res.send(course.assignmentsList)
    });

  }
  else
    throw new Error("You're not the owner of this assignment!!")

    
  }catch(e){
    console.log(e)
    res.status(500).send(e.message)
  }
})

router.get('/teacher/:courseid/assignments/:assignmentid',(req,res)=>{
  try{
    let ext='';
    Assignment.findById(req.params.assignmentid)
      .populate('assignmentfile')
      .exec(function(err,assignment){
        if(err)
          throw new Error('couldnt populate')
        ext=assignment.assignmentfile.ext

        // console.log('fileController.download: started')
      var filePath =`public/files/assignment-${req.params.assignmentid}.${ext}`
      res.download(filePath); // Set disposition and send it.
      })
     

  }catch(e){
    res.status(500).send(e.message)
    console.log(e)
  }
  
})

module.exports=router