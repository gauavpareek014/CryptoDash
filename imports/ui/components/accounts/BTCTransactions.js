import React from "react";
import { ListGroup,ListGroupItem,Panel } from 'react-bootstrap';

export default class BTCTransactions extends React.Component{
    render(){
        return (

            <Panel bsStyle="default">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">BTC Wallet</Panel.Title>
                </Panel.Heading>
                <Panel.Body>

                    <ListGroup>
                        <ListGroupItem href="#link1">Link 1</ListGroupItem>
                        <ListGroupItem href="#link2">Link 2</ListGroupItem>
                        <ListGroupItem >Trigger an alert</ListGroupItem>
                    </ListGroup>
                </Panel.Body>
            </Panel>

        );
    }
}

