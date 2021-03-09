import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { wait } from "@testing-library/dom";

export class SensorManager {
    private currentSensors: Sensor[] = [];
    //private currentSensorIDs: number[] = [];
    private facade = MainController.getInstance().getFacade();
    private waitTime: number = 5;
    private readTime = 10;
    private startTime = 10;
    private saving = true;
    private sensorTypes: number[] = [];
    private dataPoints: { rowId: number, sensorType: number, value: number[]; relativeTime: number; }[] = [];

    private readonly TO_SECOND = 1000;

    /**
    * Erzeugt eine neue Datenreihe und setzt diese damit als momentan benutzte Datenreihe. 
    * @param sensorTypes Die Angabe der zu benutzenden Sensoren. Die position im Array bestimmt die DataRow ID jedes Sensors.
    * @returns Gibt true für ein erfolgreiches Erstellen eines Dataensatzes zurück, gibt sonst false zurück.
    */
    setUpDataRead(sensorTypes: number[], dataSetName: string, waitTime: number, readTime: number, saving: boolean) {
        //this.currentSensorIDs = sensorTypes;
        // this.waitTime = waitTime * this.TO_SECOND;
        //this.readTime = readTime * this.TO_SECOND;
        //this.startTime = readTime * this.TO_SECOND;
        this.waitTime = waitTime;
        this.readTime = readTime;
        this.saving = saving;
        this.sensorTypes = sensorTypes;
        for (let index = 0; index < sensorTypes.length; index++) {
            switch (sensorTypes[index]) {
                case 2:
                    let accSensor = new Accelerometer({ frequency: 60 });
                    this.currentSensors.push(accSensor);
                    accSensor.addEventListener('reading', e => {
                        this.getData(accSensor, index, sensorTypes[index]);
                    });
                    accSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                    });
                    break;
                case 3:
                    let gyroSensor = new Gyroscope({ frequency: 60 });
                    this.currentSensors.push(gyroSensor);
                    gyroSensor.addEventListener('reading', e => {
                        this.getData(gyroSensor, index, sensorTypes[index]);
                    });
                    gyroSensor.addEventListener('error', event => {
                        console.log(event.error.name, event.error.message);
                    });
                    break;
                case 4:
                    let magSensor = new Magnetometer({ frequency: 60 });
                    this.currentSensors.push(magSensor);
                    magSensor.addEventListener('reading', e => {
                        this.getData(magSensor, index, sensorTypes[index]);
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
        let state: IState = page.getState();
        PubSub.publish('usedsensors', this.sensorTypes);
        //Warte für waitTime und update dabei die Seite
        let intervalId1 = setInterval(() => {
            this.waitTime = this.waitTime - 1;
            //state.recordingSettings!.waitTime = this.waitTime;
            //state.currentState = States.SetWaitTime;
            page.setState(state);
            PubSub.publish('nextCount', this.waitTime);
            if (this.waitTime === 0) {
                clearInterval(intervalId1);
                this.startTime = new Date().getTime();
                for (let index = 0; index < this.currentSensors.length; index++) {
                    this.currentSensors[index].start();
                }
                //Nimm Daten auf verteile sie an die Seite und das Modell. Erneuere dabei die aufnahmezeit auf der Seite
                let intervalId2 = setInterval(() => {
                    this.readTime = this.readTime - 1;
                    while (this.dataPoints.length > 0) {
                        let newDataPoint = this.dataPoints.shift()!;
                        state.dataPoints!.push(newDataPoint);
                        MainController.getInstance().getFacade().sendDataPoint(newDataPoint.rowId, { value: newDataPoint.value, relativeTime: newDataPoint.relativeTime });
                        page.setState(state);
                    }
                    if (this.readTime === 0) {
                        clearInterval(intervalId2);
                        for (let index = 0; index < this.currentSensors.length; index++) {
                            this.currentSensors[index].stop();
                        }
                    }
                }, 1000);



            }
        }, 1000);
        /**
              if (this.waitTime === 0) {
                  console.log(this.currentSensors)
                  console.log(this.readTime)
                  for (let index = 0; index < this.currentSensors.length; index++) {
                      this.currentSensors[index].start();
                  }
                  console.log('xxx')
                  //Nimm Daten auf verteile sie an die Seite und das Modell. Erneuere dabei die aufnahmezeit auf der Seite
                  let intervalId2 = setInterval(() => {
                      console.log(this.currentSensors)
                      console.log(this.readTime)
                      console.log(this.dataPoints)
                      this.readTime = this.readTime - 1;
                      while (this.dataPoints.length > 0) {
                          let newDataPoint = this.dataPoints.shift()!;
                          state.dataPoints!.push(newDataPoint);
                          MainController.getInstance().getFacade().sendDataPoint(newDataPoint.rowId, { value: newDataPoint.value, relativeTime: newDataPoint.relativeTime });
                          page.setState(state);
                          console.log(this.readTime)
                          console.log(state.dataPoints)
                      }
                      if (this.readTime === 0) clearInterval(intervalId2);
                  }, 1000);
  
                  for (let index = 0; index < this.currentSensors.length; index++) {
                      this.currentSensors[index].stop();
                  }
              }
           */
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
    getData(sensor: Magnetometer | Gyroscope | Accelerometer, rowId: number, sensorType: number) {
        this.dataPoints.push({ rowId, sensorType, value: [sensor.x!, sensor.y!, sensor.z!], relativeTime: new Date().getTime() - this.startTime });
    }

    /**
    * Prüft welche Sensoren verfügbar sind.
    * @returns ein Array welches alle SensorTypeIDs enthält die verfügbar sind
    */
    async getAvailableSensors(): Promise<{ sensorTypID: number; sensorType: string; }[]> {
        let sensors: { sensorTypID: number; sensorType: string; }[] = [];


        // sensors.push({ sensorTypID: 2, sensorType: "Accelerometer" }); //Nur test
        // return sensors;//Nur test


        let accelerometer = new Accelerometer({ frequency: 60 });
        let accelerometerExist = this.test(accelerometer);
        let gyroscope = new Gyroscope({ frequency: 60 });
        let gyroscopeExist = this.test(gyroscope);
        /*let magnetometer = new Magnetometer();            Nicht definiert?
        let magnetometerExist = this.test(magnetometer);*/

        if (await accelerometerExist) {
            sensors.push({ sensorTypID: 2, sensorType: "Accelerometer" });
        }
        if (await gyroscopeExist) {
            sensors.push({ sensorTypID: 3, sensorType: "Gyroscope" });
        }

        /*if (await magnetometerExist) {
            sensors.push({ sensorTypID: 4, sensorType: "Magnetometer" });
        }*/
        return sensors;
    }

    private async test(sensor: Sensor): Promise<boolean> {
        var finish = false;
        sensor.addEventListener('reading', e => {
            finish = true;
            sensor.stop();
        });
        sensor.start();
        await this.wait(1000);
        sensor.stop();
        return finish;
    }
    private async wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}