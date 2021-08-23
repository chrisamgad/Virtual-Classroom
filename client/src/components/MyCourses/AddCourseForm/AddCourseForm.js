
import React from 'react'
import {Form,Button} from 'react-bootstrap'
import styles from'./AddCourseForm.module.css'

const AddCourseForm = (props)=>{

    const  HandleClick = ()=>{
        props.setShowBackdrop(false)
    }

    return(
        <div>
        { props.show ? 
            <div>
                <Form className={styles.FormContainer}>
                    <i className={`fas fa-times-circle ${styles.windowclose}`} onClick={(e)=>HandleClick(e)}></i>
                    <p className={styles.ADD_A_NEW_COURSE}>ADD A NEW COURSE</p>
                    <Form.Group className="mb-2"controlId="formBasicCourseName">
                        <p className={styles.form_labels}>Enter the Course Name</p> 
                        <Form.Control className={styles.form_labels} type="text" placeholder="Enter Course Mame" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicDescription">
                        <p className={styles.form_labels}>Enter the Course Description</p>
                        <Form.Control className={styles.form_labels} type="text" placeholder="Description" />
                    </Form.Group>

                    <Button variant="success" className={styles.buttonstyle} onClick={(e)=>HandleClick(e)} >
                        Create the Course !
                    </Button>     
                </Form>
            </div>
        : null
            }
        </div>
    )
}

export default AddCourseForm;