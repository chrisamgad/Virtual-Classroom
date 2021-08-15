import { Form, Button, Container} from "react-bootstrap"
import React ,{ useState } from "react"
import styles from './SignUp.module.css'

const SignUp = ()=>{


    const [CredentialDetails, setCredentialDetails] = useState({
        fullname:'',
        email:'',
        mobilenumber:'',
        password_first:'',
        password:''
    })

    const setFullName = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            fullname:e.target.value
        })
    }

    const setEmail = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            email:e.target.value
        })
    }

    const setMobile = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            mobilenumber:e.target.value
        })
    }

    const setPasswordFirst = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            password_first:e.target.value
        })
    }

    const setPasswordFinal = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            password:e.target.value
        })
    }

    console.log(CredentialDetails)

    return(
        <div>
            <Container>
                <div className={styles.form_container}> 
                    <Form className={styles.form_styles}>
                        <p style={{fontWeight:'400' }}>CREATE ACCOUNT</p>
                        <Form.Group className="mb-2" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setFullName(e)} placeholder="Enter Full Name" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setEmail(e)} placeholder="Enter email" />
                            <Form.Text style={{ marginBottom: '0'}} className="text-muted" >
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicPhone">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setMobile(e)} placeholder="Enter Mobile Number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=> setPasswordFirst(e)} placeholder="Password" />

                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=> setPasswordFinal(e)} placeholder="Password" />
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