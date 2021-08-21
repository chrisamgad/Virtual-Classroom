
import {Card} from 'react-bootstrap'
import styles from "./Course.module.css"

const Course = (props)=>{
    return(
        <div >
            <Card className={styles.cardcontainer}>
            <Card.Body className={styles.cardbody}>
                <Card.Title>{props.coursename}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Instructor: {props.instructor}</Card.Subtitle>
                <Card.Text>
                Quick Description: Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>

            </Card.Body>
            </Card>
        </div>
    )
}

export default Course;