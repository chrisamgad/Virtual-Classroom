import React,{useEffect, useState,useContext} from 'react'
import Studentservice from '../../services/student-data-service'
import Course from './Course/Course'

import styles from './MyCourses.module.css'
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
import CourseContext from '../../Contexts/CourseContext'

const MyCourses =()=>{
    
    const [courses,setcourses]=useState([])
    const [userdetails,setuserdetails]=useState({
        name:'',
        role:'',
        instructorname:'',
        studentslist:[]
    })
    
   const authenticateduserCtx= useContext(AuthenticatedContext)
   const courseCtx=useContext(CourseContext)

    useEffect(()=>{
        courseCtx.SetWentInsideCourse(false);
      // authenticateduserCtx.SetAuthenticatedUser()
        if(authenticateduserCtx.AuthenticatedUserRole==="student")
        {
            //console.log(authenticateduserCtx.AuthenticatedUser.student.fullname)
            setuserdetails({
                name:authenticateduserCtx.AuthenticatedUser.student.fullname,
                role:authenticateduserCtx.AuthenticatedUser.student.role
            })
            Studentservice.getCourses().then((response)=>{
                console.log(response)
                setcourses(response.data)
              }).catch((e)=>console.log(e))
        }
        else if (authenticateduserCtx.AuthenticatedUserRole==="teacher")
        {
            //console.log(authenticateduserCtx.AuthenticatedUser.teacher.fullname)
            setuserdetails({
                name:authenticateduserCtx.AuthenticatedUser.teacher.fullname,
                role:authenticateduserCtx.AuthenticatedUser.teacher.role
            })
            Studentservice.getCourses().then((response)=>{
               // console.log(response.data)
                setcourses(response.data)
              }).catch((e)=>console.log(e))
        }
        else{    
            console.log('Not authorised to enter the mycourses page')
            setuserdetails({
                name:'',
                role:''
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authenticateduserCtx])

    const getInstructorName =(course)=>{
        const instructorname=course.instructor.fullname
        console.log(instructorname)
        return instructorname
    }

    //console.log(userdetails)
    return (
        <div>
            <div className={styles.heading}>COURSES</div>
           { 
               courses.map((course,id)=>{
                    
                   return <Course key={id} coursename={course.name} courseID={course._id.toString()} instructor={getInstructorName(course)} role={userdetails.role}/>
               })
            
            }
        </div>
    )
}

export default MyCourses;