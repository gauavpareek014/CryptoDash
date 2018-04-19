import React from "react";
import { ListGroup,ListGroupItem,Panel,Label,button,Row,Grid,Col } from 'react-bootstrap';

export default class BTCTransactions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            bstyle:'danger',
        };

    }

    render(){
        return (

            <Panel bsStyle="default">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">BTC Wallet</Panel.Title>
                </Panel.Heading>
                <Panel.Body>

                    <ListGroup>
                        <ListGroupItem href="#link1" bsStyle="success">
                            <Grid>
                                <Row className="show-grid">
                                        <Col md={5} sm={5}>
                                            <button className="button button--rect">Apr</button>
                                            <button className="button button--rect">15</button>
                                            <button className="button button--rect">2018</button>
                                        </Col>
                                        <Col md={1} sm={1}>
                                            <button className="button button--rect-color">Buy</button>
                                        </Col>
                                        <Col md={5} sm={5}>
                                            <button className="button button--rect-currency">+0.00046862 BTC = $10.00</button>
                                        </Col>
                                </Row>
                            </Grid>
                        </ListGroupItem>
                    </ListGroup>
                </Panel.Body>
            </Panel>

        );
    }
}

