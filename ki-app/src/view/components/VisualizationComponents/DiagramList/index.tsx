import React, { Component } from 'react'
import "./DiagramList.css"
export default class DiagramList extends Component {
    props = {
        currentDataSets: [] as { dataSetID: number, rows: { sensorType: number, datapoint: { value: number[], relativeTime: number }[] }[] }[],
    }
    diagrammData = {
        lineLabels: [] as any[],
        sensorRow: [] as any[],
        datavalue: [] as any[],
        time: [] as any[],
        color: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)'],
        csscolor: ['2EBE57', 'CC00FF', 'EEAD0E', 'B22222', 'EE82EE', '000000',
            '6A5ACD', 'EE7600', '696969']
    };
    diagramList = [] as any[];
    state = {
        showDiagramIndex: 0,
        diagramList: [] as any[]
    };

    handleClick = (diagram: any, index: any) => {
        this.setState({ showDiagramIndex: index });
        // The following two console-log calls are just for parameter usage and have no actual meaning.
        console.log(diagram);
        console.log(index);

    };

    updateDiagramm(dataSet: { dataSetID: any; rows: any[]; }) {
        this.diagrammData.lineLabels = []
        this.diagrammData.sensorRow = []
        this.diagrammData.datavalue = []
        this.diagrammData.time = []

        var datavalues = [];
        for (var i = 0; i < dataSet.rows.length; i++) {
            this.diagrammData.sensorRow.push(dataSet.rows[i].sensorType);
            for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                for (var j = 0; j < dataSet.rows[i].datapoint.length; j++) {
                    datavalues.push(dataSet.rows[i].datapoint[j].value[dataCoordinate]);
                }
                this.diagrammData.datavalue.push(datavalues);
                datavalues = [];
            }
        }
        // eslint-disable-next-line
        for (var j = 0; j < dataSet.rows[0].datapoint.length; j++) {
            this.diagrammData.time.push(dataSet.rows[0].datapoint[j].relativeTime);
        }

        var newDatasets = [];
        var lineLabels = [];
        // eslint-disable-next-line
        for (var i = 0; i < this.diagrammData.sensorRow.length * 3; i++) {
            var coordinate = ".X";
            var sensor = this.diagrammData.sensorRow[(i / 3) | 0];
            var sensorName = ''
            switch (sensor) {
                case 2:
                    sensorName = 'Accelerometer'
                    break;
                case 3:
                    sensorName = 'Gyroscope'
                    break;
                case 4:
                    sensorName = 'Magnetometer'
                    break;
                default:
                    break;
            }
            // eslint-disable-next-line
            if (i % 3 == 1) {
                coordinate = ".Y";
            }
            // eslint-disable-next-line
            if (i % 3 == 2) {
                coordinate = ".Z";
            }

            lineLabels.push(<span color={this.diagrammData.csscolor[i]}>■{sensorName + coordinate}<br /></span>);
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
        const newList = this.diagramList
        const id = dataSet.dataSetID
        newList.push({ dataSetID: id, lineLabels: lineLabels, data: data, options: options })
        this.diagramList = newList

    }

    render() {
        var LineChart = require("react-chartjs").Line;
        // eslint-disable-next-line
        /*this.props.currentDataSets?.map((dataSet, index) => {
            var flag = false
            // eslint-disable-next-line
            this.diagramList.map((diagram) => {
                if (diagram.dataSetID === dataSet.dataSetID) {
                    flag = true
                    return diagram
                }
            })
            if (flag) { return dataSet }
            else { this.updateDiagramm(dataSet) }
        })*/
        return (
            <div>
                {this.diagramList.map((diagram, index) => {
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
                    );
                })
                }
                <div className="diagramList">
                    {this.diagramList.map((diagram, index) => {
                        return (
                            <div key={index}>
                                <h5>{diagram.dataSetID}</h5>
                                {diagram.lineLabels}
                                <LineChart data={diagram.data} options={diagram.options} width="200" height="100" onClick={() => this.handleClick(diagram, index)} />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
