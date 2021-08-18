const express = require('express')
const Teacher =require('../Models/teacher') 
const TeacherAuth=require('../middleware/TeacherAuth')
const Student = require('../Models/student')
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

router.post('/addstudent', TeacherAuth,async (req,res)=>{
  try{
    const teacher=req.teacher;
    //res.send(teacher)
    const student = await Student.findOne({email:req.body.email}) //student email to be input by teacher in front end
    if(student) //if student was found with this email
      {
        //console.log(teacher.StudentsList[5].email)
        let teacherStudentsList=teacher.StudentsList;
        if (teacherStudentsList.length !== 0 ) {//if teacherStudentList size is more than 0
          //check if email is alredy there in studentsList
          let containsDuplicateID = teacherStudentsList.some( teacher_student_id =>{
            return teacher_student_id.toString() === student._id.toString()
          })
        
          //console.log(containsDuplicateID) 
          if(containsDuplicateID) //if email was found in StudentsList
          {
            console.log('email already found in students list')
            res.send('This student is already found in your students list')
          }
        
          else{//if email was not found in StudentsList
            //console.log(student._id)
            teacher.StudentsList.push(student._id)
            await teacher.save()
           // console.log('student added to list')
            res.send(teacher)
          }
        }
        else{//if teacherStudentsList didnt exist or has no elements yet
          teacher.StudentsList.push(student._id)
          await teacher.save()
          //console.log('student added to list')
          res.send(teacher)
        }
        //console.log(teacher.StudentsList)
      }
    else
      res.send('No student with this email')
  }catch(e){
    res.send(e)
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
    findOne({email: req.teacher.email}).
    populate('StudentsList').
    exec(function (err, teacher) {
      if (err) return handleError(err);
      console.log(teacher.StudentsList);
      res.send(teacher.StudentsList)
      // prints "The author is Ian Fleming"
    });

})


module.exports=router