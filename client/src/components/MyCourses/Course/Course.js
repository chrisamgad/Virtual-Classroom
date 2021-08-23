
import {Card} from 'react-bootstrap'
import styles from "./Course.module.css"
import { useHistory } from 'react-router-dom'

import '../../../pages/Dashboard/Dashboard'
import { useEffect,useState } from 'react'

const Course = (props)=>{

    const { push } = useHistory()
    const[cardcontainerstyle,setcardcontainerstyle]=useState(styles.cardcontainer)

    useEffect(()=>{
       console.log(props.delete)
        if(props.delete)
             setcardcontainerstyle(`${styles.cardcontainerwithDelete}`)
        else
            setcardcontainerstyle(`${styles.cardcontainer}`)
    },[props.delete])

    const handleDeleteIconClicked =()=>{
        props.setdeletecoursestate(false)
    }

    const handleClickOnCard=()=>{
        if(!props.delete)
            push('/dashboard/mycourses/' + props.courseID)
    }
    return(
        <div >
            <Card className={cardcontainerstyle} onClick={handleClickOnCard}>
                <Card.Body className={styles.cardbody}>
                    
                    <Card.Title>Course Name: {props.coursename}  {props.delete ? <i onClick={handleDeleteIconClicked}className={`fas fa-trash-alt ${styles.delete}`}></i> : null}</Card.Title>
                    { props.role === 'student' ? <Card.Subtitle style={{fontSize: '14px'}}className="mb-2 text-muted">Instructor: {props.instructor}</Card.Subtitle> : null}
                    <p className="card-text">Description: With supporting text below as a natural lead-in to additional content.</p>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Course;