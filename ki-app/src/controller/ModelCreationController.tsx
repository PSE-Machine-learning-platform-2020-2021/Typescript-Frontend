import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { ModelCreationPage } from "../view/pages/ModelCreationPage/index";
import { RefferingController } from './ReferringController';
/**
* Controller welcher die Modellerstellung behandelt
*/
export class ModelCreationController implements PageController {
    /**
    * Seite welche gerade von dem Controller verwaltet wird
    */
    private page: Page;
    /**
    * Status der Seite
    */
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor() {
        this.page = new ModelCreationPage();
        this.page.attach(this);
        this.state = this.page.getState();
        this.state.dataSetMetas! = MainController.getInstance().getFacade().getDataSetMetas();
        this.page.setState(this.state);
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update(): void {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.NeedKiTraining:
                this.startTraining();
                break;
            case States.NeedMessage:
                this.state.messages = MainController.getInstance().getMessage(this.state.messages)!;
                this.state.currentState = States.waitForDB;
                this.page.setState(this.state);
                break;
            case States.ChangeToRefferring:
                MainController.getInstance().changeTo(new RefferingController(true));
                break;
            default:
                break;
        }
    }

    /**
    * Startet das Training mit den ausgewählten Einstellungen in der View. 
    * Holt sich aus den ausgewählten Datensätzen die benutzten Sensoren.
    */
    private startTraining(): void {
        const params = this.state.trainingParameter!;
        if (params.slidingWindowStep === undefined && params.slidingWindowSize === undefined && params.trainingDataPercentage === undefined) {
            MainController.getInstance().getFacade().applyModel(params.dataSets, params.imputator, params.classifier, params.scaler, params.features);
        }
        else if (params.slidingWindowStep === undefined && params.slidingWindowSize === undefined) {
            MainController.getInstance().getFacade().applyModel(params.dataSets, params.imputator, params.classifier, params.scaler, params.features, params.trainingDataPercentage);
        }
        else if (params.slidingWindowStep === undefined) {
            MainController.getInstance().getFacade().applyModel(params.dataSets, params.imputator, params.classifier, params.scaler, params.features, params.trainingDataPercentage, params.slidingWindowSize);
        }
        else {
            MainController.getInstance().getFacade().applyModel(params.dataSets, params.imputator, params.classifier, params.scaler, params.features, params.trainingDataPercentage, params.slidingWindowSize, params.slidingWindowStep);
        }
    }
}