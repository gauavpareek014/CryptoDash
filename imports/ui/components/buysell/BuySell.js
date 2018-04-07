import React from "react";
import { Button,Jumbotron,Grid,Row,Col,Panel } from 'react-bootstrap';
import BuySellTab from './BuySellTab';

export default class BuySell extends React.Component{

    render(){
        return (
            <Jumbotron>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={6} md={6} lg={6}>
                            <BuySellTab/>
                        </Col>

                        <Col sm={6} md={6} lg={6}>
                            <Panel bsStyle="default">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Transaction Details</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>

                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        );
    }
}