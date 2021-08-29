import React,{useState} from 'react'
import {Card} from 'react-bootstrap'
import moment from 'moment'




const  Assignment= (props) => {

    const return_bg = ()=>{
        if(props.assignment.SubmissionStatus=== 'In-Progress')
            return 'warning'
        else if(props.assignment.SubmissionStatus=== 'Submitted')
            return 'success'
        else if (props.assignment.SubmissionStatus=== 'Deadline-Passed')
            return 'danger'
    }
    
    return (
    <div>
         <Card
    bg={return_bg()}
    text={'white'}
    style={{ width: '18rem' }}
    className="mb-2"
    >
        <Card.Header>Assignment #{props.index +1 }</Card.Header>
        <Card.Body>
            <Card.Title  className="mb-3">{props.assignment.name}</Card.Title>
            <Card.Subtitle >Due: <span>{moment(props.assignment.DueDate).format("MMMM Do YYYY, h:mm:ss a")}  </span></Card.Subtitle>
            <Card.Text> Submission Status:<span> {props.assignment.SubmissionStatus}</span></Card.Text>
        </Card.Body>
    </Card>
    </div>  
    );
}
 
export default Assignment;