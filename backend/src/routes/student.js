const express = require('express')
const Student = require('../Models/student')// requiring student model
encrypt = require('../GlobalMethods/encrypt')


var router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Student!')
  })

  router.post('/signup', async (req,res)=>{   
    try{
      const DuplicateSudentFound=await Student.findOne({email:req.body.email})
      if(DuplicateSudentFound)
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

  router.post('/login', async(req,res)=>{
    try{
      const student= await Student.FindCredentials(req.body.email,req.body.password)
      if (!student)
        {
          return res.send('Incorrect email or password').status(404)
        }
        
      res.send(student).status(200)
        
    }catch(e){
      res.send(e).status(500)
      console.log(e)
      }
  })

module.exports=router