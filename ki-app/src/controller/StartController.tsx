import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
class StartController implements PageController{
    sensorManager: SensorManager
    getSensors() {
        return Sensor[]
    }
    DataReadWaitingTime(waitingTime: number) {

    }
    labelDataSet(label: string) {

    }
    setLanguage() {

    }
    setDataReadTime(readTime: number) {

    }
    update(){

    }
}