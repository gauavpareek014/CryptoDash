import React from "react";
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { Button,Jumbotron,Grid,Row,Col,Panel,Thumbnail,Label,Form, FormGroup,Alert, ControlLabel, FormControl} from 'react-bootstrap';
=======

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
>>>>>>> c90daf9c67c57af4de562e95bbf1c1adcc6a4ece
import {Meteor} from "meteor/meteor";
import axios from 'axios';


export default class BuyPayment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
<<<<<<< HEAD
            cryptos :'0.00',
            currency:'',
            buy:'BUY',
            btc:this.props.btc,
            eth:this.props.eth,

=======
            cryptos: '0.00',
            currency: '',
            buy: 'BUY'
>>>>>>> c90daf9c67c57af4de562e95bbf1c1adcc6a4ece
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
        document.getElementById("btc").setAttribute("class", "");
        document.getElementById("eth").setAttribute("class", "thumbnail");


    }

    etherium() {
        this.setState({currency: "ETH"});

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos: cryptos});
            })
        document.getElementById("eth").setAttribute("class", "");
        document.getElementById("btc").setAttribute("class", "thumbnail");

    }

    buy() {
        this.setState({buy: "BUY"});
    }

    sell() {
        this.setState({buy: "SELL"});
    }

    handleSubmit(event) {
        event.preventDefault();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        //var cryptos = '';

        console.log(this.state.cryptos);
        var transaction = 'BUY';
        var cryptocurrency = this.state.currency;
        var cryptoAmount = this.state.cryptos.USD;
        var cryptototal = number / cryptoAmount;
        var bankAmount = number;
        var date = new Date();
        var eth=0;
        var btc=0;
        var usd=-number;
        if(this.state.currency == "BTC"){
        btc=cryptototal;
        
        }
        if(this.state.currency == "ETH"){
        eth=cryptototal;
        }
    


<<<<<<< HEAD
        if(usd >= 0 && cryptocurrency != ''){
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
        console.log(date);
        console.log(usd);
        console.log(btc);
        console.log(eth);
        ReactDOM.findDOMNode(this.refs.numberInput).value = '';

    }


    render() {
        return (
            <div className="buySellPayment">
                <Grid>
                    <Row>
                        <Col xs={4} md={2}>
                            <Image src="/images/Bitcoin-icon.png" alt="20x20" id="btc" width="50px" height="50px"
                                   onClick={this.bitcoin.bind(this)} responsive/>
                        </Col>
                        <Col xs={4} md={2}>
                            <Image src="/images/etherium-icon.png" alt="20x20" id="eth" width="50px" height="50px"
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
                                        USD:
                                    </Col>
                                    <Col sm={10} lg={4}>
                                        <FormControl type="number" ref="numberInput" placeholder="0.00 USD" required/>
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