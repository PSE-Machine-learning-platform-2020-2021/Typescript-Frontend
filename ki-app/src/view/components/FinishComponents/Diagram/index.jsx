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
        csscolor: ['2EBE57', 'CC00FF', 'EEAD0E', 'B22222', 'EE82EE', '000000',
            '6A5ACD', 'EE7600', '696969'],
        //grün,blau,gelb,rot,rosa,schwarz,lila,orange,grau,
        data: {},
        options: {},
        lineLabels: [],
    };

    componentDidMount() {
        PubSub.subscribe("startDiagram", (dataRows) => {

            //put each value Array in State
            var datavalues = [];
            for (var i = 0; i < dataRows.length; i++) {
                this.state.sensorRow.push(dataRows[i][0].sensorType);
                for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                    for (var j = 0; j < dataRows[i].length; j++) {
                        if (dataRows[i][j].value != undefined) {
                            datavalues.push(dataRows[i][j].value[dataCoordinate]);
                        }
                    }
                    this.state.datavalue.push(datavalues);
                    datavalues = [];
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
            var sensor = this.state.sensorRow[(i - (i % 3)) / 3];
            if (i % 3 == 1) {
                coordinate = ".Y";
            }
            if (i % 3 == 2) {
                coordinate = ".Z";
            }

            lineLabels.push(<label color={this.state.csscolor[i]}>■{this.state.sensorRow[(i - (i % 3)) / 3] + coordinate}<br /></label>);
            this.setState({ lineLabels: lineLabels });

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
        this.setState({ data: data });


        const options = {
            datasetFill: false,
            pointDotRadius: 2,
            pointHitDetectionRadius: 1,
            offsetGridLines: false,
            pointDot: false
        };
        this.setState({ options: options });
    }

    render() {
        var LineChart = require("react-chartjs").Line;
        const { data, options } = this.state;

        return (
            <div>
                <h2 className={diagram.title}>Fertig!</h2>
                {this.state.lineLabels}
                <LineChart data={data} options={options} width="425" height="275" />
            </div>
        );
    }
}