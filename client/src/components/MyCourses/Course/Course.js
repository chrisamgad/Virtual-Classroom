
import {Card} from 'react-bootstrap'
import styles from "./Course.module.css"
import { useHistory } from 'react-router-dom'

import '../../../pages/Dashboard/Dashboard'

const Course = (props)=>{

    const { push } = useHistory()

    return(
        <div >
            <Card className={styles.cardcontainer} onClick={()=>push('/dashboard/mycourses/' + props.courseID)}>
                <Card.Body className={styles.cardbody}>
                    <Card.Title>{props.coursename}</Card.Title>
                    { props.role === 'student' ? <Card.Subtitle className="mb-2 text-muted">Instructor: {props.instructor}</Card.Subtitle> : null}

                </Card.Body>
            </Card>
        </div>
    )
}

export default Course;