import React,{useContext,useEffect,useState}  from "react";
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
import CourseContext from "../../Contexts/CourseContext";
import {Container, Row, Col, TabContainer } from "react-bootstrap";

import {Switch,Route} from 'react-router-dom'
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import styles from './Dashboard.module.css'
import MyCourses from "../../components/MyCourses/MyCourses";
import CourseDetails from "./CourseDetails/CourseDetails";
import Backdrop from '../../components/Backdrop/Backdrop'
import AddCourseForm from '../../components/MyCourses/AddCourseForm/AddCourseForm'
import './dashboard.css'


const Dashboard = (props) => {
    const authenticateduserCtx= useContext(AuthenticatedContext)
    const courseCtx=useContext(CourseContext)
    const [showbackdrop,setshowbackdrop] =useState(false)

    useEffect(()=>{
       
        authenticateduserCtx.SetAuthenticatedUser()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
       
    const setShowBackdrop=(value)=>{
        setshowbackdrop(value);
    }

    return (
        <div>
           <Backdrop show={showbackdrop} setShowBackdrop={setShowBackdrop}/>
           <AddCourseForm show={showbackdrop} setShowBackdrop={setShowBackdrop}/>
            <Container>
                    <Row>
                        <Col md={2} className="SidebarContainer" >
                                <Sidebar/>      
                        </Col>

                        <Col md={10} className="DashboardContainer" >
                                          
                                <Switch>
                                    <Route exact path={`/dashboard/home`}>
                                        Home
                                    </Route>
                                    <Route exact path={`/dashboard/mycourses`}>
                                        <MyCourses setShowBackdrop={setShowBackdrop}/>
                                    </Route>
                                    <Route exact path={`/dashboard/mycourses/:id`}>
                                        <CourseDetails />
                                    </Route>
                                    <Route exact path={`/dashboard/announcments`}>
                                        Announcments
                                    </Route>
                                    <Route exact path={`/dashboard/mygrades`}>
                                        My Grades
                                    </Route>
                                </Switch>        
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        
        );
  };

  export default Dashboard