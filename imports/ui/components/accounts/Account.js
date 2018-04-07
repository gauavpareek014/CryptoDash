import React from "react";
import { Link } from "react-router"
import { Button,Jumbotron,Grid,Row,Col } from 'react-bootstrap';
import AccountsVerticalTab from "../accounts/AccountsVerticalTab";

export default class Account extends React.Component{
    render(){
        return (
            <Jumbotron>
                <Grid>
                    <Row className="show-grid">
                        <Col>
                            <AccountsVerticalTab/>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        );
    }
}

