import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Limits = new Mongo.Collection('limits');


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('limits', function limitsPublication() {
        return Limits.find({userId: Meteor.userId()});
    });
}

Meteor.methods({
    'limits.upsert'(limitAmount , date){
        Limits.upsert({
            // Selector
            userId : this.userId,
        }, {
            // Modifier
            $set: {
                amount :limitAmount,
                limiter: limitAmount,
                date : date,
            }
        });
    },
    'limits.update'(limitid,limitAmount){
        Limits.update({_id:limitid}, { $set:  {limiter: limitAmount}});

    }
});