import { Component } from 'react';
import PubSub from 'pubsub-js';
import diagram from './index.module.css';

export default class Diagram extends Component {
    state = {
        sensorRow: [],
        datavalue: [],
        time: [],
        color: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)'],
        //grün,blau,gelb,rot,rosa,schwarz,lila,orange,grau
    };

    render() {
        PubSub.subscribe("startDiagram", (dataRows) => {
            this.setState({
                sensorRow: [],
                datavalue: [],
                time: [],
            });

            const lineLabels = [];
            for (var i = 0; i < this.state.sensorRow.length * 3; i++) {
                if (i % 3 == 0) {
                    lineLabels.push(<font color={this.state.color[i]}>■{this.state.sensorRow[i]}.X<br /></font>);
                }
                if (i % 3 == 1) {
                    lineLabels.push(<font color={this.state.color[i]}>■{this.state.sensorRow[i]}.Y<br /></font>);
                }
                if (i % 3 == 2) {
                    lineLabels.push(<font color={this.state.color[i]}>■{this.state.sensorRow[i]}.Z<br /></font>);
                }
            }

            //put each value Array in State
            for (var i = 0; i < dataRows.length; i++) {
                var datavalues = [];
                var x = 0;
                for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                    for (var j = 0; j < dataRows[i].length; j++) {
                        datavalues.push(dataRows[i][j].value[dataCoordinate]);
                    }
                    this.state.datavalue.push(datavalues);
                }
            }

            //put time in State
            for (var j = 0; j < dataRows[0].length; j++) {
                this.state.time.push(dataRows[0][j].relativeTime);
            }
        });
        var newDatasets = [];
        for (var i = 0; i < this.state.sensorRow.length * 3; i++) {
            newDatasets.push(
                {
                    label: "",
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
            pointDot: true
        };



        var LineChart = require("react-chartjs").Line;

        return (
            <div>
                <h2 className={diagram.title}>Fertig!</h2>
                {lineLabels}
                <LineChart data={data} options={options} width="425" height="275" />
            </div>
        );
    }
}