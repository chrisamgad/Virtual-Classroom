import React,{useEffect, useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import Assignment from './Assignment/Assignment'
import studentDataService from '../../services/student-data-service'
import { Button } from 'react-bootstrap'
import styles from './Assignments.module.css'
import CourseContext from '../../Contexts/CourseContext'
import Backdrop from '../Backdrop/Backdrop'
import CreateAssignment from '../../components/CreateAssignment/CreateAssignment'

const  Assignments= () => {
    const [assignments,setassignments]=useState([])
    const courseCtx=useContext(CourseContext)
    const {courseid}=useParams()

    const [showBackdrop,setshowBackdrop]=useState(false)
    const [CreateAssignmentFlag,setCreateAssignmentFlag]=useState(false)
    useEffect(()=>{

        
        studentDataService.GetAssignments(courseid).then((res)=>{
            console.log(res)
            setassignments(res.data)
        }).catch(e=>console.log(e))

        courseCtx.SetWentInsideCourse(true)

    },[])
    return (

    <div>
        <Backdrop show={showBackdrop} setShowBackdrop={setshowBackdrop}/>
        <CreateAssignment show={showBackdrop} setshowBackdrop={setshowBackdrop} setassignments={setassignments} assignments={assignments} />
        
        <div className={styles.header}>
            <div className={styles.heading}>Assignments</div>
            <Button variant='success' className={styles.AddAssignmentButton} 
            onClick={()=>{
                setCreateAssignmentFlag(true)
                setshowBackdrop(true);
            }}>
                Create a new Assignment</Button>
            <Button variant='danger' className={styles.DeleteAssignmentButton}>Delete an Assignment</Button>
        </div>
        <div className={styles.assignmentscontainer}>
            {
            assignments.map((assignment,index)=>{
                return <Assignment key={index} index={index} assignment={assignment}/>
            })
            } 
        </div>
    </div>  
    );
}
 
export default Assignments;