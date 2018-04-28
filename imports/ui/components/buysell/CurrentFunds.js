import React from "react";
import ReactDOM from 'react-dom';
import {Button,Image,Jumbotron,Grid,Row,Col,Panel,Thumbnail,Label,Form,FormGroup,Alert,ControlLabel,FormControl} from 'react-bootstrap';
import FaAccount from 'react-icons/lib/md/account-balance-wallet'
import {Meteor} from "meteor/meteor";
import axios from 'axios';
import { withTracker } from 'meteor/react-meteor-data';
import { Userwallet } from '../../../api/transaction';


class CurrentFunds extends React.Component {

    constructor(props){
        super(props);
        let emailAddress;
        if(Meteor.user()){
            emailAddress = Meteor.user().emails[0].address;
        }
        this.state = {
            email:emailAddress,
            message:'',
            bstyle: 'info',
            usd: '0.00',
            btc: '0.00',
            eth: '0.00'
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let wallet= this.props.wallet;
        if(wallet != 0)
        {
            var usd=wallet[0].usd;
            var btc=wallet[0].btc;
            var eth=wallet[0].eth;
            
            this.setState({
                usd: usd,
                btc: btc,
                eth: eth

            })
        }
    }

    render(){
        return (
            <Panel bsStyle="default">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Current Funds</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal className = "useraccountsetup" onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                USD
                            </Col>
                            <Col sm={10} lg={4}>
                                <FormControl type="number" placeholder="USD" value = {this.state.usd} readOnly="readOnly" ></FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                BTC
                            </Col>
                            <Col sm={10} lg={4}>
                                <FormControl type="number" placeholder="USD" value = {this.state.btc} readOnly="readOnly" ></FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                ETH
                            </Col>
                            <Col sm={10} lg={4}>
                                <FormControl type="number" placeholder="USD" value = {this.state.eth} readOnly="readOnly" ></FormControl>
                            </Col>
                        </FormGroup>                        

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit"  bsStyle="danger">Refresh</Button>
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
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('wallet');
    return {
        wallet: Userwallet.find({},{userId:this.userId}).fetch(),

    };
})(CurrentFunds);