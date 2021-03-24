import { Component } from 'react';
import PubSub from 'pubsub-js';
import diagram from './index.module.css';

export default class Diagram extends Component {
    props = {
        dataRows: [{ sensorType: 1, datapoint: [{ value: [5], relativeTime: 5 }] }],
    };

    diagrammData = {
        lineLabels: [],
        sensorRow: [],
        datavalue: [],
        time: [],
        showDiagram: false,
        diagram: {},
        diagramLineLabels: {},
        diagramData: {},
        diagramOptions: {},
        color: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)'],
        csscolor: ['2EBE57', 'CC00FF', 'EEAD0E', 'B22222', 'EE82EE', '000000',
            '6A5ACD', 'EE7600', '696969'],
    };

    updateDiagramm() {
        //put each value Array in State
        this.diagrammData.lineLabels = [];
        this.diagrammData.sensorRow = [];
        this.diagrammData.datavalue = [];
        this.diagrammData.time = [];
        this.diagrammData.showDiagram = true;

        var datavalues = [];
        if (this.props.dataRows != undefined) {
            for (var i = 0; i < this.props.dataRows.length; i++) {
                this.diagrammData.sensorRow.push(this.props.dataRows[i].sensorType);
                for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                    for (var j = 0; j < this.props.dataRows[i].datapoint.length; j++) {
                        datavalues.push(this.props.dataRows[i].datapoint[j].value[dataCoordinate]);
                    }
                    this.diagrammData.datavalue.push(datavalues);
                    datavalues = [];
                }
            }
            // eslint-disable-next-line
            for (var j = 0; j < this.props.dataRows[0].datapoint.length; j++) {
                this.diagrammData.time.push(this.props.dataRows[0].datapoint[j].relativeTime);
            }

            var newDatasets = [];
            var lineLabels = [];
            for (var i = 0; i < this.diagrammData.sensorRow.length * 3; i++) {
                var coordinate = ".X";
                var sensor = this.diagrammData.sensorRow[parseInt(i / 3)];
                var sensorName = '';
                switch (sensor) {
                    case 2:
                        sensorName = 'Accelerometer';
                        break;
                    case 3:
                        sensorName = 'Gyroscope';
                        break;
                    case 4:
                        sensorName = 'Magnetometer';
                        break;
                }
                if (i % 3 == 1) {
                    coordinate = ".Y";
                }
                if (i % 3 == 2) {
                    coordinate = ".Z";
                }

                lineLabels.push(<font color={this.diagrammData.csscolor[i]}>■{sensorName + coordinate}<br /></font>);
                //this.setState({ lineLabels: lineLabels })
                newDatasets.push(
                    {
                        label: sensor + coordinate,
                        strokeColor: this.diagrammData.color[i],
                        borderWidth: 1,
                        data: this.diagrammData.datavalue[i],
                    }
                );
            }
            const data = {
                labels: this.diagrammData.time,
                datasets: newDatasets
            };
            const options = {
                datasetFill: false,
                pointDotRadius: 2,
                pointHitDetectionRadius: 1,
                offsetGridLines: false,
                pointDot: false
            };
            this.diagrammData.diagramData = data;
            this.diagrammData.lineLabels = lineLabels;
            this.diagrammData.diagramOptions = options;
        }
    }

    render() {
        var LineChart = require("react-chartjs").Line;
        this.updateDiagramm();
        return (
            <div>
                {this.diagrammData.lineLabels}
                <LineChart data={this.diagrammData.diagramData} options={this.diagrammData.diagramOptions} width="400" height="200" redraw />
            </div>
        );
    }
}