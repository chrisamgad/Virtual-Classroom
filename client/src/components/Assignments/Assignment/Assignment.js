import React from 'react'
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'
import styles from './Assignment.module.css'
import { Link } from 'react-router-dom'



const  Assignment= (props) => {

    const return_bg = ()=>{
        if(props.assignment.SubmissionStatus=== 'In-Progress')
            return ` ${styles.In_Progress}`
        else if(props.assignment.SubmissionStatus=== 'Submitted ')
            return `  ${styles.Submitted}`
        else if (props.assignment.SubmissionStatus=== 'Deadline-Passed')
            return `  ${styles.Deadline_Passed}`
        
    }

    const handleRemoveAssignment = ()=>{
        props.setshowBackdrop(true)
        props.setDeleteMode(true)
        props.setassignemnttoberemoved(props.assignment._id)
    }
    //#413f3b
    return (
    <div>
        <Link to="/contactus">
         <Card className={`${return_bg()} ${styles.Card}`}>
          
            <Card.Header>Assignment #{props.index +1 }</Card.Header>
            <Card.Body>
                <Card.Title  className="mb-3">{props.assignment.name}</Card.Title>
                <Card.Subtitle >Due: <span>{moment(props.assignment.DueDate).format("MMMM Do YYYY, h:mm a")}  </span></Card.Subtitle>
                {/* <Card.Text> Submission Status:<span> {props.assignment.SubmissionStatus}</span></Card.Text> */}
                {props.ShowDeleteButton ? <Button variant='danger' onClick={handleRemoveAssignment}>Remove Assignment</Button> : null}
            </Card.Body>
        </Card>
        </Link>
        
    </div>  
    );
}
 
export default Assignment;