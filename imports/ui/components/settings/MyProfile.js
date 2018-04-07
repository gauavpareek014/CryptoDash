import React from "react";
import {Form, FormGroup, ControlLabel, FormControl,Col,Checkbox,Button}  from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export default class MyProfile extends React.Component{
    render(){
        return(
        <Form horizontal className = "customForm">
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                    Email
                </Col>
                <Col sm={10} lg={4}>
                    <FormControl type="email" placeholder="Email"></FormControl>
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalFirstName">
                <Col componentClass={ControlLabel} sm={2}>
                    FirstName
                </Col>
                <Col sm={10} lg={4}>
                    <FormControl type="text" placeholder="FirstName" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLastName">
                <Col componentClass={ControlLabel} sm={2}>
                    LastName
                </Col>
                <Col sm={10} lg={4}>
                    <FormControl type="text" placeholder="LastName" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalContact">
                <Col componentClass={ControlLabel} sm={2}>
                    Contact
                </Col>
                <Col sm={10} lg={4}>
                    <FormControl type="text" placeholder="Contact" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalAddress">
                <Col componentClass={ControlLabel} sm={2}>
                    Address
                </Col>
                <Col sm={10} lg={4}>
                    <FormControl componentClass="textarea" placeholder="Address" />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit" bsStyle="danger">Save</Button>
                </Col>
            </FormGroup>
        </Form>

        );
    }
}