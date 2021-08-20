import React from "react";
import {Container, Row, Col, Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import {Switch,Route} from 'react-router-dom'
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import styles from './Dashboard.module.css'
import '../../components/DashboardSidebar/SidebarStyles.css'
import MyCourses from "../../components/MyCourses/MyCourses";

const Dash = props => {
   

    return (
        <div>
         <Container  >
                <Row>
                    
                    <Col md={2} >
                        <Sidebar/>
                    </Col>

                    <Col md={10} >
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