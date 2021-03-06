import { Component, CSSProperties } from 'react';
import './diagram.css';

export default class Diagram extends Component {
    private static readonly T_ACCELEROMETER_DE: string = "Beschleunigungssensor";
    private static readonly T_GYROSCOPE_DE: string = "Gyroskop";
    private static readonly T_MAGNETOMETER_DE: string = "Magnetometer";
    private static readonly T_BUTTON_NEXT_DE: string = "Zur Abschlussseite";

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
                    sensorName = Diagram.T_ACCELEROMETER_DE;
                    break;
                case 3:
                    sensorName = Diagram.T_GYROSCOPE_DE;
                    break;
                case 4:
                    sensorName = Diagram.T_MAGNETOMETER_DE;
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
            pointDot: false,
            title: {
                display: true,
                text: 'Chart.js bar Chart'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value: number) { if (Number.isInteger(value)) { return value; } },
                        stepSize: 1
                    }
                }]
            }
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
        let dd = this.state.diagrammData;
        return (
            <div>
                <div>
                    <div className="view-section">
                        <div className="view-section">
                            <span>
                                {dd.lineLabels}
                            </span>
                        </div>
                        <div className="view-section">
                            <LineChart data={dd.diagramData} options={dd.diagramOptions} width={document.documentElement.clientWidth} height={200} redraw />
                        </div>
                    </div>
                    <div id='divWithSpace'></div>
                </div>
                <div className="view-section">
                    <button className='specialButton' type="button" onClick={this.submit}>{Diagram.T_BUTTON_NEXT_DE}</button>
                </div>
            </div>
        );
    }
}