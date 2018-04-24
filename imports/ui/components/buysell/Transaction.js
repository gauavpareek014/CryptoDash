import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup,ListGroupItem,Label,Image } from 'react-bootstrap';
import FaEqual from 'react-icons/lib/ti/equals'

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
            <ListGroup>
                <ListGroupItem header={[this.state.date+" "+this.state.month + " "+this.state.year+" ",
                    <Label>{this.props.transaction.transaction}</Label>]}
                               bsStyle={this.props.transaction.transaction == 'BUY'?'success':'danger'}>
                    <font size="3">
                        {this.props.transaction.cryptocurrency == 'BTC'? <Image src="/images/Bitcoin-icon.png" width="23px" height="23px" title="Bitcoin"
                                                                                />:<Image src="/images/etherium-icon.png" width="23px" height="23px" title="Ethereum"
                                                                                                    />}
                        <t></t> {this.props.transaction.cryptototal} <FaEqual/> $ {this.props.transaction.bankAmount}
                    </font>
                </ListGroupItem>
            </ListGroup>
        );
    }
}
