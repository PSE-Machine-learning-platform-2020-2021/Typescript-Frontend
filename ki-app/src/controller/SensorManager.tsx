import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
export class SensorManager {

    private currentSensors = [""];
    private facade = MainController.getInstance().getFacade();
    private waitTime = 5;
    private readTime = 10;

    /**
    * Erzeugt eine neue Datenreihe und setzt diese damit als momentan benutzte Datenreihe. 
    * @param sensorTypes Die Angabe der zu benutzenden Sensoren. Die position im Array bestimmt die DataRow ID jedes Sensors.
    * @returns Gibt true für ein erfolgreiches Erstellen eines Dataensatzes zurück, gibt sonst false zurück.
    */
    setUpDataRead(sensorTypes: string[], dataSetName: string, waitTime: number, readTime: number) {
        this.currentSensors = sensorTypes;
        this.waitTime = waitTime;
        this.readTime = readTime;
        return (this.facade.createDataSet(sensorTypes, dataSetName));
    }

    /**
    * Erfasst für den momentanene Datensatz Daten und sendet diese an die Explorer Datenbank.
    * @returns Gibt ein Array mit den aufgenommenen Daten zurück. Dabei enthält es jeweils Objekte mit Wert und relativer Zeit 
    * die jeder Sensor erfasst hat.
    */
    readData(page: Page) {
        let data = [];
        for (let index = 0; index < this.currentSensors.length; index++) {
            data.push(this.facade.readDataPoint(index));
        }
        for (let index = 0; index < this.currentSensors.length; index++) {
            this.facade.sendDataPoint(index, data[index]);
        }
        return data;
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