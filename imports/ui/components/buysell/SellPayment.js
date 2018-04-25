import React from "react";
import ReactDOM from 'react-dom';
import {Button,Image,Jumbotron,Grid,Row,Col,Panel,Thumbnail,Label,Form,FormGroup,Alert,ControlLabel,FormControl} from 'react-bootstrap';
import FaAccount from 'react-icons/lib/md/account-balance-wallet'
import {Meteor} from "meteor/meteor";
import axios from 'axios';
import { withTracker } from 'meteor/react-meteor-data';
import { Userwallet } from '../../../api/transaction';


class SellPayment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptos: '0.00',
            currency: 'NULL',
            buy: 'SELL',
            amount:'0.000',
            usd: '0.000',
            cryptototal: '0.000'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bitcoin() {
        this.setState({currency: "BTC"});

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos: cryptos});
            })
        document.getElementById("btc2").setAttribute("class", "");
        document.getElementById("eth2").setAttribute("class", "thumbnail");


    }

    etherium() {
        this.setState({currency: "ETH"});

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos: cryptos});
            })
        document.getElementById("eth2").setAttribute("class", "");
        document.getElementById("btc2").setAttribute("class", "thumbnail");


    }

    handleSubmit(event) {
        event.preventDefault();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        //var cryptos = '';
        let wallet = this.props.wallet;

        if(wallet != 0){
        console.log(this.state.cryptos);
        var transaction = 'SELL';
        var cryptocurrency = this.state.currency;
        var cryptoAmount = this.state.cryptos.USD;
        var cryptototal = number;
        var bankAmount = number * cryptoAmount;
        var date = new Date();
        var eth= wallet[0].eth;
        var btc=wallet[0].btc;
        var usd=wallet[0].usd;
        var walletid =wallet[0]._id;
        if(this.state.currency == "BTC"){
            btc=btc-cryptototal;
            usd= usd+bankAmount;
            
            }
            if(this.state.currency == "ETH"){
            eth=eth-cryptototal;
            usd= usd+bankAmount;
            }

        if(btc >= 0 && eth >=0 && cryptocurrency != ''){
        Meteor.call('transactions.insert', transaction, cryptototal, cryptocurrency, cryptoAmount, bankAmount, date );
        Meteor.call('wallet.update',walletid,usd,btc,eth);
        this.setState({
            message: 'sale successful!',
            bstyle: 'success',
        });  
        }
        else{
            this.setState({
                message: 'Transaction Error, please review your sale',
                bstyle: 'danger',
            });
    }
}
    else{
        this.setState({
            message: 'Account Setup Error! Please setup your account to start the transaction',
            bstyle: 'danger',
        });
    }
        
        // Clear form
        console.log(number);
        console.log(cryptototal);
        console.log(usd);
        ReactDOM.findDOMNode(this.refs.numberInput).value = '';

    }

    changeAmount(){
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        let wallet = this.props.wallet;

        if(wallet != 0){
        
        this.setState({
            amount:number!=""?number:"0.00",
            cryptototal:number * this.state.cryptos.USD, 
        });
        if(this.state.currency == 'ETH'){
        this.setState({
            usd:wallet[0].eth-number
        })
    }
        if(this.state.currency == 'BTC'){
            this.setState({
                usd:wallet[0].btc-number
            })
        }
    }
}

    render() {
        return (
            <div className="buySellPayment">
                <Grid>
                    <Row>
                        <Col xs={12} md={6}>
                            <Row>
                        <Col xs={4} md={2}>
                            <Image src="/images/Bitcoin-icon.png" width="50px" height="50px" alt="20x20" id="btc2"
                                   onClick={this.bitcoin.bind(this)} responsive/>
                        </Col>
                        <Col xs={4} md={2}>
                            <Image src="/images/etherium-icon.png" width="50px" height="50px" alt="20x20" id="eth2"
                                   onClick={this.etherium.bind(this)} responsive/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={20} md={20}>
                            <Form horizontal className="customForm" onSubmit={this.handleSubmit.bind(this)}>
                                <FormGroup controlId="formHorizontalCrypto">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        {this.state.currency}:
                                    </Col>
                                    <Col sm={10} lg={4}>
                                        <FormControl type="text" placeholder={this.state.cryptos.USD}
                                                     defaultValue={this.state.cryptos.USD}
                                                     readOnly="readOnly"></FormControl>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalInput">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        {this.state.currency}:
                                    </Col>
                                    <Col sm={10} lg={4}>
                                        <FormControl type="float" ref="numberInput"
                                                     placeholder={"0.00 " + this.state.currency} onKeyUp={this.changeAmount.bind(this)} required/>

                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button type="submit" bsStyle="danger">{this.state.buy}</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {this.state.message ? <Alert bsStyle={this.state.bstyle}
                                                                     id="alertBox">{this.state.message}</Alert> : undefined}
                                    </Col>
                                </FormGroup>
                            </Form>

                        </Col>
                    </Row>
                        </Col>
                        <Col xs={12} md={6}>
                            <Panel bsStyle="default">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Transaction Details</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <h2 className="trandetails">You are selling</h2>
                                    <h3 className="trandetails">{this.state.amount} {this.state.currency}</h3>
                                    <h4 className="trandetails">@ ${this.state.cryptos.USD} per {this.state.currency}</h4>
                                    <hr/>
                                    <h4 className="trandetails"><FaAccount/>Selling Method : virtual wallet</h4>
                                    <h4 className="trandetails">Entered Amount is: {this.state.number} {this.state.currency}</h4>
                                    <hr/>
                                    <h5 className="trandetails">{this.state.amount} {this.state.currency} .................... ${this.state.cryptototal} </h5>
                                    <h5 className="trandetails"> Remaining Wallet Amount .................... {this.state.usd} {this.state.currency}</h5>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>


            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('wallet');
    return {
        wallet: Userwallet.find({},{"userId":this.userId}).fetch(),
    };
})(SellPayment);