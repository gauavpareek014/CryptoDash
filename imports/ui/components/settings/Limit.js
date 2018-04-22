import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, ListGroup, Col, Jumbotron,Form, FormGroup,Alert, ControlLabel, FormControl,Panel,Button } from 'react-bootstrap';
import ReactDOM from "react-dom";

export default class Limit extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Col smOffset={2} sm={10}>
                {this.props.limit.amount ? <Alert bsStyle='success'
                                             id="alertBox">Your current weekly transaction limit is ${this.props.limit.amount}.</Alert> :
                    <Alert bsStyle='danger'
                           id="alertBox">Please set your transaction limit to secure transaction!</Alert>}
            </Col>

        );
    }
}