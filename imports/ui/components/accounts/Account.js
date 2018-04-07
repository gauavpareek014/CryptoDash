import React from "react";
import { Link } from "react-router"
import { Button,Jumbotron } from 'react-bootstrap';

export default class Account extends React.Component{
    render(){
        return (
            <Jumbotron>
                <div className="tabsCustom">
                    <h1>Account Tab</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                    </p>
                </div>
            </Jumbotron>
        );
    }
}

