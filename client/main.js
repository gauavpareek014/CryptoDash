import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from "meteor/tracker";
import App from "../imports/ui/App";
import {Router,Route, browserHistory} from 'react-router';
import DashBoard from '../imports/ui/components/login/DashBoard';
import NotFound from './../imports/ui/NotFound';


const routes = (
    <Router history={browserHistory}>
        <Route path="/" component = {App}/>
        <Route path="/dashboard" component = {DashBoard}/>
        <Route path="*" component = {NotFound}/>
    </Router>
);


Meteor.startup( () => {
    Tracker.autorun( () => {
        ReactDOM.render(routes, document.getElementById("app"));
        if(Meteor.user()){
            browserHistory.replace('/Dashboard');
        }else{
            browserHistory.replace('/');
        }
    });
});