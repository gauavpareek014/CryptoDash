import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Funds = new Mongo.Collection('funds');

Meteor.methods({

    'funds.insert'() {
    
        Funds.insert({
            usd:2000,
            btc:0,
            eth:0,
            owner:this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'funds.buybtc'(userId,value) {
        check(userId, String);
        check(value, number);
        const fund = Funds.findOne(userId);
    
        Tasks.update(taskId, {$inc: {usd:-value} });
        Tasks.update(taskId, {$inc: {btc: value} });
      },
      
    'funds.buyeth'(userId,value) {
        check(userId, String);
        check(value, number);
        const fund = Funds.findOne(userId);
    
        Tasks.update(taskId, {$inc: {usd:-value} });
        Tasks.update(taskId, {$inc: {eth: value} });
      },
      
    'funds.sellbtc'(userId,value) {
        check(userId, String);
        check(value, number);
        const fund = Funds.findOne(userId);
    
        Tasks.update(taskId, {$inc: {usd: value} });
        Tasks.update(taskId, {$inc: {btc: -value} });
      },
    
      'funds.selleth'(userId,value) {
        check(userId, String);
        check(value, number);
        const fund = Funds.findOne(userId);
    
        Tasks.update(taskId, {$inc: {usd: -value} });
        Tasks.update(taskId, {$inc: {eth: value} });
      },
      
    });