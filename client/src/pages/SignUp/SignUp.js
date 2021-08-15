import { Form, Button, Container,InputGroup,FormControl} from "react-bootstrap"
import React ,{ useState } from "react"
import styles from './SignUp.module.css'
import validator from 'validator';

const SignUp = ()=>{


    const [CredentialDetails, setCredentialDetails] = useState({
        fullname:'',
        email:'',
        mobilenumber:'',
        password1:'',
        password2:''
    })

    const [CredentialValidation, setCredentialValidation]=useState({
        validated:true,//initially true
        error: undefined
    }) 

    const [CheckboxState,setCheckboxState] =useState(false)

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
            password1:e.target.value
        })
    }

    const setPasswordFinal = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            password2:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault() //prevents refresh
        
        if(validator.isEmpty(CredentialDetails.fullname, {ignore_whitespace:true}))
            return setCredentialValidation({
                validated:false,
                error:"Fullname can't be empty"
            })
        if(!validator.isEmail(CredentialDetails.email))
            {
               return setCredentialValidation({
                   validated:false,
                   error:'Incorrect Email'
               })
            }
        if(!validator.isMobilePhone(CredentialDetails.mobilenumber))
            return setCredentialValidation({
                validated:false,
                error:'Incorrect Mobile Number'
            })

        if(!validator.equals(CredentialDetails.password1,CredentialDetails.password2))
            return setCredentialValidation({
                validated:false,
                error:"Both Passwords don't match"
            })

        if(!validator.isStrongPassword(CredentialDetails.password1,{
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        }))
            return setCredentialValidation({
                validated:false,
                error:'Password must contain atleast 8 characters,1 LowerCase, 1 UpperCase, 1 digit and 1 symbol'
            })
        if(!CheckboxState)
            return setCredentialValidation({
                validated:false,
                error:'Please tick the checkbox to accept terms and conditions'
            })

        //If we reach this point, validation is succesfull because no false validation was returned
        return setCredentialValidation({
            validated:true,
            error:undefined
        })
    }

    
    console.log(CredentialDetails)
    console.log(CredentialValidation)

    return(
        <div>
            <Container>
                <div className={styles.form_container}> 
                    <Form className={styles.form_styles}>
                        <p style={{fontWeight:'400' }}>STUDENTS CREATE ACCOUNT</p>
                        <Form.Group className="mb-2" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setFullName(e)} placeholder="Enter Full Name" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setEmail(e)} placeholder="Enter Email" />
                            <Form.Text style={{ marginBottom: '0'}} className="text-muted" >
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className="mb-2" controlId="formBasicPhone">
                            <Form.Label>Mobile Number</Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>+20</InputGroup.Text>
                                <FormControl placeholder="Enter Mobile Number" onChange={(e)=>setMobile(e)}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=> setPasswordFirst(e)} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=> setPasswordFinal(e)} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" defaultChecked={CheckboxState} onChange={()=>setCheckboxState(!CheckboxState)} label="I accept terms and conditions" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={ (e) =>handleSubmit(e)}>
                            Create Account
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    )
}

export default SignUp