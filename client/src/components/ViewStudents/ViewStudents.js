import React from 'react';
import {useContext,useEffect} from 'react'
import CourseContext from '../../Contexts/CourseContext';


const ViewStudents = ()=>{

    const courseCtx=useContext(CourseContext)
    useEffect(()=>{
        courseCtx.SetWentInsideCourse(true)
    },[])
    return(
        <div>
            View Students
        </div>
    )
}

export default ViewStudents;