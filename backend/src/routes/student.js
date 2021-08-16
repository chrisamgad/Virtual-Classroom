const express = require('express')
const Student = require('../Models/student')// requiring student model
encrypt = require('../GlobalMethods/encrypt')


var router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Student!')
  })

  router.post('/signup', async (req,res)=>{   
    try{
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
      res.send(e)
      console.log(e)
    }
  })

  router.post('/login', async(req,res)=>{
    try{
      const student= await Student.FindCredentials(req.body.email,req.body.password)
      if (!student)
        {
          res.send('Incorrect email or password').status(404)
        }
      else  
        res.send(student).status(200)
        
    }catch(e){
      console.log(e)
      }
  })

module.exports=router