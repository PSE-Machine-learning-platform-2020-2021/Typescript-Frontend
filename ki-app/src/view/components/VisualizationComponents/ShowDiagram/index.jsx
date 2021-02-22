import React, { Component } from 'react'
import PubSub from 'pubsub-js';
export default class ShowDiagram extends Component {
    state = {
        dataSetID: -1000,
        data: {},
        options: {}
    };
    componentDidMount() {
        PubSub.subscribe("getdiagram", (_msg, diagram) => {
            console.log(diagram)
            this.setState({ dataSetID: diagram.dataSetID })
            this.setState({ data: diagram.data })
            this.setState({ options: diagram.options })
        })
    }
    render() {

        var LineChart = require("react-chartjs").Line;

        return (
            <div>

                <h5>{this.state.dataSetID}</h5>

                <LineChart data={this.state.data} options={this.state.options} width="425" height="275" />
            </div>
        );
    }
}
