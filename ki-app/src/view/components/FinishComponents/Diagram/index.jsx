import { Component } from 'react';
import PubSub from 'pubsub-js';
import diagram from './index.module.css';

export default class Diagram extends Component {
    state = {
        lineLabels: [],
        sensorRow: [],
        datavalue: [],
        time: [],
        showDiagram: false,
        diagramLineLabels: {},
        diagramData: {},
        diagramOptions: {},
        color: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)'],
        csscolor: ['2EBE57', 'CC00FF', 'EEAD0E', 'B22222', 'EE82EE', '000000',
            '6A5ACD', 'EE7600', '696969'],
    };

    componentDidMount() {//{ sensorType: number, datapoint:{value: number[], relativeTime: number; }[]}[]
        PubSub.subscribe("finishDiagram", (_msg, dataRows) => {
            this.setState({
                lineLabels: [],
                sensorRow: [],
                datavalue: [],
                time: [],
                showDiagram: true
            });
            //put each value Array in State
            var datavalues = [];
            for (var i = 0; i < dataRows.length; i++) {
                this.state.sensorRow.push(dataRows[i].sensorType);
                for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                    for (var j = 0; j < dataRows[i].datapoint.length; j++) {
                        datavalues.push(dataRows[i].datapoint[j].value[dataCoordinate]);
                    }
                    this.state.datavalue.push(datavalues);
                    datavalues = [];
                }
            }
            // eslint-disable-next-line
            for (var j = 0; j < dataRows[0].datapoint.length; j++) {
                this.state.time.push(dataRows[0].datapoint[j].relativeTime);
            }

            var newDatasets = [];
            var lineLabels = [];
            // eslint-disable-next-line
            for (var i = 0; i < this.state.sensorRow.length * 3; i++) {
                var coordinate = ".X";
                var sensor = this.state.sensorRow[parseInt(i / 3)];
                // eslint-disable-next-line
                if (i % 3 == 1) {
                    coordinate = ".Y";
                }
                // eslint-disable-next-line
                if (i % 3 == 2) {
                    coordinate = ".Z";
                }

                lineLabels.push(<font color={this.state.csscolor[i]}>■{this.state.sensorRow[parseInt(i / 3)] + coordinate}<br /></font>);
                //this.setState({ lineLabels: lineLabels })
                newDatasets.push(
                    {
                        label: sensor + coordinate,
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
                pointDot: false
            };
            this.setState({ lineLabels: lineLabels });
            //this.setState({ diagram: { lineLabels, data, options } })
            //this.setState({ diagramLineLabels: lineLabels })
            this.setState({ diagramData: data });
            this.setState({ diagramOptions: options });
        });

    }

    render() {
        var LineChart = require("react-chartjs").Line;
        const { lineLabels, diagramData, diagramOptions } = this.state;
        return (
            <div>
                {lineLabels}
                <LineChart data={diagramData} options={diagramOptions} width="400" height="200" redraw />
            </div>
        );
    }
}