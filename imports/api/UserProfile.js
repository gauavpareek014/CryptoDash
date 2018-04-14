import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import { Session } from 'meteor/session';

export const UserProfile = new Mongo.Collection('userprofile');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('userprofile', function userPublication() {
        return UserProfile.find({owner: this.userId});
    });
}


Meteor.methods({
    'userprofile.insert'(firstName, lastName, contact, address,id) {
        check(firstName, String);
        check(lastName, String);
        check(contact, String);
        check(address, String);
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!id) {
            UserProfile.insert({firstName,
                lastName,
                contact,
                address,
                owner: this.userId,
                username: Meteor.users.findOne(this.userId).username,},function(err,res){
                if (err) {
                    throw new Meteor.Error(333, UserProfile.simpleSchema().namedContext('create').invalidKeys());
                }else{
                    Session.set("UserProfileId",res);
                }
            });
        } else {
            var noOfRows =   UserProfile.update({"owner":Meteor.userId()},
                {$set: {
                        "firstName": firstName,
                        "lastName": lastName,
                        "address": address,
                        "contact": contact
                    }
                });
            return noOfRows;

        }
    },
});
