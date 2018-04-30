import React from 'react';
import {
    VictoryChart, VictoryLine, VictoryBrushContainer,
    VictoryAxis, VictoryTooltip, createContainer
} from "victory";
import axios from "axios/index";
import * as histData from './ethereum_data';

export default class ETCHistViz extends React.Component {
    constructor() {
        super();
        this.state = {
            InitialRowAdded: false,
            dataSet: this.importData()
        };
    }

    importData() {
        let data = [];
        for (x = 0; x < histData.default.length; x++) {
            data.push(histData[x])
        }
        return data;
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
        console.log("Sam: ComponentWillDismount fired");
        clearInterval(this.timerID);
    }

    updateCurrentPrice() {
        console.log("Sam: UpdatePrice fired");
        console.log("Sam: "+this.state.dataSet);
        if (this.state.InitialRowAdded) {
            console.log('Sam: The value of InitialRowAdded is'+this.state.InitialRowAdded);
            axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
                .then(res => {
                    console.log("Sam: The Current price of ETH is $"+res.data.USD);
                    let newArr = this.state.dataSet.slice();
                    console.log("Sam: Updating row in place");
                    newArr[this.state.dataSet.length - 1] = {"Date": this.getDateString(), "Close": res.data.USD};
                    this.setState({dataSet: newArr});
                });
        }
        else {
            console.log('Sam: The value of InitialRowAdded is'+this.state.InitialRowAdded);
            axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
                .then(res => {
                    console.log("Sam: The Current price of ETH is $"+res.data.USD);
                    let newArr = this.state.dataSet.slice();
                    console.log('Sam: Adding a new row...');
                    newArr.push({"Date": this.getDateString(), "Close": res.data.USD});
                    console.log("Sam: "+ newArr);
                    console.log("Sam: setting new state...");
                    this.setState({
                        InitialRowAdded: true,
                        dataSet: newArr
                    });
                });
        }
        console.log("Sam: Update method finished");
        console.log("Sam: " + this.state.dataSet);
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
                <VictoryChart width={650} height={470} scale={{ x: "time" }}
                              containerComponent={
                                  <VictoryZoomVoronoiContainer
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
                        data={this.state.dataSet}
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
                    width={650} height={100} scale={{ x: "time" }}
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
                        data={this.state.dataSet}
                        x={(d) => new Date(d.Date)}
                        y="Close"
                    />
                </VictoryChart>
            </div>
        );
    }
}