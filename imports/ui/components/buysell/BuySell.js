import React from "react";
import { Button,Jumbotron,Grid,Row,Col,Panel } from 'react-bootstrap';
import BuySellTab from './BuySellTab';
import {Meteor} from "meteor/meteor";
import BuyPayment from "./BuyPayment";
import SellPayment from "./SellPayment";
import Transaction from "./Transaction";
import { withTracker } from 'meteor/react-meteor-data';
import { TransactionsData, Userwallet } from '../../../api/transaction';

class BuySell extends React.Component{

    constructor(props){
        super(props);
        console.log("User id : " + Meteor.userId());

        var obj = Meteor.user();
        if(obj != undefined){
            obj = Meteor.user().emails[0].address;
        }
        console.log("User id : " + obj);
    }

    renderTasks() {
        let transactions = this.props.transactions;
        let wallet = this.props.wallet;

        return transactions.map((transaction) => {

            return (
                <Transaction
                    key={transaction._id}
                    transaction={transaction}
                />
            );
        });
        /*return (
        <li><span>abc</span></li>
        );*/
    }


    render(){
        return (
            <Jumbotron>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={12} md={12} lg={12}>
                            <BuySellTab/>
                        </Col>

                       {/* <Col sm={6} md={6} lg={6}>
                            <Panel bsStyle="default">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Transaction Details</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <TransactionDetails/>
                                    <ul>
                                        {this.renderTasks()}
                                    </ul>
                                </Panel.Body>
                            </Panel>
                        </Col>*/}
                    </Row>
                </Grid>
            </Jumbotron>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('transactions');
    Meteor.subscribe('wallet');
    return {
        wallet: Userwallet.find({},{userId:this.userId}).fetch(),
        transactions: TransactionsData.find({},{ sort: { createdAt: -1 } }).fetch(),
    };
})(BuySell);