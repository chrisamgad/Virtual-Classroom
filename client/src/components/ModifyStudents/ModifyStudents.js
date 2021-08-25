import React from 'react';
import {useContext,useEffect} from 'react'
import CourseContext from '../../Contexts/CourseContext';


const ModifyStudents = ()=>{

    const courseCtx=useContext(CourseContext)
    
    useEffect(()=>{
        courseCtx.SetWentInsideCourse(true)
        console.log('test')
    },[])

    return(
        <div>
            Modify Students 
        </div>
    )
}

export default ModifyStudents;