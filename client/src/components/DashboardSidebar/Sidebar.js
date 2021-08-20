import React from "react";
import {Nav} from "react-bootstrap";
import {Link} from 'react-router-dom'
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
            
            <Nav.Link className={styles.NavLink} as={Link} to="/dashboard/home">Home</Nav.Link>
            <Nav.Link className={styles.NavLink} as={Link} to="/dashboard/mycourses">Courses</Nav.Link>
            <Nav.Link className={styles.NavLink} as={Link} to="/dashboard/announcments">Announcments</Nav.Link>
            <Nav.Link className={styles.NavLink} as={Link} to="/dashboard/mygrades" >Grades</Nav.Link>
            <Nav.Link className={styles.NavLink} as={Link} to="/dashboard/myprofile">My Profile</Nav.Link>
            <Nav.Link className={styles.NavLink} as={Link} to="/dashboard/settings">Settings</Nav.Link>  
      
        </Nav>
          
        </div>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar