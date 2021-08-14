import {Navbar,Nav,Container,Button} from 'react-bootstrap'
import styles from'./MainNavigation.module.css'
import './MainNavigation.css'
import {Link} from 'react-router-dom'
import React from 'react'


const MainNavigation = () =>{
    
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

        <Link className={styles.LoginLink} to="/login">LOG IN </Link> 
        </Container>
      </Navbar>
    </div>
    
    )
}

export default MainNavigation