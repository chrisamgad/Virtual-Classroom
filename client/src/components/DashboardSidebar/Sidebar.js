import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import styles from './Sidebar.module.css'

const Side = props => {
   
    return (
        <div>
    
        <Nav className={styles.NavContainer}>

            <img
                src="/images/logo.png"
                height="100"
                width="100"
                alt="Vimo Logo"

                className={styles.brand}
            /> 
            
            <Nav.Link className={styles.NavLink} href="#home">Home</Nav.Link>
            <Nav.Link className={styles.NavLink} href="#link">Courses</Nav.Link>
            <Nav.Link className={styles.NavLink} href="#home">Assignments</Nav.Link>
            <Nav.Link className={styles.NavLink} href="#link">Grades</Nav.Link>
            <Nav.Link className={styles.NavLink} href="#link">My Profile</Nav.Link>
            <Nav.Link className={styles.NavLink} href="#link">Settings</Nav.Link>  
      
        </Nav>
          
        </div>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar