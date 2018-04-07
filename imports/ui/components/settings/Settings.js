import React from "react";
import { Button,Jumbotron,Grid,Row,Col,Panel  } from 'react-bootstrap';
import SettingsTabUI from "./SettingsTabUI";

export default class Settings extends React.Component{
    render(){
        return (
            <Jumbotron>
                <Grid>
                    <Row className="show-grid">
                        <Col>
                            <SettingsTabUI/>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        );
    }
}

