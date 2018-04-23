import React from "react";
import ReactDOM from 'react-dom';

import {
    Button,
    Image,
    Jumbotron,
    Grid,
    Row,
    Col,
    Panel,
    Thumbnail,
    Label,
    Form,
    FormGroup,
    Alert,
    ControlLabel,
    FormControl
} from 'react-bootstrap';
import {Meteor} from "meteor/meteor";
import axios from 'axios';

<style>
</style>


export default class SellPayment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptos: '0.00',
            currency: '',
            buy: 'SELL',
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


        console.log(this.state.cryptos);
        var transaction = 'SELL';
        var cryptocurrency = this.state.currency;
        var cryptoAmount = this.state.cryptos.USD;
        var cryptototal = number;
        var bankAmount = number * cryptoAmount;
        var date = new Date();
<<<<<<< HEAD
        var btc = 10;
        var eth = 10;
        var usd = 10;
        if(this.state.currency == "BTC"){
            btc=10-cryptototal;
            usd= usd+bankAmount;
            
            }
            if(this.state.currency == "ETH"){
            eth=10-cryptototal;
            usd= usd+bankAmount;
            }


        if(btc >= 0 && eth >=0 && cryptocurrency != ''){
        Meteor.call('transactions.insert', transaction, cryptototal, cryptocurrency, cryptoAmount, bankAmount, date );
        Meteor.call('wallet.update',usd,btc,eth);

=======


        if (bankAmount != 0 && cryptocurrency != '') {
            Meteor.call('transactions.insert', transaction, cryptototal, cryptocurrency, cryptoAmount, bankAmount, date);
>>>>>>> c90daf9c67c57af4de562e95bbf1c1adcc6a4ece
        }
        // Clear form
        console.log(number);
        console.log(cryptototal);
        console.log(usd);
        ReactDOM.findDOMNode(this.refs.numberInput).value = '';

    }


    render() {
        return (
            <div className="buySellPayment">
                <Grid>
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
                                        <FormControl type="number" ref="numberInput"
                                                     placeholder={"0.00 " + this.state.currency} required/>
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
                </Grid>


            </div>
        );
    }
}