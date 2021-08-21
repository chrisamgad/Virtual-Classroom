import {Navbar,Nav,Container} from 'react-bootstrap'
import styles from'./MainNavigation.module.css'
import './MainNavigation.css'
import {Link} from 'react-router-dom'
import React,{useEffect, useState,useContext} from 'react'
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
import authService from '../../services/auth.service'

const MainNavigation = () =>{
    
  const authenticateduserCtx= useContext(AuthenticatedContext)
  const [userdetails,setuserdetails]=useState({
    name:''
  })
  
  useEffect(()=>{

    if(authenticateduserCtx.AuthenticatedUser)
    {
      console.log(authenticateduserCtx)
      if(authenticateduserCtx.AuthenticatedUser.teacher)
        {
          setuserdetails({
          name:authenticateduserCtx.AuthenticatedUser.teacher.fullname
        })
        }
      else if(authenticateduserCtx.AuthenticatedUser.student)
        {
          setuserdetails({
          name:authenticateduserCtx.AuthenticatedUser.student.fullname
        })}
    }

    
  },[authenticateduserCtx])

  // console.log(userdetails)
  // console.log('test '+userdetails.name)
    return(
    <div>
      <Navbar className={styles.colornav} variant="light">
        <Container>
        <Navbar.Brand href="#home">
      <img
        src="/images/logo.png"
        height="100"
        width="100"
        alt="Vimo Logo"
      />
      </Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Item>
                <Link className={styles.navlinkstyle} to="/" >HOME</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={styles.navlinkstyle}  to="/ourstory">OUR STORY</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={styles.navlinkstyle}   to="/contactus">CONTACT US </Link>
            </Nav.Item>
            
        </Nav>

        
        { (userdetails.name === '') ? <Link className={styles.LoginLink} to="/login">LOG IN </Link> 
         : 
         <div className={styles.containerWelcomeMessage}>
          <div className={styles.WelcomeMessage}>Welcome, {userdetails.name}</div>
          <Link className={styles.LogoutLink} to="/logout">LOG OUT </Link> 
         </div>
         }
        
        
        </Container>
      </Navbar>
    </div>
    
    )
}

export default MainNavigation