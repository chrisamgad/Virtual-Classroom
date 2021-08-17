const express = require('express')
const Teacher =require('../Models/teacher') 
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
module.exports=router