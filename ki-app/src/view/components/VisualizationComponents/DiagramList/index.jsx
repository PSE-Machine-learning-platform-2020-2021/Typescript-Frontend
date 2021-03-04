import React, { Component } from 'react'
import PubSub from 'pubsub-js';
export default class DiagramList extends Component {
    state = {
        diagramList: [],
        lineLabels: [],
        dataSetID: -1000,
        sensorRow: [],
        datavalue: [],
        time: [],
        showDiagramIndex: 0,
        /**  sensorRow: [85124, 45157],
          datavalue: [
              [55, 26, 91, 22, 14],
              [66, 21, 83, 71, 8],
              [12, 2, 50, 23, 77],
              [83, 78, 51, 23, 13],
              [44, 55, 66, 81, 20],
              [1, 2, 3, 50, 5],
          ],
          time: [0, 1, 2, 3, 4],*/

        color: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)'],
        csscolor: ['2EBE57', 'CC00FF', 'EEAD0E', 'B22222', 'EE82EE', '000000',
            '6A5ACD', 'EE7600', '696969'],
        //grün,blau,gelb,rot,rosa,schwarz,lila,orange,grau
    };

    handleClick = (diagram, index) => {
        this.setState({ showDiagramIndex: index })
        //  PubSub.publish('getdiagram', diagram)
    }

    componentDidMount() {
        PubSub.unsubscribe('getrows')
        PubSub.subscribe("getrows", (_msg, dataSet) => {
            this.setState({
                lineLabels: [],
                dataSetID: -1000,
                sensorRow: [],
                datavalue: [],
                time: []
            })
            this.setState({ dataSetID: dataSet.dataSetID })

            //put each value Array in State
            var datavalues = [];
            for (var i = 0; i < dataSet.rows.length; i++) {
                this.state.sensorRow.push(dataSet.rows[i][0].sensorType);
                for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                    for (var j = 0; j < dataSet.rows[i].length; j++) {
                        datavalues.push(dataSet.rows[i][j].value[dataCoordinate]);
                    }
                    this.state.datavalue.push(datavalues);
                    datavalues = []
                }
            }

            for (var k = 0; k < dataSet.rows[0].length; k++) {
                this.state.time.push(dataSet.rows[0][k].relativeTime);
            }

            var newDatasets = [];
            var lineLabels = [];
            for (var m = 0; m < this.state.sensorRow.length * 3; m++) {
                var coordinate = ".X";
                var sensor = this.state.sensorRow[parseInt(m / 3)];
                if (m % 3 === 1) {
                    coordinate = ".Y";
                }
                if (m % 3 === 2) {
                    coordinate = ".Z";
                }

                lineLabels.push(<font color={this.state.csscolor[i]}>■{this.state.sensorRow[parseInt(m / 3)] + coordinate}<br /></font>);
                this.setState({ lineLabels: lineLabels })
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
            const { dataSetID } = this.state
            const newList = this.state.diagramList
            newList.push({ dataSetID, lineLabels, data, options })
            this.setState({ diagramList: newList })
        });

    }

    render() {
        var LineChart = require("react-chartjs").Line;
        const { diagramList } = this.state


        return (
            <div>
                {diagramList.map((diagram, index) => {
                    return (
                        <div key={index}>
                            {(this.state.showDiagramIndex === index) && (
                                <div className="showImage">
                                    <h5>{diagram.dataSetID}</h5>
                                    {diagram.lineLabels}
                                    <LineChart data={diagram.data} options={diagram.options} width="500" height="250" />
                                </div>)
                            }

                        </div>
                    )
                })
                }

                {diagramList.map((diagram, index) => {
                    return (
                        <div key={index}>
                            <h5>{diagram.dataSetID}</h5>
                            {diagram.lineLabels}
                            <LineChart data={diagram.data} options={diagram.options} width="200" height="100" onClick={() => this.handleClick(diagram, index)} />
                        </div>
                    )
                })
                }
            </div>
        );
    }
}
