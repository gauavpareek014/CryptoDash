import React from "react";
import {Meteor} from "meteor/meteor";
import Transaction from "./../buysell/Transaction";
import { withTracker } from 'meteor/react-meteor-data';
import { TransactionsData } from '../../../api/transaction';

class RecentActivity extends React.Component{
    constructor(props){
        super(props);
        var obj = Meteor.user();
        if(obj != undefined){
            obj = Meteor.user().emails[0].address;
        }
    }
    renderTasks() {
        let transactions = this.props.transactions;
        return transactions.map((transaction) => {
            return (
                <Transaction
                    key={transaction._id}
                    transaction={transaction}
                />
            );
        });
    }


    render(){
        return (
            <ul>
                {this.renderTasks()}
            </ul>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('transactions');
    return {
        transactions: TransactionsData.find({},{ sort: { date: -1 },limit:5 }).fetch(),
    };
})(RecentActivity);