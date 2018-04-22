import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup,ListGroupItem,Panel,Label,button,Row,Grid,Col } from 'react-bootstrap';

export default class Transaction extends Component{

    constructor(props){
        super(props);
        if(this.props.transaction != null) {

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            var d =new Date(this.props.transaction.date);  //converts the string into date object
            var m=d.getMonth(); //get the value of month
            var date =d.getDate();
            var year = d.getFullYear();
            console.log("Transactions" + months[m]);
            this.state = {

                month: months[m],
                date: date,
                year :year
            }
        }

    }

    render(){
        return(
            <ListGroupItem href="#link1" bsStyle={this.props.transaction.transaction == 'BUY'?'success':'danger'}>

                <Grid>
                    <Row className="show-grid">
                        <Col md={5} sm={5}>
                            <button className="button button--rect">{this.state.month}</button>
                            <button className="button button--rect">{this.state.date}</button>
                            <button className="button button--rect">{this.state.year}</button>
                        </Col>
                        <Col md={1} sm={1}>
                            <button className="button button--rect-color">{this.props.transaction.transaction}</button>
                        </Col>
                        <Col md={5} sm={5}>
                            <button className="button button--rect-currency">{this.props.transaction.cryptototal} BTC = ${this.props.transaction.bankAmount}</button>
                        </Col>
                    </Row>
                </Grid>
            </ListGroupItem>

        );
    }
}