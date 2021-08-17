const express = require('express')
const Student = require('../Models/student')// requiring student model
const StudentAuth=require('../middleware/StudentAuth')
const requireRole=require('../middleware/requirerole')
const encrypt = require('../GlobalMethods/encrypt')


var router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Student!')
  })

  router.post('/signup', async (req,res,next)=>{   
    
      const student=await Student.findOne({email:req.body.email})
      if(student.role !=='Student')
        next('route') //go to next route functionality with same endpoint, which is the /signup for teachers routes
      else
        next() //next to the function below
  
  },async function(req,res){ //2nd arg function in case next() was called above
      try{
      const DuplicateStudentFound=await Student.findOne({email:req.body.email})
      if(DuplicateStudentFound)
        return res.send('An account already exists with same email').status(500)
        
      const student=new Student({
        fullname:req.body.fullname,
        email:req.body.email,
        password: await encrypt.encryptPass(req.body.password),
        mobilenumber:req.body.mobilenumber,
        role:req.body.role
      });


      await student.save()
      const token=  await student.GenerateAuthToken()
      res.send({student,token}).status(200);
    }catch(e){
      res.send(e).status(500)
      console.log(e)
    }
  })

  router.post('/login', async (req,res,next)=>{
    
      const student= await Student.FindCredentials(req.body.email,req.body.password)
      if(student.role !=='student')
        next('route') //go to next route with same endpoint, which is the /login for teachers routes
      else
        next() //next to the function below

    }, async function(req,res,next){
        try{
        const student= await Student.FindCredentials(req.body.email,req.body.password)
        if (!student)
            return res.send('Incorrect email or password').status(404)
        
        const token=  await student.GenerateAuthToken()
        res.send({student,token}).status(200)
          
      }catch(e){
        res.send(e).status(500)
        console.log(e)
        }
  })


  router.get('/student/myprofile',StudentAuth, (req,res)=>{
    try{
      
      let student= ({...req.student}._doc);
        
      //exclude tokens array and password to be sent to user for better security
      delete student.tokens;
      delete student.password;

      res.send(student).status(200)
    }catch(e){
      res.send(e)
      console.log(e)
    }
  })

module.exports=router