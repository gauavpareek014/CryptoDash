import React from 'react';
import {
    VictoryChart, VictoryLine, VictoryZoomContainer,
    VictoryBrushContainer, VictoryAxis
} from "victory";

const dataset = [
    { "Date": "2/11/2018", "Close": 8129.97 },
    { "Date": "2/10/2018", "Close": 8621.9 },
    { "Date": "2/9/2018", "Close": 8736.98 },
    { "Date": "2/8/2018", "Close": 8265.59 },
    { "Date": "2/7/2018", "Close": 7621.3 },
    { "Date": "2/6/2018", "Close": 7754 },
    { "Date": "2/5/2018", "Close": 6955.27 },
    { "Date": "2/4/2018", "Close": 8277.01 },
    { "Date": "2/3/2018", "Close": 9174.91 },
    { "Date": "2/2/2018", "Close": 8830.75 },
    { "Date": "2/1/2018", "Close": 9170.54 },
    { "Date": "1/31/2018", "Close": 10221.1 },
    { "Date": "1/30/2018", "Close": 10106.3 },
    { "Date": "1/29/2018", "Close": 11296.4 },
    { "Date": "1/28/2018", "Close": 11786.3 },
    { "Date": "1/27/2018", "Close": 11440.7 },
    { "Date": "1/26/2018", "Close": 11171.4 },
    { "Date": "1/25/2018", "Close": 11259.4 },
    { "Date": "1/24/2018", "Close": 11359.4 },
    { "Date": "1/23/2018", "Close": 10868.4 },
    { "Date": "1/22/2018", "Close": 10931.4 },
    { "Date": "1/21/2018", "Close": 11600.1 },
    { "Date": "1/20/2018", "Close": 12899.2 },
    { "Date": "1/19/2018", "Close": 11607.4 },
    { "Date": "1/18/2018", "Close": 11474.9 },
    { "Date": "1/17/2018", "Close": 11188.6 },
    { "Date": "1/16/2018", "Close": 11490.5 },
    { "Date": "1/15/2018", "Close": 13819.8 },
    { "Date": "1/14/2018", "Close": 13772 },
    { "Date": "1/13/2018", "Close": 14360.2 },
    { "Date": "1/12/2018", "Close": 13980.6 },
    { "Date": "1/11/2018", "Close": 13405.8 },
    { "Date": "1/10/2018", "Close": 14973.3 },
    { "Date": "1/9/2018", "Close": 14595.4 },
    { "Date": "1/8/2018", "Close": 15170.1 },
    { "Date": "1/7/2018", "Close": 16477.6 },
    { "Date": "1/6/2018", "Close": 17527 },
    { "Date": "1/5/2018", "Close": 17429.5 },
    { "Date": "1/4/2018", "Close": 15599.2 },
    { "Date": "1/3/2018", "Close": 15201 },
    { "Date": "1/2/2018", "Close": 14982.1 },
    { "Date": "1/1/2018", "Close": 13657.2 }
];

export default class BTCHistViz extends React.Component {
    constructor() {
        super();
        this.state = {
            zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] },
            selectedDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
        };
    }

    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {
        return (
            <div>
                <VictoryChart width={600} height={470} scale={{ x: "time" }}
                              containerComponent={
                                  <VictoryZoomContainer
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
                        data={dataset}
                        x="Date"
                        y="Close"
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
                        tickFormat={(x) => new Date(x).getFullYear()}
                    />
                    <VictoryLine
                        style={{
                            data: { stroke: "tomato" }
                        }}
                        data={dataset}
                        x="Date"
                        y="Close"
                    />
                </VictoryChart>
            </div>
        );
    }
}