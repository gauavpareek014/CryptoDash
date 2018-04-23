import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Transaction extends Component{

    render(){
        return(
            <li>
                
            <span >
          <strong> {this.props.transaction.date.toString()}  {this.props.transaction.transaction}: {this.props.wallet.usd} </strong>

        </span>
                <span>  {this.props.transaction.cryptocurrency} {this.props.transaction.cryptototal}  ------- $ {this.props.transaction.bankAmount}</span>
            </li>

        );
    }
}