import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


//export const Tasks = new Mongo.Collection('tasks');
export const TransactionsData = new Mongo.Collection('transactions');




if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('transactions', function tasksPublication() {
        return TransactionsData.find();
    });
}


Meteor.methods({
  
    'transactions.insert'(transaction, cryptocurrency , cryptoAmount , bankAmount , date){
        TransactionsData.insert({
        userId : this.userId,
        transaction :transaction,
        cryptocurrency :cryptocurrency,
        cryptoAmount: cryptoAmount,
        bankAmount :bankAmount,
        date : date,

    });

    },



});