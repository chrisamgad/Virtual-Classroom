const express = require('express')
const Student = require('../Models/student')// requiring student model
const StudentAuth=require('../middleware/StudentAuth')
const encrypt = require('../GlobalMethods/encrypt')
const Teacher = require('../Models/teacher')

var router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Student!')
  })

  router.post('/signup', async (req,res)=>{   
    
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
      let teacher=undefined; //initially null
      const student= await Student.FindCredentials(req.body.email,req.body.password) 
      if (!student) //if no student was found, search for teacher credentials in teachers collection
        {
          teacher= await Teacher.FindCredentials(req.body.email,req.body.password) 
          //console.log(teacher)
          if(teacher) //if teacher was found
            next('route') //go to next route with same endpoint, which is the /login for teachers routes  
          else //no teacher and student was found 
            return res.send({error: 'Incorrect email or password'}).status(404)
        }  
      else
        next() //next to the function below for student to handle student login

    }, async function(req,res){
        try{
        const student= await Student.FindCredentials(req.body.email,req.body.password)
        if (!student)
            return res.send({error: 'Incorrect email or password'}).status(404)
        
        const token=  await student.GenerateAuthToken()
        res.send({student,token}).status(200)
          
      }catch(e){
        res.send(e).status(500)
        console.log(e)
        }
  })

  router.post('/logout', StudentAuth(true),async function(req,res){
      try{
        //Removes the current token from the array of tokens(array of currently logged in sessions)
        req.student.tokens= req.student.tokens.filter((token)=>{
            return token.token !== req.token //if token not equal the current token, return it
        })
        await req.student.save() //save

        res.send(req.student)
        
    }catch(e){
        res.send(e).status(500)
    }
  })

  router.get('/myprofile',StudentAuth(true), (req,res)=>{
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