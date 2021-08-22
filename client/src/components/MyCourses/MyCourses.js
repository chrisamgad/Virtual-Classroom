import React,{useEffect, useState,useContext} from 'react'
import Studentservice from '../../services/student-data-service'
import Course from './Course/Course'

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
      
      // authenticateduserCtx.SetAuthenticatedUser()
        if(authenticateduserCtx.AuthenticatedUserRole==="student")
        {
            console.log(authenticateduserCtx.AuthenticatedUser.student.fullname)
            setuserdetails({
                name:authenticateduserCtx.AuthenticatedUser.student.fullname,
                role:authenticateduserCtx.AuthenticatedUser.student.role
            })
            Studentservice.getCourses().then((response)=>{
                //console.log(response)
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