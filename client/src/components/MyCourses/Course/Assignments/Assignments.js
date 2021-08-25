import React,{useContext,useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import CourseContext from '../../../../Contexts/CourseContext'
import styles from './Assignments.module.css'
import Assignment from './Assignment/Assignment'
const Assignments = ()=>{

    let history=useHistory()
    const courseCtx=useContext(CourseContext)
    const [assignments,setassignments]=[]

    useEffect(()=>{
            
        courseCtx.SetWentInsideCourse(true)
            
        
    },[])
    //console.log('test')
    return(
        <div>
            <div className={styles.heading}>ASSIGNMENTS</div>
            <Assignment/>
        </div>
    )
}

export default Assignments