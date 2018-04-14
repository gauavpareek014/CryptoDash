import React from "react";
import {Form, FormGroup,Alert, ControlLabel, FormControl,Col,Checkbox,Button}  from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { UserProfile } from '../../../api/UserProfile';
import ReactDOM from "react-dom";
import { Session } from 'meteor/session';


export default class MyProfile extends React.Component{
    constructor(props){
        super(props);
        Meteor.subscribe('userprofile');
        this.userData = UserProfile.find({owner: Meteor.userId()}).fetch();
        let firstName;
        let lastName;
        let address;
        let contact;
        let id;
        let emailAddress;

        if(Meteor.user()){
             emailAddress = Meteor.user().emails[0].address;
        }

        this.userData.map(function(data){
            id = data._id;
            firstName = data.firstName;
            lastName = data.lastName;
            contact = data.contact;
            address = data.address;
            Session.set("UserProfileId",id);
        });

        this.state = {
            email:emailAddress,
            _id:id,
            fName:firstName,
            lName:lastName,
            add:address,
            phone:contact,
            message:'',
            bstyle:'',
            disabled:'',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        // Find the text field via the React ref
        const firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
        const lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
        const contact = ReactDOM.findDOMNode(this.refs.contact).value.trim();
        const address = ReactDOM.findDOMNode(this.refs.address).value.trim();

        if(contact.match(/\d/g) && contact.length == 10){
            Meteor.call('userprofile.insert', firstName,lastName,contact,address,Session.get("UserProfileId"), (err, res)=> {
                if (err) {
                    this.setState({
                        message:err.reason,
                        bstyle:'danger',
                    });
                    console.log(err);
                    throw new Meteor.Error('It did not work!')

                } else {
                    this.setState({
                        message:'Profile saved successfully!',
                        bstyle:'success',
                    });
                }
            });
            setTimeout(function() { this.setState({message: ''}); }.bind(this), 3000);
        }
        else{
            this.setState({
                message:'contact should be a number and 10 digits length',
                bstyle:'danger',
            });

            setTimeout(function() { this.setState({message: ''}); }.bind(this), 3000);
        }
    }

    render(){
        return(
            <Form horizontal className = "customForm" onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10} lg={4}>
                        <FormControl type="email" placeholder="Email" defaultValue = {this.state.email} readOnly="readOnly" ></FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalFirstName">
                    <Col componentClass={ControlLabel} sm={2}>
                        First Name
                    </Col>
                    <Col sm={10} lg={4}>
                        <FormControl type="text" ref="firstName" placeholder="FirstName" defaultValue = {this.state.fName} required/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Last Name
                    </Col>
                    <Col sm={10} lg={4}>
                        <FormControl type="text" placeholder="LastName" ref="lastName" defaultValue = {this.state.lName}
                                     required/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalContact">
                    <Col componentClass={ControlLabel} sm={2}>
                        Contact
                    </Col>
                    <Col sm={10} lg={4}>
                        <FormControl type="text" placeholder="Contact" ref="contact" defaultValue = {this.state.phone}
                                     required/>
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalAddress">
                    <Col componentClass={ControlLabel} sm={2}>
                        Address
                    </Col>
                    <Col sm={10} lg={4}>
                        <FormControl componentClass="textarea" placeholder="Address" ref="address" defaultValue = {this.state.add} required/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit"  bsStyle="danger">Save</Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        {this.state.message?<Alert bsStyle={this.state.bstyle} id="alertBox">{this.state.message}</Alert>:undefined}
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}