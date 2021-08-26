import React from 'react';
import {useContext,useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import CourseContext from '../../Contexts/CourseContext';
import Student from './Student/Student'
import styles from './ViewStudents.module.css'
import studentDataService from '../../services/student-data-service';
const ViewStudents = ()=>{

    const {courseid}=useParams()
    const courseCtx=useContext(CourseContext)
    const [studentsincourse,setstudentsincourse]=useState([])

    useEffect(()=>{
        console.log(courseid)
        
        studentDataService.getCurrentStudents(courseid)
            .then((res)=>{
                const students=res.data;
                setstudentsincourse(students)
                courseCtx.SetWentInsideCourse(true)
            })
            .catch((e)=>console.log(e))
    },[])

    console.log(studentsincourse)
    return(
        <div>
            <p className={styles.heading}>Students Enrolled in the Course</p>
            <div className={styles.StudentsContainer}>
                {studentsincourse.map((student,index)=><Student index={index+1} student={student}/>) }
           </div>
        </div>
    )
}

export default ViewStudents;