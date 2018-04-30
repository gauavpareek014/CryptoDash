import React from 'react';
import {
    VictoryChart, VictoryLine, VictoryBrushContainer,
    VictoryAxis, VictoryTooltip, createContainer
} from "victory";
import axios from 'axios';
import * as histData from './bitcoin_data';

export default class BTCHistViz extends React.Component {
    constructor() {
        super();
        this.state = {
            InitialRowAdded: false,
            dataSet: this.importData()
        };
    }

    componentDidMount() {
        console.log(histData.default.length);
        this.updateCurrentPrice();
        this.timerID = setInterval(
            () => this.updateCurrentPrice(),
            60000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateCurrentPrice() {
        if (this.state.InitialRowAdded) {
            axios.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
                .then(res => {
                    let newArr = this.state.dataSet.slice();
                    newArr[this.state.dataSet.length - 1] = {"Date": this.getDateString(), "Close": res.data.USD};
                    this.setState({dataSet: newArr});
                });
        }
        else {
            axios.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
                .then(res => {
                    let newArr = this.state.dataSet.slice();
                    newArr.push({"Date": this.getDateString(), "Close": res.data.USD});
                    this.setState({
                        InitialRowAdded: true,
                        dataSet: newArr
                    });
                });
        }
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

    importData() {
        let data = [];
        for (x = 0; x < histData.default.length; x++) {
            data.push(histData[x])
        }
        return data;
    }

    render() {
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
        return (
            <div>
                <VictoryChart width={650} height={370} scale={{ x: "time" }}
                              containerComponent={
                                  <VictoryZoomVoronoiContainer
                                      zoomDimension="x"
                                      zoomDomain={this.state.zoomDomain}
                                      onZoomDomainChange={this.handleZoom.bind(this)}
                                      minimumZoom={{x: 1, y: 0.01}}
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