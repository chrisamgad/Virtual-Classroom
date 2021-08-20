import React,{useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {Link} from 'react-router-dom'
import styles from './Sidebar.module.css'

const Sidebar = () => {
   
    const [componentstyles,setcomponentstyles]=useState({
        homeComp:false,
        coursesComp:false,
        announcmentsComp:false,
        gradesComp:false,
        profileComp:false,
        settingsComp:false
    })

    const [resetstyles,setresetstyles]=useState(false)

    const setCurrentLink= (current_component)=>{

       if(current_component==='home')
            setcomponentstyles({
                coursesComp:false,
                announcmentsComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                homeComp:true
            });
        else if(current_component==='courses')
            setcomponentstyles({
                homeComp:false,
                announcmentsComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                coursesComp:true
            });
        else if(current_component === 'announcments')
            setcomponentstyles({
                homeComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                coursesComp:false,
                announcmentsComp:true
            });
        else if (current_component === 'grades')
            setcomponentstyles({
                homeComp:false,
                coursesComp:false,
                announcmentsComp:false,
                profileComp:false,
                settingsComp:false,
                gradesComp:true
            });
        else if (current_component === 'profile')
            setcomponentstyles({
                homeComp:false,
                coursesComp:false,
                announcmentsComp:false,
                gradesComp:false,
                settingsComp:false,
                profileComp:true
            });
        else if (current_component === 'settings')
            setcomponentstyles({
                homeComp:false,
                coursesComp:false,
                announcmentsComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:true
            });
        
    }

    console.log(componentstyles)

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
            
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.homeComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/home" onClick={()=>setCurrentLink('home')}>Home</Nav.Link>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.coursesComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/mycourses" onClick={()=>setCurrentLink('courses')}>Courses</Nav.Link>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.announcmentsComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/announcments" onClick={()=>setCurrentLink('announcments')}>Announcments</Nav.Link>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.gradesComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/mygrades" onClick={()=>setCurrentLink('grades')} >Grades</Nav.Link>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.profileComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/myprofile" onClick={()=>setCurrentLink('profile')} >My Profile</Nav.Link>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.settingsComp ? styles.onClickLinkStyle : null}` }  as={Link} to="/dashboard/settings" onClick={()=>setCurrentLink('settings')} >Settings</Nav.Link>  
      
        </Nav>
          
        </div>
        );
  };
  export default Sidebar