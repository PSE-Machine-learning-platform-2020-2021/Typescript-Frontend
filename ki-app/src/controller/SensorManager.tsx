import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";

export class SensorManager {
    private currentSensors: Sensor[] = []
    //private currentSensorIDs: number[] = [];
    private facade = MainController.getInstance().getFacade();
    private waitTime = 5;
    private readTime = 10;
    private startTime = 10
    private saving = true

    private dataPoints: {rowId: number, sensorType: number, value: number[]; relativeTime: number; }[] = []

    private readonly TO_SECOND = 1000;

    /**
    * Erzeugt eine neue Datenreihe und setzt diese damit als momentan benutzte Datenreihe. 
    * @param sensorTypes Die Angabe der zu benutzenden Sensoren. Die position im Array bestimmt die DataRow ID jedes Sensors.
    * @returns Gibt true für ein erfolgreiches Erstellen eines Dataensatzes zurück, gibt sonst false zurück.
    */
    setUpDataRead(sensorTypes: number[], dataSetName: string, waitTime: number, readTime: number, saving: boolean) {
        //this.currentSensorIDs = sensorTypes;
        this.waitTime = waitTime * this.TO_SECOND;
        this.readTime = readTime * this.TO_SECOND;
        this.startTime = readTime * this.TO_SECOND;
        this.saving = saving;
        for (let index = 0; index < sensorTypes.length; index++) {
            switch(sensorTypes[index]) {
                case 2:
                    let accSensor = new Accelerometer({frequency: 60})
                    this.currentSensors.push(accSensor)
                    accSensor.addEventListener('reading', e => {
                        this.getData(accSensor, index, sensorTypes[index])
                      })
                      accSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                      })
                    break;
                case 3:
                    let gyroSensor = new Gyroscope({frequency: 60})
                    this.currentSensors.push(gyroSensor)
                    gyroSensor.addEventListener('reading', e => {
                        this.getData(gyroSensor, index, sensorTypes[index])
                      })
                      gyroSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                      })
                    break;
                case 4:
                    let magSensor = new Magnetometer({frequency: 60})
                    this.currentSensors.push(magSensor)
                    magSensor.addEventListener('reading', e => {
                        this.getData(magSensor, index, sensorTypes[index])
                      })
                      magSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                      })
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
        let state: IState = page.getState();
        //Warte für waitTime und update dabei die Seite
        let intervalId1 = setInterval(() => {
            this.waitTime = this.waitTime - 1;
            state.recordingSettings!.waitTime = this.waitTime;
            state.currentState = States.SetWaitTime;
            page.setState(state);
            if (this.waitTime === 0) clearInterval(intervalId1);
        }, 1);

        for (let index = 0; index < this.currentSensors.length; index++) {
            this.currentSensors[index].start()
        }

        //Nimm Daten auf verteile sie an die Seite und das Modell. Erneuere dabei die aufnahmezeit auf der Seite
        let intervalId2 = setInterval(() => {
            this.readTime = this.readTime - 1;
                while(this.dataPoints.length > 0) {
                    let newDataPoint = this.dataPoints.shift()!
                    state.dataPoints!.push(newDataPoint)
                    MainController.getInstance().getFacade().sendDataPoint(newDataPoint.rowId, {value: newDataPoint.value, relativeTime: newDataPoint.relativeTime})
                    page.setState(state)
                }
        }, 1);

        for (let index = 0; index < this.currentSensors.length; index++) {
            this.currentSensors[index].stop()
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

    getData(sensor: Magnetometer | Gyroscope | Accelerometer, rowId: number, sensorType: number ) {
        this.dataPoints.push({ rowId , sensorType , value: [sensor.x!, sensor.y!, sensor.z!], relativeTime: this.startTime - this.readTime })
    }
}