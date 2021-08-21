import React,{useContext,useEffect}  from "react";
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'

import {Container, Row, Col, Nav } from "react-bootstrap";

import {Switch,Route} from 'react-router-dom'
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import styles from './Dashboard.module.css'
import MyCourses from "../../components/MyCourses/MyCourses";
import './dashboard.css'


const Dash = (props) => {
    const authenticateduserCtx= useContext(AuthenticatedContext)
   
    useEffect(()=>{
       
       // const SetsAuthenticatedUserstate= authenticateduserCtx.SetAuthenticatedUser()
        
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
  const Dashboard = Dash;
  export default Dashboard