import React from "react";
import ReactDOM from 'react-dom';

import { Button,Jumbotron,Grid,Row,Col,Panel,Thumbnail,Label} from 'react-bootstrap';
import {Meteor} from "meteor/meteor";
import axios from 'axios';



export default class BuySellPayment extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            cryptos :''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        //var cryptos = '';
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos:cryptos});
            })


        console.log(this.state.cryptos);
        var transaction = 'BUY';
        var cryptocurrency  = 'ETH';
        var cryptoAmount = this.state.cryptos.USD;
        var bankAmount = text;
        var date = new Date();


        Meteor.call('transactions.insert', transaction, cryptocurrency, cryptoAmount, bankAmount, date );

        // Clear form
        console.log(text);
        ReactDOM.findDOMNode(this.refs.textInput).value = '';

    }



    render(){
        return (
            <div className="buySellPayment">
                <Grid>
                    <Row>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/Bitcoin-icon.png" alt="20x20">

                            </Thumbnail>
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                            <button onClick={this.handleSubmit}>-BUY-</button>

                        </Col>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/etherium-icon.png" alt="20x20">
                            </Thumbnail>
                        </Col>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/litecoin-icon.png" alt="20x20">
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}