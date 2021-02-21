import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Diagram extends Component {
    state = {
        sensorRow: [],
        datavalue: [],
        time: [],
        showDiagram: false,
        color: ['rgba(46,139,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)'],
    };

    render() {
        PubSub.subscribe("startDiagram", (dataRows) => {
            this.setState({
                sensorRow: [],
                datavalue: [],
                time: [],
                showDiagram: true
            });
            //put each value Array in State
            for (var i = 0; i < dataRows.length; i++) {
                var datavalues = [];
                for (var j = 0; j < dataRows[i].length; j++) {
                    datavalues.push(dataRows[i][j].value);
                }
                this.state.datavalue.push(datavalues);
            }

            //put time in State
            for (var j = 0; j < dataRows[0].length; j++) {
                this.state.time.push(dataRows[0][j].relativeTime);
            }
        });
        var newDatasets = [];
        for (var i = 0; i < this.state.sensorRow.length; i++) {
            newDatasets.push(
                {
                    label: this.state.sensorRow[i],
                    strokeColor: this.state.color[i],
                    borderWidth: 1,
                    data: this.state.datavalue[i],
                }
            );

        }
        const data = {
            labels: this.state.time,
            datasets: newDatasets
        };
        const options = {
            datasetFill: false,
            pointDotRadius: 2,
            pointHitDetectionRadius: 1,
            offsetGridLines: false,
        };
        PubSub.subscribe("giveLineLabels", (usedSensorNames) => {
            this.setState({ sensorRow: usedSensorNames });
        });
        const lineLabels = [];
        for (var i = 0; i < this.state.sensorRow.length; i++) {
            lineLabels.push(<font color={this.state.color[i]}>■{this.state.sensorRow[i]}<br /></font>);
        }

        var LineChart = require("react-chartjs").Line;

        return (
            <div>
                {lineLabels}
                <LineChart data={data} options={options} width="425" height="275" />
            </div>
        );
    }
}