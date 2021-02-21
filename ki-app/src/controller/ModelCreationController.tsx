import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { ModelCreationPage } from "../view/pages/ModelCreationPage/index"

export class ModelCreationController implements PageController {

    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor() {
        this.page = new ModelCreationPage({});
        this.page.attach(this);
        this.state = this.page.getState()
        this.state.dataSetMetas! = MainController.getInstance().getFacade().getDataSetMetas()!;
    }

    update() {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.NeedKiTraining:
                this.startTraining()
                break;
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
                break;
            default:
                break;
        }
    }

    startTraining() {
        let sensors: number[] = []
        for (let index = 0; index < this.state.trainingParameter!.dataSets.length; index++) {
            let rows = MainController.getInstance().getFacade().getDataRows(this.state.trainingParameter!.dataSets[index]).dataRows!
            for (let index2 = 0; index2 < rows.length; index2++) {
                for (let index3 = 0; index3 < rows[index2].length; index3++) {
                    if (sensors.indexOf(rows[index2][index3].sensorType) === -1) {
                        sensors.push(rows[index2][index3].sensorType)
                    }
                }
            }
        }
        this.state.trainingParameter!.sensors = sensors
        MainController.getInstance().getFacade().applyModel(this.state.trainingParameter!)
    }
}