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
        this.state.dataSets! = MainController.getInstance().getFacade().getDataSetMetas()!;
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
        //MainController.getInstance().getFacade().applyModel(this.state.trainingParameter)
    }
}