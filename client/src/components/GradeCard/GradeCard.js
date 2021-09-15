
import {Card,Button} from 'react-bootstrap';
import styles from './GradeCard.module.css';

const GradeCard = () => {
    return ( 
    <div>
        <Card className={styles.cardcontainer}>
            <Card.Header as="h5">1. Ass 1</Card.Header>
            <Card.Body>
                <Card.Title className={styles.cardtitle}>Grade:<span style={{color: '#0088ff'}}> 15/100 </span></Card.Title>
                <Card.Title className={styles.cardtitle}>Comments:</Card.Title>
                <Card.Text>
                <span style={{color: '#31af36'}}>With supporting text below as a natural lead-in to additional content. </span>
                </Card.Text>
            </Card.Body>
        </Card>
    </div> );
}
 
export default GradeCard;