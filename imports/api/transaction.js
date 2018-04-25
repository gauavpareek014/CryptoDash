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
        return Userwallet.find({$or: [
            { userId: this.userId },]});
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

    'wallet.insert'(walletamount, walletno){
        Userwallet.insert({
            userId : this.userId,
            walletno:walletno,
            usd: walletamount,
            eth: 0,
            btc: 0,
            initialized: true
        });
    },
    'wallet.update'(walletid, usdin, btcin, ethin){
        Userwallet.update({_id:walletid}, { $set:  {usd: usdin}});
        Userwallet.update({_id:walletid}, { $set:  {btc: btcin}});
        Userwallet.update({_id:walletid}, { $set:  {eth: ethin}});

    }
    });

