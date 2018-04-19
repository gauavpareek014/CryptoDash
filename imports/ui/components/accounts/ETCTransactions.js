import React from "react";
import { ListGroup,ListGroupItem,Panel,Grid,Row,Col,button} from 'react-bootstrap';

export default class ETCTransactions extends React.Component{
    render(){
        return (

            <Panel bsStyle="default">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">ETC Wallet</Panel.Title>
                </Panel.Heading>
                <Panel.Body>

                    <ListGroup>
                        <ListGroupItem href="#link1" bsStyle="danger">
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

