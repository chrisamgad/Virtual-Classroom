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
    const [skip,setskip]=useState(0)
    const [limit,setlimit]=useState(3)
    const [NoMoreStudents,setNoMoreStudents]=useState(false)
    const [TotalStudentsArrLength,setTotalStudentsArrLength]=useState(0);
    useEffect(()=>{
        //console.log(courseid)
        
        studentDataService.getCurrentStudents(courseid,limit,skip)
            .then((res)=>{
                //console.log(res.body)
                const students=res.data.studentsList;
                setTotalStudentsArrLength(res.data.TotalStudentsArrLength)
                //console.log(TotalStudentsArrLength)
                setstudentsincourse(students)
                courseCtx.SetWentInsideCourse(true)
            })
            .catch((e)=>console.log(e))
       

            if(studentsincourse.length >=TotalStudentsArrLength && TotalStudentsArrLength!==0 || (TotalStudentsArrLength===0 && studentsincourse.length===0))
            { 
             
                setNoMoreStudents(true)
            }
            else
                setNoMoreStudents(false)
            
            // console.log("studentsincourse" +studentsincourse.length)
            // console.log("Totalstudentsarrlength" +TotalStudentsArrLength)
    },[studentsincourse.length])
    
    const showmorestudents =()=>{   
        setlimit(prev => {
            if(studentsincourse.length< TotalStudentsArrLength)
            {
                const newlimit=prev+3;
                studentDataService.getCurrentStudents(courseid,newlimit,skip)
                    .then((res)=>{
                        const students=res.data.studentsList;
                        setTotalStudentsArrLength(res.data.TotalStudentsArrLength)
                        setstudentsincourse(students)
                        courseCtx.SetWentInsideCourse(true)
                    })
                    .catch((e)=>console.log(e))

                return newlimit
            }
            else
                return prev   
        })
        
 
        
    }
    //console.log("newstudentsincourse = "+ studentsincourse.length + "and Totalsarrlength = " + TotalStudentsArrLength)
    return(
        <div>
            <p className={styles.heading}>Students Enrolled in the Course</p>
            <p className={styles.totalNStudents}>Total Number of Students Enrolled in this course are {TotalStudentsArrLength}</p>
            <div className={styles.StudentsContainer}>
                {studentsincourse.map((student,index)=><Student key={index} index={index+1} student={student}/>) }
           </div>
           
                
            <i className={`fas fa-caret-square-down ${styles.showmore}`} style={NoMoreStudents? {display:'none'} : null}onClick={showmorestudents}></i>
           
        </div>
    )
}

export default ViewStudents;