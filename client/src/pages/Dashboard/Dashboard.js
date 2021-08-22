import React,{useContext,useEffect}  from "react";
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
import CourseContext from "../../Contexts/CourseContext";
import {Container, Row, Col } from "react-bootstrap";

import {Switch,Route} from 'react-router-dom'
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import styles from './Dashboard.module.css'
import MyCourses from "../../components/MyCourses/MyCourses";
import CourseDetails from "./CourseDetails/CourseDetails";
import './dashboard.css'


const Dashboard = (props) => {
    const authenticateduserCtx= useContext(AuthenticatedContext)
    const courseCtx=useContext(CourseContext)
    
    console.log(courseCtx.WentInsideCourse)

    useEffect(()=>{
       
        authenticateduserCtx.SetAuthenticatedUser()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
       
    
    return (
        <div>
         <Container  >
                <Row>
                    
                    <Col md={2} className="SidebarContainer" >
                            <Sidebar/>
                       
                    </Col>

                    <Col md={10} className="DashboardContainer" >
                        <div className={styles.DashboardMainContainer}>                
                            <Switch>
                                <Route exact path={`/dashboard/home`}>
                                    Home
                                </Route>
                                <Route exact path={`/dashboard/mycourses`}>
                                    <MyCourses />
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
                        </div>
                    </Col>

                </Row>

            </Container>
        </div>
        );
  };

  export default Dashboard