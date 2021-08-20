import React from "react";
import {Container, Row, Col, Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import styles from './Dashboard.module.css'
import '../../components/DashboardSidebar/SidebarStyles.css'

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
                        3 of 3
                        </div>
                    </Col>

                </Row>

            </Container>
        </div>
        );
  };
  const Dashboard = withRouter(Dash);
  export default Dashboard