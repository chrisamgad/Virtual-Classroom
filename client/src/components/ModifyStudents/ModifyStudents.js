import React from 'react';
import {useContext,useEffect} from 'react'
import CourseContext from '../../Contexts/CourseContext';
import styles from './ModifyStudents.module.css'

const ModifyStudents = ()=>{

    const courseCtx=useContext(CourseContext)
    
    useEffect(()=>{
        courseCtx.SetWentInsideCourse(true)
        
    },[])

    return(
        <div>
            <p className={styles.heading}>Modify Students</p> 
            <div className={styles.StudentsContainer}>

            </div>
        </div>
    )
}

export default ModifyStudents;