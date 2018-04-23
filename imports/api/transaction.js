import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


//export const Tasks = new Mongo.Collection('tasks');
export const TransactionsData = new Mongo.Collection('transactions');
export const Userwallet = new Mongo.Collection('wallet');



if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('transactions', function tasksPublication() {
        return TransactionsData.find({$or: [
            { userId: this.userId },
          ],
        });
    });
    Meteor.publish('wallet', function walletPublication() {
        return Userwallet.find();
    });
}


Meteor.methods({
  
    'transactions.insert'(transaction, cryptototal, cryptocurrency , cryptoAmount , bankAmount , date){
        TransactionsData.insert({
        userId : this.userId,
        transaction :transaction,
        cryptototal :cryptototal,
        cryptocurrency :cryptocurrency,
        cryptoAmount: cryptoAmount,
        bankAmount :bankAmount,
        date : date,
    });
    },

    'wallet.insert'(walletamount, email, walletno){
        Userwallet.insert({
            userId : this.userId,
            email: email,
            walletno:walletno,
            usd: walletamount,
            eth: 0,
            btc: 0,
            initialized: true
        });
    },
    'wallet.update'(usd, btc, eth){
        Userwallet.update(this.userId,{$set:{usd:usd, btc:btc, eth:eth}})
        }
    });

