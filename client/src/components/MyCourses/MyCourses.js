import React,{useEffect, useState} from 'react'
import Studentservice from '../../services/student-data-service'
const MyCourses =()=>{
    
    const [courses,setcourses]=useState([])
    //console.log(courses)
    useEffect(()=>{
        
        Studentservice.getCourses().then((response)=>{
            setcourses(response.data)
        })
    },[])

    
    return (
        <div>
           {
               courses.map((course)=>{
                   return <div>{course.name}</div>
               })
            
            }
           
        </div>
    )
}

export default MyCourses;