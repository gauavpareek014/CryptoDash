import React from "react";
import ReactDOM from 'react-dom';

import { Button,Jumbotron,Grid,Row,Col,Panel,Thumbnail,Label} from 'react-bootstrap';
import {Meteor} from "meteor/meteor";
import axios from 'axios';



export default class BuySellPayment extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            cryptos :'0.00',
            currency:' ',
            buy:'BUY'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bitcoin(){
     this.setState({currency:"BTC"});

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos:cryptos});
            })

    }
    etherium(){
      this.setState({currency:"ETH"});

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos:cryptos});
            })

    }
    buy(){
        this.setState({buy:"BUY"});
    }
    sell(){
        this.setState({buy:"SELL"});
    }

    handleSubmit(event) {
        event.preventDefault();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        //var cryptos = '';
        
       

        console.log(this.state.cryptos);
        var transaction = 'BUY';
        var cryptocurrency  = this.state.currency;
        var cryptoAmount = this.state.cryptos.USD;
        var cryptototal = number/cryptoAmount;
        var bankAmount = number;
        var date = new Date();



        Meteor.call('transactions.insert', transaction, cryptototal, cryptocurrency, cryptoAmount, bankAmount, date );

        // Clear form
        console.log(number);
        console.log(cryptototal);
        ReactDOM.findDOMNode(this.refs.numberInput).value = '';

    }



    render(){
        return (
            <div className="buySellPayment">
                <Grid>
                    <Row>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/Bitcoin-icon.png" alt="20x20" id="btc" onClick={this.bitcoin.bind(this)}>
                            </Thumbnail>
                            <input
                                type="number"
                                ref="numberInput"
                                placeholder="0.00 USD"
                            />
                            <input
                            readOnly
                            value={this.state.cryptos.USD+" "+this.state.currency}
                            />
                            
                            
                            <button onClick={this.handleSubmit}>{this.state.buy}</button>

                        </Col>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/etherium-icon.png" alt="20x20" onClick={this.etherium.bind(this)}>
                            </Thumbnail>
                        </Col>
                      
                    </Row>
                </Grid>

            </div>
        );
    }
}