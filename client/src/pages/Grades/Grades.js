import {useEffect,useContext} from 'react'
import CourseContext from '../../Contexts/CourseContext';
import GradeCard from '../../components/GradeCard/GradeCard'
import styles from './Grades.module.css'
const Grades = () => {
    const courseCtx=useContext(CourseContext)

    useEffect(()=>{
        courseCtx.SetWentInsideCourse(true)
    },[])
    return ( 
    <div>
        <div className={styles.heading}>GRADES</div>
        <div className={styles.finishedgrading_header} >Finished Grading</div>
        <div className={styles.linebreak} style={{borderTop: '1px solid #19875485'}}></div>
        <div className={styles.cardscontainer}>
            <GradeCard/>
            <GradeCard/>
        </div>
        <div className={styles.notyetgraded_header} >Not Yet Graded</div>
        <div className={styles.linebreak} style={{borderTop: '1px solid #dc35458f'}}></div>
        <div className={styles.cardscontainer}>
            <GradeCard/>
            <GradeCard/>
        </div>
    </div> 
    );
}
 
export default Grades;