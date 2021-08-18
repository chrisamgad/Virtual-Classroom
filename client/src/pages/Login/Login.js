import { Form,Button,Container} from "react-bootstrap"
import {Link} from 'react-router-dom'
import styles from './Login.module.css'
import { useState } from "react"
import AuthService from '../../services/auth.service'

const Login = ()=>{

    const [CredentialDetails,setCredentialDetails]= useState({
        email:'',
        passsword:''
    })

    const setEmail = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            email:e.target.value
        })
    }

    const setPassword = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            password:e.target.value
        })
    }

    const handlesubmit = (e)=>{
        e.preventDefault();
        console.log('handlesubmit')
        const response= AuthService.login(CredentialDetails.email, CredentialDetails.password).then((response)=>{
            console.log(response.data)
        })
    }

    //console.log(CredentialDetails)
    return(
        <div>
            <Container>
            <div className={styles.form_container}> 
                <Form className={styles.form_styles}>
                    <p>LOG IN</p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" onClick={(e)=>handlesubmit(e)}>
                        Submit
                    </Button>
                   <p> <Link to="/createaccount" className={styles.create_account}>Create Account for Students</Link></p>
                </Form>
            </div>
            </Container>
        </div>
    )
}

export default Login