import React from "react";
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Grid, Row, Col, Jumbotron,Form, FormGroup,Alert, ControlLabel, FormControl,Panel,Button} from 'react-bootstrap';
import {UserProfile} from "../../../api/UserProfile";
import {Userwallet} from "../../../api/transaction";
import { withTracker } from 'meteor/react-meteor-data';
import { exists } from "fs";
import { Limits } from "../../../api/limit";


class AccountSetup extends React.Component{

    constructor(props){
        super(props);
        let emailAddress;
        if(Meteor.user()){
            emailAddress = Meteor.user().emails[0].address;
            
        }

        this.state = {
            email:emailAddress,
        };
    };
    handleSubmit(event) {
        event.preventDefault();
        const amount = ReactDOM.findDOMNode(this.refs.walletamount).value.trim();        
        const number = ReactDOM.findDOMNode(this.refs.walletno).value.trim();
        console.log(amount);
        console.log(number);
        var email = this.state.email;
        var walletno  = number;
        var walletamount = amount;
        let wallet = this.props.wallet;
        var date = new Date();
        var limit=0;
        if(wallet == 0){
            Meteor.call('wallet.insert', walletamount, walletno);
            Meteor.call('limits.upsert',limit,date);
            this.setState({
                message: 'Account initialized!',
                bstyle: 'success',
                
            });  
        }
        else{
            this.setState({
                message: 'Account has already been initialized',
                bstyle: 'danger',
            });

            
            console.log(email);
            console.log(walletno);
            console.log(walletamount);
            
        
        }
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
                                        <Form horizontal className = "useraccountsetup" onSubmit={this.handleSubmit.bind(this)}>
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
                                                    <FormControl type="number" placeholder="545564345" ref="walletno" readOnly="readOnly" defaultValue = "545564345" required/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formHorizontalAddress">
                                                <Col componentClass={ControlLabel} sm={2}>
                                                     Wallet Amount
                                                </Col>
                                                <Col sm={10} lg={4}>
                                                    <FormControl type="number" placeholder="$10000" ref="walletamount" defaultValue = "10000"  readOnly="readOnly" required/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col smOffset={2} sm={10}>
                                                {this.state.message ? <Alert bsStyle={this.state.bstyle}
                                                             id="alertBox">{this.state.message}</Alert> : undefined}
              
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

export default withTracker(() => {
    Meteor.subscribe('wallet');
    Meteor.subscribe('limits');
    return {
        wallet: Userwallet.find({},{"userId":this.userId}).fetch(),
        limits: Limits.find({userId: Meteor.userId()}).fetch(),
    };
})(AccountSetup);