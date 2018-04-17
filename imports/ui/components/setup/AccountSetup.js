import React from "react";
import {Meteor} from 'meteor/meteor';
import {Grid, Row, Col, Jumbotron,Form, FormGroup,Alert, ControlLabel, FormControl,Panel,Button} from 'react-bootstrap';
import {UserProfile} from "../../../api/UserProfile";

export default class AccountSetup extends React.Component{

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
            <Jumbotron>
                    <Grid>
                        <Row className="show-grid">
                            <Col>
                                <Panel bsStyle="default">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">User Account Setup Details</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <Form horizontal className = "useraccountsetup">
                                            <FormGroup>
                                                <Col smOffset={2} sm={10}>
                                                    <Button type="submit"  bsStyle="primary">Setup My Account</Button>
                                                </Col>
                                            </FormGroup>
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
                                                     Wallet Number
                                                </Col>
                                                <Col sm={10} lg={4}>
                                                    <FormControl type="number" placeholder="545564345" ref="vwalletno" readOnly="readOnly" required/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formHorizontalAddress">
                                                <Col componentClass={ControlLabel} sm={2}>
                                                     Wallet Amount
                                                </Col>
                                                <Col sm={10} lg={4}>
                                                    <FormControl type="number" placeholder="$1000" ref="vwalletamount" readOnly="readOnly" required/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col smOffset={2} sm={10}>
                                                    <Alert bsStyle="danger" id="alertBox">Account Setup Error! Please setup your account to start the transaction</Alert>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                    </Grid>

            </Jumbotron>
        );
    }
}