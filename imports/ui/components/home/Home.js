import React from "react";
import RecentActivity  from "./RecentActivity";
import { Link } from "react-router"
import { Button,Jumbotron,Grid,Row,Col,Panel } from 'react-bootstrap';
import PortfolioPerformance from "./PortfolioPerformance";

export default class Home extends React.Component{
    render(){
        return (

                   <Jumbotron>

                       <Grid>
                           <Row className="show-grid">
                               <Col xs={12} md={8}>

                                   <Grid>
                                       <Row className="show-grid">
                                           <Col xs={12} md={12} lg={12}>
                                               <Panel bsStyle="default">
                                                   <Panel.Heading>
                                                       <Panel.Title componentClass="h3">Price Comparison Panel</Panel.Title>
                                                   </Panel.Heading>
                                                   <Panel.Body>
                                                       <Grid>
                                                           <Row className="show-grid">
                                                               <Col xs={12} md={8}>
                                                                   <span>D3 Graph React Tag</span>
                                                               </Col>
                                                               <Col xs={6} md={4}>
                                                                   <span>Graph Check Box</span>
                                                               </Col>
                                                           </Row>
                                                       </Grid>
                                                   </Panel.Body>
                                               </Panel>
                                           </Col>
                                       </Row>
                                   </Grid>

                                   <Grid>
                                       <Row className="show-grid">
                                           <Col sm={6} md={4}>
                                               <Panel bsStyle="default">
                                                   <Panel.Heading>
                                                       <Panel.Title componentClass="h3">Bitcoin Brushing Graph</Panel.Title>
                                                   </Panel.Heading>
                                                   <Panel.Body>


                                                   </Panel.Body>
                                               </Panel>
                                           </Col>

                                           <Col sm={6} md={4}>
                                               <Panel bsStyle="default">
                                                   <Panel.Heading>
                                                       <Panel.Title componentClass="h3">Ethereum Brushing Graph</Panel.Title>
                                                   </Panel.Heading>
                                                   <Panel.Body>


                                                   </Panel.Body>
                                               </Panel>
                                           </Col>

                                           <Col sm={6} md={4}>
                                               <Panel bsStyle="default">
                                                   <Panel.Heading>
                                                       <Panel.Title componentClass="h3">Other Brushing Graph</Panel.Title>
                                                   </Panel.Heading>
                                                   <Panel.Body>


                                                   </Panel.Body>
                                               </Panel>
                                           </Col>
                                       </Row>
                                   </Grid>
                               </Col>

                               <Col xs={12} md={4}>
                                   <Panel bsStyle="default">
                                       <Panel.Heading>
                                           <Panel.Title componentClass="h3">Portfolio Performance</Panel.Title>
                                       </Panel.Heading>
                                       <Panel.Body >
                                           <PortfolioPerformance/>
                                        
                                       </Panel.Body>
                                   </Panel>

                                   <Panel bsStyle="default">
                                       <Panel.Heading>
                                           <Panel.Title componentClass="h3">Recent Activity</Panel.Title>
                                       </Panel.Heading>
                                       <Panel.Body>
                                       <RecentActivity/>
                                       </Panel.Body>
                                   </Panel>
                               </Col>

                           </Row>
                       </Grid>



                   </Jumbotron>

    );
    }
}

