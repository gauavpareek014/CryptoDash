import React from "react";
import { Tab, Tabs, TabList, TabPanel,Row,Col,Nav,NavItem,Grid,Label,Image} from 'react-bootstrap';
import BTCTransactions from "./BTCTransactions";
import ETCTransactions from "./ETCTransactions";


export default class AccountsVerticalTab extends React.Component{
    render(){
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" className = "customColor">
                               <div>
                                <Grid>
                                    <Row className="show-grid">
                                        <Col lg={2}>
                                            <Image src="/images/Bitcoin-icon.png" circle width="40px" height="40px"/>
                                        </Col>

                                        <Col lg={6}>
                                            <h4> <Label className = "label">0000.00 BTC = $ 0.00</Label></h4>
                                        </Col>
                                    </Row>
                                </Grid>
                            </div>
                            </NavItem>
                            <NavItem eventKey="second" className = "customColor">
                                <div>
                                    <Grid>
                                        <Row className="show-grid">
                                            <Col lg={2}>
                                                <Image src="/images/etherium-icon.png" circle width="40px" height="40px"/>
                                            </Col>
                                            <Col lg={6}>
                                                <h4> <Label className = "label">0000.00 ETC = $ 0.00</Label></h4>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation className = "customColor">
                            <Tab.Pane eventKey="first">
                                <BTCTransactions/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ETCTransactions/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

