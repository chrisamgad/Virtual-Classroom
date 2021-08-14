import { Form,Button,Container} from "react-bootstrap"
import {Link} from 'react-router-dom'
import styles from './Login.module.css'

const Login = ()=>{

    return(
        <div>
            <Container>
            <div className={styles.form_container}> 
                <Form className={styles.form_styles}>
                    <p>LOG IN NOW!</p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                   <p> <Link to="/createaccount" className={styles.create_account}>Create Account</Link></p>
                </Form>
            </div>
            </Container>
        </div>
    )
}

export default Login