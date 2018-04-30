import React from 'react';
import {
    VictoryChart, VictoryLine, VictoryZoomContainer,
    VictoryBrushContainer, VictoryAxis, VictoryTooltip, createContainer
} from "victory";
import axios from "axios/index";
import * as btcRaw from './bitcoin_data';
import * as ethRaw from './ethereum_data';

export default class CompHistViz extends React.Component {
    constructor() {
        super();
        this.state = {
            InitialRowAdded: false,
            btcData: this.importData("btc"),
            ethData: this.importData("eth")
        };
    }

    componentDidMount() {
        console.log("Sam: ComponentDidMount fired");
        this.updateCurrentPrice();
        this.timerID = setInterval(
            () => this.updateCurrentPrice(),
            60000
        );
    }

    componentWillUnmount() {
        console.log("Sam: ComponentWillUnmount fired");
        clearInterval(this.timerID);
    }

    updateCurrentPrice() {
        console.log("Sam: UpdatePrice fired");
        if (this.state.InitialRowAdded) {
            console.log('Sam: The value of InitialRowAdded is'+this.state.InitialRowAdded);
            axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD")
                .then(res => {
                    let newBTCArr = this.state.btcData.slice();
                    let newETHArr = this.state.ethData.slice();
                    console.log("Sam: Updating rows in place");
                    newBTCArr[this.state.btcData.length - 1] = {"Date": this.getDateString(), "Close": res.data.BTC.USD};
                    newETHArr[this.state.ethData.length - 1] = {"Date": this.getDateString(), "Close": res.data.ETH.USD};
                    this.setState({
                        btcData: newBTCArr,
                        ethData: newETHArr
                    });
                });
        }
        else {
            console.log('Sam: The value of InitialRowAdded is'+this.state.InitialRowAdded);
            axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD")
                .then(res => {
                    let newBTCArr = this.state.btcData.slice();
                    let newETHArr = this.state.ethData.slice();
                    console.log('Sam: Adding a new row...');
                    newBTCArr.push({"Date": this.getDateString(), "Close": res.data.BTC.USD});
                    newETHArr.push({"Date": this.getDateString(), "Close": res.data.ETH.USD});
                    console.log("Sam: setting new state...");
                    this.setState({
                        InitialRowAdded: true,
                        btcData: newBTCArr,
                        ethData: newETHArr
                    });
                });
        }
        console.log("Sam: Update method finished");
    }

    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }

    getDateString() {
        let date = new Date();
        return (date.getUTCMonth()+1)+"/"+date.getUTCDate()+"/"+date.getUTCFullYear();
    }

    getDateStringArgs(date) {
        return (date.getUTCMonth()+1)+"/"+date.getUTCDate()+"/"+date.getUTCFullYear();
    }

    importData(curr) {
        let data = [];
        if (curr === "btc") {
            for (x = 0; x < btcRaw.default.length; x++) {
                data.push(btcRaw[x])
            }
        } else if (curr === "eth") {
            for (x = 0; x < ethRaw.default.length; x++) {
                data.push(ethRaw[x])
            }
        }
        return data;
    }

    render() {
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
        return (
            <div>
                <VictoryChart width={600} height={470} scale={{ x: "time" }}
                              containerComponent={
                                  <VictoryZoomVoronoiContainer voronoiDimension="x"
                                      zoomDimension="x"
                                      zoomDomain={this.state.zoomDomain}
                                      onZoomDomainChange={this.handleZoom.bind(this)}
                                  />
                              }
                >
                    <VictoryLine
                        style={{
                            data: { stroke: "tomato" }
                        }}
                        data={this.state.btcData}
                        labels={(d) => `${this.getDateStringArgs(d.x)}: $${d.y}`}
                        labelComponent={<VictoryTooltip />}
                        x={(d) => new Date(d.Date)}
                        y="Close"
                    />

                    <VictoryLine
                        style={{
                            data: { stroke: "steelblue" }
                        }}
                        data={this.state.ethData}
                        labels={(d) => `${this.getDateStringArgs(d.x)}: $${d.y}`}
                        labelComponent={<VictoryTooltip />}
                        x={(d) => new Date(d.Date)}
                        y="Close"
                    />

                    <VictoryAxis
                        fixLabelOverlap={true}
                    />
                    <VictoryAxis
                        dependentAxis
                    />

                </VictoryChart>
                <VictoryChart
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                    width={600} height={100} scale={{ x: "time" }}
                    containerComponent={
                        <VictoryBrushContainer
                            brushDimension="x"
                            brushDomain={this.state.selectedDomain}
                            onBrushDomainChange={this.handleBrush.bind(this)}
                        />
                    }
                >
                    <VictoryAxis
                        fixLabelOverlap={true}
                    />
                    <VictoryLine
                        style={{
                            data: { stroke: "tomato" }
                        }}
                        data={this.state.btcData}
                        x={(d) => new Date(d.Date)}
                        y="Close"
                    />

                    <VictoryLine
                        style={{
                            data: { stroke: "steelblue" }
                        }}
                        data={this.state.ethData}
                        x={(d) => new Date(d.Date)}
                        y="Close"
                    />
                </VictoryChart>
            </div>
        );
    }
}
