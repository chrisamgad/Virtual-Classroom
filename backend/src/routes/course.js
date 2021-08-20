const express=require('express')
var router = express.Router()

const Course = require('../Models/course')
const Student = require('../Models/student')
const TeacherAuth =require('../middleware/TeacherAuth')



router.post('/courses/:id/addstudent', TeacherAuth,async (req,res)=>{
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

module.exports=router;