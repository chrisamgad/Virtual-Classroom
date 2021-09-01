import React, { useEffect,useContext, useState } from 'react'
import CourseContext from '../../Contexts/CourseContext';
import {Form,Button} from 'react-bootstrap'
import styles from './AssignmentDetails.module.css'
import studentDataService from '../../services/student-data-service';
import { useParams } from 'react-router-dom';

const AssignmentDetails = () => {

    const URLparameters=useParams()

    const courseCtx=useContext(CourseContext)
    const [SelectedFile,setSelectedFile]=useState(undefined)
    const [SubmitSuccess,setSubmitSuccess]=useState(false)
    const [AlreadySubmitted,setAlreadySubmitted]=useState(false)
    useEffect(()=>{
        //Get Students --> Details to display are name,email,submissionstatus,link to the students uploaded attemptv
        studentDataService.GetAttempt(URLparameters.courseid,URLparameters.assignmentid).then((res)=>{
            console.log(res)
            setAlreadySubmitted(res.data.AttemptFoundFlag)

        })
        courseCtx.SetWentInsideCourse(true)
    },[])
    
    const SubmitAttempt = () =>{
        const data=new FormData()
        data.append("myFile",SelectedFile)
        studentDataService.SubmitAttempt(URLparameters.courseid,URLparameters.assignmentid,data)
            .then((res)=>{
                setSubmitSuccess(true)
            })
            .catch(e=>console.log(e))
        
    }

    const ReturnHTMLBasedOnRole=()=>{
        if(AlreadySubmitted)
             return (
             <div className={styles.AlreadySubmittedContainer}>
                    <p>You already submitted your attempt to this assignment at:</p>

                    <i className={`fas fa-file-download ${styles.downloadicon}`} ></i>
                    <p onClick={()=>
                        window.location.assign(`http://localhost:4000/teacher/${URLparameters.courseid}/assignments/${URLparameters.assignmentid}`)
                    }>Download Submitted Attempt</p>
             </div>
             )
        else{   
            if(SubmitSuccess)
                return (
                    <div className={styles.Submit_success_container}>
                        <p >Submitted Sucessfully</p>
                        <i class="fas fa-check-circle"></i>
                    </div>
                    )
            else {
                return (
                    <div>
                        <div className={styles.heading}>Upload Your Attempt to the Assignment</div>
                        <Form className={styles.FormContainer}>
                            <Form.Group className="mb-3" controlId="formGroupFile">
                                <Form.Label style={{fontSize:'17px'}}>Upload Attempt</Form.Label>
                                <Form.Control type="file" name="myFile" onChange={(e)=>setSelectedFile(e.target.files[0])}/>
                            </Form.Group>
                            <Button onClick={SubmitAttempt}>Submit Attempt</Button>
                        </Form>
                    </div> 
                )
            }
        }
    }

    return ( 
    <div style={{height:'100%'}}>
       { ReturnHTMLBasedOnRole()}
    </div> 
    );
}
 
export default AssignmentDetails;