import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Transaction extends Component{

    render(){
        return(
            <li>
            <span >
          <strong> {this.props.transaction.cryptototal}</strong>

        </span>
                <span> {this.props.transaction.cryptocurrency}  ------- $ {this.props.transaction.bankAmount}</span>
            </li>

        );
    }
}