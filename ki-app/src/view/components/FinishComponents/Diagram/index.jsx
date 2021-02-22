import { Component } from 'react';
import PubSub from 'pubsub-js';
import diagram from './index.module.css';

export default class Diagram extends Component {
    state = {
        sensorRow: [85124, 45157],
        datavalue: [
            [55, 26, 91, 22, 14],
            [66, 21, 83, 71, 8],
            [12, 2, 50, 23, 77],
            [83, 78, 51, 23, 13],
            [44, 55, 66, 81, 20],
            [1, 2, 3, 50, 5],
        ],
        time: [0, 1, 2, 3, 4],
        color: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)'],
        csscolor: ['2EBE57', 'CC00FF', 'EEAD0E', 'B22222', 'EE82EE', '000000',
            '6A5ACD', 'EE7600', '696969'],
        //grün,blau,gelb,rot,rosa,schwarz,lila,orange,grau
    };

    render() {
        PubSub.subscribe("startDiagram", (dataRows) => {

            //put each value Array in State
            for (var i = 0; i < dataRows.length; i++) {
                var datavalues = [];
                this.state.sensorRow.push(dataRows[i][0].sensorType);
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
        var lineLabels = [];
        for (var i = 0; i < this.state.sensorRow.length * 3; i++) {
            var coordinate = ".X";
            var sensor = this.state.sensorRow[parseInt(i / 3)];
            if (i % 3 == 1) {
                coordinate = ".Y";
            }
            if (i % 3 == 2) {
                coordinate = ".Z";
            }

            lineLabels.push(<font color={this.state.csscolor[i]}>■{this.state.sensorRow[parseInt(i / 3)] + coordinate}<br /></font>);

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