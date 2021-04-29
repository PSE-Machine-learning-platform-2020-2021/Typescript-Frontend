import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { Facade } from "../model/Facade";
import { State } from "../view/pages/ModelCreationPage/State";
import { IDataPoint } from "../model/DataPoint";

export class SensorManager {
    private checkList: Promise<boolean>[] = [];
    private currentSensors: Sensor[] = [];
    private facade: Facade = MainController.getInstance().getFacade();
    private waitTime: number = 5;
    private readTime: number = 10;
    private startTime: number = 10;
    private page: Page | undefined = undefined;
    private sensorTypes: number[] = [];
    private dataPoints: { rowId: number, sensorType: number, value: number[]; relativeTime: number; }[] = [];
    private dataRows: { sensorType: number, datapoint: { value: number[]; relativeTime: number; }[]; }[] = [];
    private countPoints: number = 0;
    private static readonly SHOW_POINTS_COUNT: number = 60;
    private state?: IState;

    /**
    * Erzeugt eine neue Datenreihe und setzt diese damit als momentan benutzte Datenreihe. 
    * @param sensorTypes Die Angabe der zu benutzenden Sensoren. Die position im Array bestimmt die DataRow ID jedes Sensors.
    * @returns Gibt true für ein erfolgreiches Erstellen eines Dataensatzes zurück, gibt sonst false zurück.
    */
    setUpDataRead(sensorTypes: number[], dataSetName: string, waitTime: number, readTime: number, saving: boolean) {
        this.waitTime = waitTime;
        this.readTime = readTime;
        this.sensorTypes = sensorTypes;
        for (let index = 0; index < sensorTypes.length; index++) {
            switch (sensorTypes[index]) {
                case 2:
                    let accSensor = new Accelerometer({ frequency: 60 });
                    this.currentSensors.push(accSensor);
                    accSensor.addEventListener('reading', e => {
                        this.getData(accSensor, index, sensorTypes[index], sensorTypes.length);
                    });
                    accSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                    });
                    break;
                case 3:
                    let gyroSensor = new Gyroscope({ frequency: 60 });
                    this.currentSensors.push(gyroSensor);
                    gyroSensor.addEventListener('reading', e => {
                        this.getData(gyroSensor, index, sensorTypes[index], sensorTypes.length);
                    });
                    gyroSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                    });
                    break;
                case 4:
                    let magSensor = new Magnetometer({ frequency: 60 });
                    this.currentSensors.push(magSensor);
                    magSensor.addEventListener('reading', e => {
                        this.getData(magSensor, index, sensorTypes[index], sensorTypes.length);
                    });
                    magSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                    });
                    break;
                default:
                    break;
            }
        }
        return (this.facade.createDataSet(sensorTypes, dataSetName));
    }

    /**
    * Erfasst für den momentanene Datensatz Daten und sendet diese an die Explorer Datenbank.
    * Wartet zuerst für die angegebene Wartezeit und nimmt dann für die angegeben Lesezeit daten auf.
    */
    readData(page: Page) {
        this.page = page;
        this.state = page.getState();
        this.state!.recordingSettings!.usedSensorTypes = this.sensorTypes;
        this.state!.currentState = States.waitForDB;
        page.setState(this.state);
        //Warte für waitTime und update dabei die Seite
        let intervalId1 = setInterval(() => {
            this.waitTime = this.waitTime - 1;
            this.state!.recordingSettings!.waitTime = this.waitTime;
            page.setState(this.state);
            if (this.waitTime <= 0) {
                clearInterval(intervalId1);
                this.startTime = new Date().getTime();
                for (let index = 0; index < this.currentSensors.length; index++) {
                    this.currentSensors[index].start();
                }
                //Nimm Daten auf verteile sie an die Seite und das Modell. Erneuere dabei die aufnahmezeit auf der Seite
                let intervalId2 = setInterval(() => {
                    this.readTime = this.readTime - 1;
                    while (this.dataPoints.length > 0) {
                        let newDataPoint: IDataPoint[] = [];
                        let rowID: number = this.dataPoints[0].rowId;
                        for (let i = 0; i < this.dataPoints.length; i++) {
                            if (rowID === this.dataPoints[i].rowId) {
                                newDataPoint.push({ value: this.dataPoints.splice(i, 1)[0].value, relativeTime: this.dataPoints.splice(i, 1)[0].relativeTime });
                            }
                        }
                        this.checkList.push(MainController.getInstance().getFacade().sendDataPoint(rowID, newDataPoint));
                    }

                    if (this.readTime <= 0) {
                        clearInterval(intervalId2);
                        page.setState(this.state);
                        for (let index = 0; index < this.currentSensors.length; index++) {
                            this.currentSensors[index].stop();
                        }
                        console.log(this.countPoints);
                        this.checkForErrors(this.state!, page);
                    }
                }, 1000);
            }
        }, 1000);
    }

    private async checkForErrors(state: State, page: Page) {
        for (const element of this.checkList) {
            let errorWhenSend = !(await element);
            if (errorWhenSend) {
                state.currentState = States.LoadError;
            }
        }
        page.setState(state);
    }

    private async saveDatapointinRow(dataPoint: { rowId: number, sensorType: number, value: number[]; relativeTime: number; }, show: boolean) {
        while (this.dataRows.length - 1 < dataPoint.rowId) {
            this.dataRows.push({ sensorType: -1, datapoint: [] });
        }
        this.dataRows[dataPoint.rowId].sensorType = dataPoint.sensorType;
        this.dataRows[dataPoint.rowId].datapoint.push({ value: dataPoint.value, relativeTime: dataPoint.relativeTime });

        if (this.page !== undefined && show) {
            this.state = this.page.getState();
            this.state!.dataRows = this.dataRows;
            this.page.setState(this.state);
        }
    }

    /**
     * @returns Gibt als Zahl die Zeit in Sekunden zurück, für welche vor der Aufnahme gewartet wird. 
     */
    getWaitTime() {
        return this.waitTime;
    }

    /**
     * @returns Gibt als Zahl die Zeit in Sekunden zurück, für welche die Aufnahme läuft. 
     */
    getReadTime() {
        return this.readTime;
    }

    /**
    * Holt die Sensordaten für einen Sensor
    * @param sensor der Sensor von dem die Daten gelsen werden
    * @param sensorType Die ID des Sensortypes
    */
    private async getData(sensor: Magnetometer | Gyroscope | Accelerometer, rowId: number, sensorType: number, sensorCount: number) {
        if (sensor.x === undefined || sensor.y === undefined || sensor.z === undefined) {
            return;
        }
        const point = { rowId, sensorType, value: [sensor.x!, sensor.y!, sensor.z!], relativeTime: (new Date().getTime() - this.startTime) / 1000 };
        this.dataPoints!.push(point);

        this.countPoints++;
        this.saveDatapointinRow(point, (this.countPoints % SensorManager.SHOW_POINTS_COUNT) === 0);
    }

    /**
    * Prüft welche Sensoren verfügbar sind.
    * @returns ein Array welches alle SensorTypeIDs enthält die verfügbar sind
    */
    async getAvailableSensors(): Promise<{ sensorTypID: number; sensorType: string; }[]> {
        let sensors: { sensorTypID: number; sensorType: string; }[] = [];
        let accelerometer = new Accelerometer({ frequency: 60 });
        let accelerometerExist = this.existSensor(accelerometer);
        let gyroscope = new Gyroscope({ frequency: 60 });
        let gyroscopeExist = this.existSensor(gyroscope);

        if (await accelerometerExist) {
            sensors.push({ sensorTypID: 2, sensorType: "Accelerometer" });
        }
        if (await gyroscopeExist) {
            sensors.push({ sensorTypID: 3, sensorType: "Gyroscope" });
        }
        return sensors;
    };

    private async existSensor(sensor: Sensor): Promise<boolean> {
        var finish = false;
        sensor.addEventListener('reading', e => {
            finish = true;
            sensor.stop();
        });
        sensor.start();
        await this.wait(1000);
        sensor.stop();
        return finish;
    };
    private async wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}