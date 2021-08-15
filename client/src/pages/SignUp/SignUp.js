import { Form, Button, Container} from "react-bootstrap"
import styles from './SignUp.module.css'
import {Link} from 'react-router-dom'

const SignUp = ()=>{
    return(
        <div>
            <Container>
                <div className={styles.form_container}> 
                    <Form className={styles.form_styles}>
                        <p style={{fontWeight:'400' }}>CREATE ACCOUNT</p>
                        <Form.Group className="mb-2" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Full Name" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                            <Form.Text style={{ marginBottom: '0'}} className="text-muted" >
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicPhone">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mobile Number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />

                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I accept terms and conditions" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    )
}

export default SignUp