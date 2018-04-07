import React from 'react';
import TitleBar from "./TitleBar";
import Tabs from "./TabUI";
import {browserHistory} from "react-router";
import {Meteor} from "meteor/meteor";

export default class DashBoard extends React.Component{
    render(){
        return (
            <div>
                <TitleBar />
                <Tabs/>
            </div>

        );
    }
};