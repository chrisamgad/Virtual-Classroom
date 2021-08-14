import {Navbar,Nav,Container,Button} from 'react-bootstrap'
import styles from'./MainNavigation.module.css'
import './MainNavigation.css'

import React from 'react'
import {Link} from 'react-router-dom'

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
                <Nav.Link className={styles.navlinkstyle} to="/">HOME</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className={styles.navlinkstyle} eventKey="link-1" to="/ourstory">OUR STORY</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className={styles.navlinkstyle} eventKey="link-2"  to="/contactus">CONTACT US </Nav.Link>
                
            </Nav.Item>
            
        </Nav>

        <Button className={styles.login_signup}>LOGIN </Button>
        <Button className={styles.login_signup}>SIGN UP </Button>
        </Container>
      </Navbar>
    </div>
    
    )
}

export default MainNavigation