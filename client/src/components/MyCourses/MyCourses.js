import React,{useEffect, useState,useContext} from 'react'
import Studentservice from '../../services/student-data-service'
import Course from './Course/Course'
import authService from '../../services/auth.service'
import styles from './MyCourses.module.css'
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
const MyCourses =()=>{
    
    const [courses,setcourses]=useState([])
    const [userdetails,setuserdetails]=useState({
        name:'',
        role:''
    })
    
    const authenticateduserCtx= useContext(AuthenticatedContext)
    useEffect(()=>{
        
        if(authenticateduserCtx.AuthenticatedUser)
        {
          console.log(authenticateduserCtx)
          if(authenticateduserCtx.AuthenticatedUser.teacher)
            {
              setuserdetails({
              name:authenticateduserCtx.AuthenticatedUser.teacher.fullname
            })
            }
          else if(authenticateduserCtx.AuthenticatedUser.student)
            {
              setuserdetails({
              name:authenticateduserCtx.AuthenticatedUser.student.fullname
            })}

            Studentservice.getCourses().then((response)=>{
                setcourses(response.data)
            })
        }

        
    },[])

   
    //console.log(userdetails)
    return (
        <div>
            <div className={styles.heading}>COURSES</div>
           { 
               courses.map((course,id)=>{
                    
                   return <Course key={id} coursename={course.name} instructor={userdetails.name} role={userdetails.role}/>
               })
            
            }
        </div>
    )
}

export default MyCourses;