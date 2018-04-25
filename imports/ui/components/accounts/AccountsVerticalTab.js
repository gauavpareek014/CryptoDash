import React from "react";
import { Tab, Tabs, TabList, TabPanel,Row,Col,Nav,NavItem,Grid,Label,Image} from 'react-bootstrap';
import BTCTransactions from "./BTCTransactions";
import ETCTransactions from "./ETCTransactions";
import { withTracker } from 'meteor/react-meteor-data';
import { Userwallet } from '../../../api/transaction';
import axios from 'axios';


class AccountsVerticalTab extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            btc: '0.00',
            eth: '0.00',
            btcwallet: '0.00',
            ethwallet: '0.00',
            btctotal: '0.00',
            ethtotal: '0.00'
        };
    }

    HandleonLoad(){
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
        .then(res => {
            const btcs = res.data;
            console.log(btcs);
            this.setState({btc: btcs});
        })
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(res => {
                const eths = res.data;
                console.log(eths);
                this.setState({eth: eths});
            })
        }
        HandleonClick(){
        let wallet = this.props.wallet;
        if(wallet != 0){
            var btctotal= wallet[0].btc*this.state.btc.USD;
            var ethtotal=wallet[0].eth*this.state.eth.USD;
            btctotal=Math.round(btctotal*100)/100;
            ethtotal=Math.round(ethtotal*100)/100;
            this.setState({
            btcwallet:wallet[0].btc,
            ethwallet:wallet[0].eth,
            btctotal:btctotal,
            ethtotal:ethtotal
        });
    }
}
 


    render(){
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" onLoad={this.HandleonLoad.bind(this)} >
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" className = "customColor"  onClick={this.HandleonClick.bind(this)}>
                               <div>
                                <Grid>
                                    <Row className="show-grid">
                                        <Col lg={2}>
                                            <Image src="/images/Bitcoin-icon.png" circle width="40px" height="40px"/>
                                        </Col>

                                        <Col lg={6}>
                                            <h4> <Label className = "label">{this.state.btcwallet} BTC = $ {this.state.btctotal} </Label></h4>
                                        </Col>
                                    </Row>
                                </Grid>
                            </div>
                            </NavItem>
                            <NavItem eventKey="second" className = "customColor" onClick={this.HandleonClick.bind(this)}>
                                <div>
                                    <Grid>
                                        <Row className="show-grid">
                                            <Col lg={2}>
                                                <Image src="/images/etherium-icon.png" circle width="40px" height="40px"/>
                                            </Col>
                                            <Col lg={6}>
                                                <h4> <Label className = "label">{this.state.ethwallet} ETC = $ {this.state.ethtotal} </Label></h4>
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

export default withTracker(() => {
    Meteor.subscribe('wallet');
    return {
        wallet: Userwallet.find({},{userId:this.userId}).fetch(),
    };
})(AccountsVerticalTab);