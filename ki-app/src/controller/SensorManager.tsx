import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";

export class SensorManager {

    private currentSensors: number[] = [];
    private facade = MainController.getInstance().getFacade();
    private waitTime = 5;
    private readTime = 10;
    private saving = true

    private readonly TO_SECOND = 1000;

    /**
    * Erzeugt eine neue Datenreihe und setzt diese damit als momentan benutzte Datenreihe. 
    * @param sensorTypes Die Angabe der zu benutzenden Sensoren. Die position im Array bestimmt die DataRow ID jedes Sensors.
    * @returns Gibt true für ein erfolgreiches Erstellen eines Dataensatzes zurück, gibt sonst false zurück.
    */
    setUpDataRead(sensorTypes: number[], dataSetName: string, waitTime: number, readTime: number, saving: boolean) {
        this.currentSensors = sensorTypes;
        this.waitTime = waitTime * this.TO_SECOND;
        this.readTime = readTime * this.TO_SECOND;
        this.saving = saving
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
            state.currentState = States.SetReadTime;
            page.setState(state);
            if (this.waitTime === 0) clearInterval(intervalId1);
        }, 1);

        //Nimm Daten auf verteile sie an die Seite und das Modell. Erneuere dabei die aufnahmezeit auf der Seite
        let intervalId2 = setInterval(() => {
            this.readTime = this.readTime - 1;
            let data: { dataPoint?: { value: number; relativeTime: number; }; }[] = [];
            for (let index = 0; index < this.currentSensors.length; index++) {
                data.push(this.facade.readDataPoint(index));
            }
            if(this.saving) {
                for (let index = 0; index < this.currentSensors.length; index++) {
                    this.facade.sendDataPoint(index, data[index].dataPoint!.value, data[index].dataPoint!.value);
                }
            }
            state.dataPoints! = data;
            state.recordingSettings!.readTime = this.readTime;
            state.currentState = States.SetWaitTime;
            page.setState(state);
            if (this.readTime === 0) clearInterval(intervalId2);
        }, 1);
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
}