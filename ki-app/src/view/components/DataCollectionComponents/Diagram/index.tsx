import { Component, CSSProperties } from 'react';

export default class Diagram extends Component {

    /**
     * der Datensatz für Linie-Diagramm und die Funktion für Seitewechsel, durch props übermittelt
     */
    props = {
        dataRows: [{ sensorType: 1, datapoint: [{ value: [5], relativeTime: 5 }] }],
        pageChangeToFinish: function () { }
    };

    /**
     * der Datensatz in chart-js form
     */
    state = {
        diagrammData: {
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
            csscolor: ['#2EBE57', '#CC00FF', '#EEAD0E', '#B22222', '#EE82EE', '#000000',
                '#6A5ACD', '#EE7600', '#696969'],
        }
    };

    /**
     * aktualisiert das Diagramm mit dem neuen Datensatz
     */
    updateDiagramm() {
        let diagrammData = this.state.diagrammData;
        diagrammData.lineLabels = [];
        diagrammData.sensorRow = [];
        diagrammData.datavalue = [];
        diagrammData.time = [];
        diagrammData.showDiagram = true;

        var datavalues = [];
        for (var z = 0; z < this.props.dataRows.length; z++) {
            this.state.diagrammData.sensorRow.push(this.props.dataRows[z].sensorType);
            for (var dataCoordinate = 0; dataCoordinate < 3; dataCoordinate++) {
                for (var j = 0; j < this.props.dataRows[z].datapoint.length; j++) {
                    datavalues.push(this.props.dataRows[z].datapoint[j].value[dataCoordinate]);
                }
                this.state.diagrammData.datavalue.push(datavalues);
                datavalues = [];
            }
        }
        for (var j = 0; j < this.props.dataRows[0].datapoint.length; j++) {
            this.state.diagrammData.time.push(this.props.dataRows[0].datapoint[j].relativeTime);
        }

        var newDatasets = [];
        var lineLabels = [];
        for (var i = 0; i < this.state.diagrammData.sensorRow.length * 3; i++) {
            var coordinate = ".X";
            var sensor = this.state.diagrammData.sensorRow[(i / 3) | 0];
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

            let color: CSSProperties = { "color": this.state.diagrammData.csscolor[i] };
            lineLabels.push(<span style={color}>■{sensorName + coordinate}<br /></span>);
            newDatasets.push(
                {
                    label: sensor + coordinate,
                    strokeColor: this.state.diagrammData.color[i],
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
            pointDot: false
        };
        diagrammData = this.state.diagrammData;
        diagrammData.diagramData = data;
        diagrammData.lineLabels = lineLabels;
        diagrammData.diagramOptions = options;
    }

    submit = () => {
        this.props.pageChangeToFinish();
    };

    /**
     * Rendert diese Diagram-Komponente
     * @returns Diagramm-Teil
     */
    render() {
        var LineChart = require("react-chartjs").Line;
        this.updateDiagramm();
        return (
            <div>
                {this.state.diagrammData.lineLabels}
                <LineChart data={this.state.diagrammData.diagramData} options={this.state.diagrammData.diagramOptions} width="400" height="200" redraw />
                <button type="button" onClick={this.submit}>ChangeToFinish</button>
            </div>
        );
    }
}