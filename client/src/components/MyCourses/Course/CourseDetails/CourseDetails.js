import React,{useState,useContext, useEffect} from 'react'
import CourseContext from '../../../../Contexts/CourseContext';


const CourseDetails = ()=>{

    const courseCtx=useContext(CourseContext)
    
    useEffect(()=>{
        courseCtx.SetWentInsideCourse(true)
        //console.log(courseCtx.SetInsideCourseBool)
    },[])

    console.log(courseCtx)
    return(
        <div>
            <button>test</button>
        </div>
    )
}

export default CourseDetails;