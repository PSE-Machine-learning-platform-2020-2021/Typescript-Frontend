import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
export class AIController implements PageController {
    sensorManager: SensorManager;
    aiModel: object;
    dataSetId: number;
    sensorManager: SensorManager;
    setDataReadWaitingTime(waitingTime: number) {

    }

    startDataRead() {

    }

    callback(prediction: any) {

    }

    update() {

    }
}