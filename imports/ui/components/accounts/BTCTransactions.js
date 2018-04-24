import React from "react";
import {Meteor} from "meteor/meteor";
import { ListGroup,ListGroupItem,Panel,Label,button,Row,Grid,Col } from 'react-bootstrap';
import {TransactionsData} from "../../../api/transaction";
import { withTracker } from 'meteor/react-meteor-data';
import Transaction from "./Transaction";


class BTCTransactions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            bstyle:'danger',
        };

    }

    renderTask(){
        let transactions = this.props.transactions;

        return transactions.map((transaction) => {
            return(
                <Transaction key={transaction._id}
                             transaction ={transaction}
                />
            );
        })
    }

    render(){
        return (

            <Panel bsStyle="default">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">BTC Wallet</Panel.Title>
                </Panel.Heading>
                <Panel.Body>

                    <ListGroup>
                        {this.renderTask()}
                        {/*
                        <ListGroupItem href="#link1" bsStyle="success">
                            <Grid>
                                <Row className="show-grid">
                                        <Col md={5} sm={5}>
                                            <button className="button button--rect">Apr</button>
                                            <button className="button button--rect">15</button>
                                            <button className="button button--rect">2018</button>
                                        </Col>
                                        <Col md={1} sm={1}>
                                            <button className="button button--rect-color">Buy</button>
                                        </Col>
                                        <Col md={5} sm={5}>
                                            <button className="button button--rect-currency">+0.00046862 BTC = $10.00</button>
                                        </Col>
                                </Row>
                            </Grid>
                        </ListGroupItem>*/}
                    </ListGroup>
                </Panel.Body>
            </Panel>

        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('transactions');

    return {
        transactions: TransactionsData.find({},{ sort: { date: -1 } }).fetch(),
    };
})(BTCTransactions);

