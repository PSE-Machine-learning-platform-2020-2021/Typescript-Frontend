import Chart from 'chart.js';
import React, { Component, CSSProperties } from 'react';
import "./DiagramList.css";


export default class DiagramList extends Component {
    private static readonly T_ACCELEROMETER_DE: string = "Beschleunigungssensor";
    private static readonly T_GYROSCOPE_DE: string = "Gyroskop";
    private static readonly T_MAGNETOMETER_DE: string = "Magnetometer";
    private diagrammData: {

        datavalue: number,
    }[] = [{
        datavalue: 0,
    }]

    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        currentDataSets: [] as { dataSetID: number, rows: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[]; }[],
        dataSetMetas: [] as { dataSetID: number, dataSetName: string; }[]
        //testDataSet: [] as { dataSetID: number, rows: { sensorType: number, datapoint: { value: number[], relativeTime: number }[] }[] }[],
    };

    /**
     * Status für diese Komponente
     */
    state = {
        showDiagramIndex: 0,
        diagramList: [] as any[],
        diagrammData: {
            lineLabels: [] as any[],
            sensorRow: [] as any[],
            datavalue: [] as any[],
            time: [] as any[],

        },
        color: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)'],
        csscolor: ['rgba(46,190,87,1)', 'rgba(68,24,232,1)', 'rgba(238,173,14,1)', 'rgba(178,34,34,1)', 'rgba(238, 130, 238,1)', 'rgba(0, 0, 0,1)',
            'rgba(106, 90, 205,1)', 'rgba(238, 118, 0,1)', 'rgba(105, 105, 105,1)']
        //csscolor: ['2EBE57', 'CC00FF', 'EEAD0E', 'B22222', 'EE82EE', '000000',
        //     '6A5ACD', 'EE7600', '696969']
    };

    /**
     * Nach Klicken auf Diagram das Zeigendiagram wechseln
     * @param diagram gewählte Diagram
     * @param index Diagramindex
     */
    handleClick = (diagram: any, index: any) => {
        this.setState({ showDiagramIndex: index });
        // The following two console-log calls are just for parameter usage and have no actual meaning.

    };

    /**
     * Diagram erstellen
     * @param dataSet Datensätze für Diagram
     */
    updateDiagramm(dataSet: { dataSetID: number; rows: any[]; }, index: number) {
        let diagrammData = this.state.diagrammData;
        diagrammData.sensorRow = [];
        diagrammData.datavalue = [];
        diagrammData.time = [];
        this.state.diagrammData = diagrammData;
        var datavalues = [];
        for (var i = 0; i < dataSet.rows.length; i++) {
            this.state.diagrammData.sensorRow.push(dataSet.rows[i].sensorType);
            for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                for (var j = 0; j < dataSet.rows[i].datapoint.length; j++) {
                    datavalues.push(dataSet.rows[i].datapoint[j].value[dataCoordinate]);
                }
                this.state.diagrammData.datavalue.push(datavalues);
                datavalues = [];
            }
        }
        // eslint-disable-next-line
        for (var j = 0; j < dataSet.rows[0].datapoint.length; j++) {
            this.state.diagrammData.time.push(dataSet.rows[0].datapoint[j].relativeTime);
        }

        var newDatasets = [];
        var lineLabels = [];
        // eslint-disable-next-line
        for (var i = 0; i < this.state.diagrammData.sensorRow.length * 3; i++) {
            var coordinate = ".X";
            var sensor = this.state.diagrammData.sensorRow[(i / 3) | 0];
            var sensorName = '';
            switch (sensor) {
                case 2:
                    sensorName = DiagramList.T_ACCELEROMETER_DE;
                    break;
                case 3:
                    sensorName = DiagramList.T_GYROSCOPE_DE;
                    break;
                case 4:
                    sensorName = DiagramList.T_MAGNETOMETER_DE;
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

            let color: CSSProperties = { "color": this.state.csscolor[i] };
            lineLabels.push(<span style={color}>■{sensorName + coordinate}<br /></span>);
            //this.setState({ lineLabels: lineLabels })
            newDatasets.push(
                {
                    label: sensor + coordinate,
                    strokeColor: this.state.color[i],
                    borderWidth: 1,
                    data: this.state.diagrammData.datavalue[i],
                }
            );
        }
        const data = {
            labels: this.state.diagrammData.time,
            datasets: newDatasets
        };
        const options = {
            datasetFill: false,
            pointDotRadius: 2,
            pointHitDetectionRadius: 1,
            offsetGridLines: false,
            pointDot: false,
        };
        const newList = this.state.diagramList;
        const id = dataSet.dataSetID;
        if(newList[index] !== undefined) {
        newList[index] = { dataSetID: id, lineLabels: lineLabels, data: data, options: options };
        } else {
            newList.push({ dataSetID: id, lineLabels: lineLabels, data: data, options: options })
        }
        this.state.diagramList = newList;
        this.diagrammData[index].datavalue = this.props.currentDataSets[index].rows[0].datapoint.length
    }

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {

        var LineChart = require("react-chartjs").Line;

        //jede Diagram nur einmal zeigen,und nur erneut mit neue Data
        // eslint-disable-next-line
        this.props.currentDataSets?.map((dataSet, index) => {
            var flag = false;
            // eslint-disable-next-line
            this.state.diagramList.map((diagram, index2) => {
                console.log(this.props.currentDataSets[index2].rows.length)
                if (diagram.dataSetID === dataSet.dataSetID) {
                    if (this.diagrammData[index2] !== undefined && this.diagrammData[index2].datavalue != this.props.currentDataSets[index2].rows[0].datapoint.length) {
                        this.updateDiagramm(dataSet, index2);
                        this.diagrammData[index2].datavalue = this.props.currentDataSets[index].rows[0].datapoint.length
                    }
                        flag = true;
                        return diagram;
                }
            });
            if (flag) { return dataSet; }
            else { 
                this.diagrammData.push({datavalue: 0})
                this.updateDiagramm(dataSet, index); 
            }
        });
        return (
            <div>
                    {this.state.diagramList.map((diagram, index) => {
                        let datasetname = "Null";
                        this.props.dataSetMetas.forEach(dataset => {
                            if (dataset.dataSetID === diagram.dataSetID) {
                                datasetname = dataset.dataSetName;
                            }
                        });
                        return (
                            <div key={index}>
                                <div className="diagramTop">
                                    <h5 className="datasetName">{datasetname}</h5>
                                    {diagram.lineLabels}
                                </div>
                                <div className="diagramList" id={index.toString()}>
                                    <LineChart data={diagram.data} options={diagram.options} width={document.documentElement.clientWidth} height={320} />
                                </div>
                            </div>
                        );
                    })}
                </div>
        );
    }
}
