import React from 'react';
import {
    VictoryChart, VictoryLine, VictoryZoomContainer,
    VictoryBrushContainer, VictoryAxis, VictoryTooltip, createContainer
} from "victory";
import axios from "axios/index";

export default class CompHistViz extends React.Component {
    constructor() {
        super();
        this.state = {
            InitialRowAdded: false,
            btcData: [
                {"Date": "1/1/2018","Close": 13657.2},
                {"Date": "1/2/2018","Close": 14982.1},
                {"Date": "1/3/2018","Close": 15201},
                {"Date": "1/4/2018","Close": 15599.2},
                {"Date": "1/5/2018","Close": 17429.5},
                {"Date": "1/6/2018","Close": 17527},
                {"Date": "1/7/2018","Close": 16477.6},
                {"Date": "1/8/2018","Close": 15170.1},
                {"Date": "1/9/2018","Close": 14595.4},
                {"Date": "1/10/2018","Close": 14973.3},
                {"Date": "1/11/2018","Close": 13405.8},
                {"Date": "1/12/2018","Close": 13980.6},
                {"Date": "1/13/2018","Close": 14360.2},
                {"Date": "1/14/2018","Close": 13772},
                {"Date": "1/15/2018","Close": 13819.8},
                {"Date": "1/16/2018","Close": 11490.5},
                {"Date": "1/17/2018","Close": 11188.6},
                {"Date": "1/18/2018","Close": 11474.9},
                {"Date": "1/19/2018","Close": 11607.4},
                {"Date": "1/20/2018","Close": 12899.2},
                {"Date": "1/21/2018","Close": 11600.1},
                {"Date": "1/22/2018","Close": 10931.4},
                {"Date": "1/23/2018","Close": 10868.4},
                {"Date": "1/24/2018","Close": 11359.4},
                {"Date": "1/25/2018","Close": 11259.4},
                {"Date": "1/26/2018","Close": 11171.4},
                {"Date": "1/27/2018","Close": 11440.7},
                {"Date": "1/28/2018","Close": 11786.3},
                {"Date": "1/29/2018","Close": 11296.4},
                {"Date": "1/30/2018","Close": 10106.3},
                {"Date": "1/31/2018","Close": 10221.1},
                {"Date": "2/1/2018","Close": 9170.54},
                {"Date": "2/2/2018","Close": 8830.75},
                {"Date": "2/3/2018","Close": 9174.91},
                {"Date": "2/4/2018","Close": 8277.01},
                {"Date": "2/5/2018","Close": 6955.27},
                {"Date": "2/6/2018","Close": 7754},
                {"Date": "2/7/2018","Close": 7621.3},
                {"Date": "2/8/2018","Close": 8265.59},
                {"Date": "2/9/2018","Close": 8736.98},
                {"Date": "2/10/2018","Close": 8621.9},
                {"Date": "2/11/2018","Close": 8129.97}
            ],
            ethData: [
                {"Date": "1/1/2018","Close": 772.64},
                {"Date": "1/2/2018","Close": 884.44},
                {"Date": "1/3/2018","Close": 962.72},
                {"Date": "1/4/2018","Close": 980.92},
                {"Date": "1/5/2018","Close": 997.72},
                {"Date": "1/6/2018","Close": 1041.68},
                {"Date": "1/7/2018","Close": 1153.17},
                {"Date": "1/8/2018","Close": 1148.53},
                {"Date": "1/9/2018","Close": 1299.74},
                {"Date": "1/10/2018","Close": 1255.82},
                {"Date": "1/11/2018","Close": 1154.93},
                {"Date": "1/12/2018","Close": 1273.2},
                {"Date": "1/13/2018","Close": 1396.42},
                {"Date": "1/14/2018","Close": 1366.77},
                {"Date": "1/15/2018","Close": 1291.92},
                {"Date": "1/16/2018","Close": 1053.69},
                {"Date": "1/17/2018","Close": 1014.25},
                {"Date": "1/18/2018","Close": 1036.28},
                {"Date": "1/19/2018","Close": 1039.1},
                {"Date": "1/20/2018","Close": 1155.15},
                {"Date": "1/21/2018","Close": 1049.58},
                {"Date": "1/22/2018","Close": 1003.26},
                {"Date": "1/23/2018","Close": 986.23},
                {"Date": "1/24/2018","Close": 1058.78},
                {"Date": "1/25/2018","Close": 1056.03},
                {"Date": "1/26/2018","Close": 1055.17},
                {"Date": "1/27/2018","Close": 1107.07},
                {"Date": "1/28/2018","Close": 1246.01},
                {"Date": "1/29/2018","Close": 1182.36},
                {"Date": "1/30/2018","Close": 1071.13},
                {"Date": "1/31/2018","Close": 1118.31},
                {"Date": "2/1/2018","Close": 1036.79},
                {"Date": "2/2/2018","Close": 915.78},
                {"Date": "2/3/2018","Close": 964.02},
                {"Date": "2/4/2018","Close": 834.68},
                {"Date": "2/5/2018","Close": 697.95},
                {"Date": "2/6/2018","Close": 793.12},
                {"Date": "2/7/2018","Close": 757.07},
                {"Date": "2/8/2018","Close": 817.81},
                {"Date": "2/9/2018","Close": 883.87},
                {"Date": "2/10/2018","Close": 860.41},
                {"Date": "2/11/2018","Close": 814.66}
            ]
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
