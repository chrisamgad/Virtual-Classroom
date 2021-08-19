const express = require('express')
const Student = require('../Models/student')// requiring student model
const StudentAuth=require('../middleware/StudentAuth')
const encrypt = require('../GlobalMethods/encrypt')
const Teacher = require('../Models/teacher')
const fs =require('fs')
const multer = require('multer') //for uploading images
const sharp =require('sharp')

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


  const upload=multer({
    // dest: 'avatars', //destination of where to store the files that are getting uploaded
    //if dest is commented, the data is going to be passed to the route function instead of the file system 
    limits:{
         fileSize:1000000 //max file size 1Mb = 1*10^6
     },
     fileFilter(req,file,cb){ //function that gets executed to check for file extension
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) //if file extension is not jpg or jpeg or png
             return cb(new Error('Please upload only jpg or jpeg or png'))  //return error using the callback
         
         cb(undefined,true) //if we reached this line, upload the file successfully
     //Note: 3 ways to use callback
     //     cb(new Error('File must be a pdf')) //Rejects file AND send back an error to person uploading file via callback
     //     cb(undefined,true)//first arg undefined because no error, and 2nd arg is true bec upload is expected
     //     cb(undefined,false)//Rejects file but doesnt send error back
     }
 })



  router.post('/uploadavatar',StudentAuth(true), upload.single('upload'), async (req,res)=>{
   
   
  
      if(!req.file) //if no picture was chosen by user, just use the default avatar instead that is found in the public/img/defaultavatar
      { 
        const buffer = await sharp('./public/img/defaultavatar.png').resize({width:175, height:175}).png().toBuffer()
        
        req.student.avatar=buffer //req.file.buffer contains the binary data of time file
        //console.log(buffer)
                    //then we do toBuffer() to change the binary back to buffer
        await req.student.save()
        console.log('uploaded successfully default avatar')
        res.send('uploaded successfully default avatar')

      }
      else{
        const buffer = await sharp(req.file.buffer).resize({width:175, height:175}).png().toBuffer()
        req.student.avatar=buffer //req.file.buffer contains the binary data of time file              //then we do toBuffer() to change the binary back to buffer
        console.log(req.file)
        await req.student.save()
        console.log('uploaded successfully')
        res.send('uploaded successfully')
      }

    },(error,req,res,next)=>{ //This allows us to handle express error and send back error in JSON
      res.status(400).send({error: error.message}) //error.message is a message that holds the error that occured throughout the route handling
    })

  router.get('/getavatar/:id', async (req,res)=>{
    try{
        const student =await Student.findById(req.params.id) //find user by id provided

        if(!student || !student.avatar) // if no user or his avatar found, produce an error
            throw new Error('No avatar stored')
                                            //Normally, by default Express is smart enough to implicity set the header in every route handing we've made to return JSON to API as content-type in response
                                            //If we would do it explicitly, we do it by the following code line -->  res.set('Content-Type','application/json')
        res.set('Content-Type','image/png') //sets the Content-type header in the response as image/jpg 
        res.send(student.avatar) //send the avatar
    }catch(e){
        res.status(404).send()
    }
})

  router.post('/testuploadimage',upload.single('upload'),  (req,res)=>{
    
     try{
       console.log(req.file)
       res.send('success')
     }catch(e){
       console.log(e)
     }
})

module.exports=router