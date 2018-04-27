import React from "react";
import {Meteor} from "meteor/meteor";
import Transaction from "./../buysell/Transaction";
import { withTracker } from 'meteor/react-meteor-data';
import { TransactionsData } from '../../../api/transaction';
import axios from 'axios';


class PortfolioPerformance extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           cryptototal: " ",
           cryptototal: " ",
            currency:'Calculate Profit',
            currency2:'Calculate Profit',
            btc:"0",
            eth:"0",
        }
    }

    renderTasks() {
        let transactions = this.props.transactions;
       if(transactions != 0){
           if(this.state.wait == "go"){
        var length = transactions.length;
        var totalcrypto=0;
        var totalspent=0;
        for(n=0; n<length; n++){
            if(transactions[n].cryptocurrency == 'BTC'){
                     if(transactions[n].transaction == 'BUY'){
                     totalcrypto+=transactions[n].cryptototal;
                     totalspent+=transactions[n].bankAmount;
                    }
                    else
                    {
                        totalcrypto-=transactions[n].cryptototal;
                        totalspent-=transactions[n].bankAmount;
                    }
        
                    }
        }
        totalcrypto=totalcrypto*this.state.btc.USD;
        totalcrypto=totalcrypto-totalspent;
        totalcrypto=Math.round(totalcrypto*100)/100;
        

        this.setState(
           {cryptototal: totalcrypto,
            currency:"$"});
        };
    }
    }
        renderTasks2() {
            let transactions = this.props.transactions;
            if(transactions !=0){
                if(this.state.wait == "go"){
            var length = transactions.length;
            var totalcrypto2=0;
            var totalspent2=0;
            for(n=0; n<length; n++){
                if(transactions[n].cryptocurrency == 'ETH'){
            if(transactions[n].transaction == 'BUY'){
             totalcrypto2+=transactions[n].cryptototal;
             totalspent2+=transactions[n].bankAmount;
            }
            else
            {
                totalcrypto2-=transactions[n].cryptototal;
                totalspent2-=transactions[n].bankAmount;
            }

            }
        }
            totalcrypto2=totalcrypto2*this.state.eth.USD;
            totalcrypto2=totalcrypto2-totalspent2;
            totalcrypto2=Math.round(totalcrypto2*100)/100;
    
            this.setState(
               {cryptototal2: totalcrypto2,
                currency2:"$"});
            };
        }
        }
    
            handleOnLoad(){
                axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                .then(res => {
                    const cryptos = res.data;
                    console.log(cryptos);
                    this.setState({eth: cryptos});
                });
                axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
                .then(res => {
                    const cryptos = res.data;
                    console.log(cryptos);
                    this.setState({btc: cryptos});
                });
                this.setState(
                    {
                        wait: "go"
                    }
                )
                
            }

      


    render(){
        return (
            <div onClick={this.handleOnLoad.bind(this)}>
            <ul>
           < h4 className="trandetails" onClick={this.renderTasks.bind(this)}> BTC Profit: {this.state.currency} {this.state.cryptototal}</h4>
           < h4 className="trandetails" onClick={this.renderTasks2.bind(this)}> ETH Profit: {this.state.currency2} {this.state.cryptototal2}</h4>
            </ul> 
            </div>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('transactions');
    return {
        transactions: TransactionsData.find({}).fetch(),
    };
})(PortfolioPerformance);