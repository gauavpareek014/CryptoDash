import React from "react";
import {Meteor} from 'meteor/meteor';
import {Grid, Row, Col, Jumbotron,Form, FormGroup,Alert, ControlLabel, FormControl,Panel,Button} from 'react-bootstrap';
import {UserProfile} from "../../../api/UserProfile";

export default class ConfigureLimit extends React.Component{

    constructor(props){
        super(props);
        let emailAddress;
        if(Meteor.user()){
            emailAddress = Meteor.user().emails[0].address;
        }

        this.state = {
            email:emailAddress,
        };

    }
    render(){
        return (
                            <Panel bsStyle="default">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Limit Details</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <Form horizontal className = "useraccountsetup">
                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Email
                                            </Col>
                                            <Col sm={10} lg={4}>
                                                <FormControl type="email" placeholder="Email" defaultValue = {this.state.email} readOnly="readOnly" ></FormControl>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalAddress">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Transaction Limit
                                            </Col>
                                            <Col sm={10} lg={4}>
                                                <FormControl type="number" placeholder="In USD" ref="limit" required/>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                <Button type="submit"  bsStyle="danger">Save</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Panel.Body>
                            </Panel>
        );
    }
}