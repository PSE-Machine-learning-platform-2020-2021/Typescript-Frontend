import { read } from "fs";
import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
export class StartController implements PageController{
    
    private sensorManager = new SensorManager();
    private waitingTime = 5 
    private readTime = 10

    //getSensors() {
    //    return Sensor[];
    //}

    DataReadWaitingTime(waitingTime: number) {
        this.waitingTime = waitingTime;
    }

    labelDataSet(label: string) {

    }

    setLanguage() {
        
    }

    setDataReadTime(readTime: number) {
        this.readTime = readTime
    }

    update(){

    }
}