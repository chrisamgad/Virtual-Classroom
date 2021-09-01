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
            return <div>You already submitted your attempt to this assignment</div>
        else{   
            if(SubmitSuccess)
                return <div>Submit Sucess</div>
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
    <div>
       { ReturnHTMLBasedOnRole()}
    </div> 
    );
}
 
export default AssignmentDetails;