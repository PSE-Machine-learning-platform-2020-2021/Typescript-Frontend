import { Component } from 'react';

/**
 * Das fertige Diagramm auf der Finishseite
 */
export default class Diagram extends Component {
    /**
     * der Datensatz für das Diagramm, durch props übermittelt
     */
    props = {
        dataRows: [{ sensorType: 1, datapoint: [{ value: [5], relativeTime: 5 }] }],
    };

    /**
     * der Datensatz in chart-js form, um die Linie zu zeigen
     */
    diagrammData = {
        lineLabels: [] as any[],
        sensorRow: [] as any[],
        datavalue: [] as any[],
        time: [] as any[],
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

    /**
     * aktualisiert das Diagramm mit dem gegebenen Datensatz. Inzwischen wird der Datensatz bearbeitet, damit er in chart-js form ist.
     */
    updateDiagramm() {
        //put each value Array in State
        this.diagrammData.lineLabels = [];
        this.diagrammData.sensorRow = [];
        this.diagrammData.datavalue = [];
        this.diagrammData.time = [];
        this.diagrammData.showDiagram = true;

        var datavalues = [];
        if (this.props.dataRows !== undefined) {
            for (var z = 0; z < this.props.dataRows.length; z++) {
                this.diagrammData.sensorRow.push(this.props.dataRows[z].sensorType);
                for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                    for (var j = 0; j < this.props.dataRows[z].datapoint.length; j++) {
                        datavalues.push(this.props.dataRows[z].datapoint[j].value[dataCoordinate]);
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
                var sensor = this.diagrammData.sensorRow[(i / 3) | 0];
                var sensorName = '';
                /**
                 * unterscheidet, welche Sensor es ist
                 */
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
                /**
                 * unterscheidet, von welchem Koordinate dieser Datenpunkt ist
                 */
                if (i % 3 === 1) {
                    coordinate = ".Y";
                }
                if (i % 3 === 2) {
                    coordinate = ".Z";
                }

                lineLabels.push(<span color={this.diagrammData.csscolor[i]}>■{sensorName + coordinate}<br /></span>);

                newDatasets.push(
                    {
                        label: sensorName + coordinate,
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

    /**
     * Rendert diese Diagram-Komponente
     * @returns Diagramm-Teil
     */
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