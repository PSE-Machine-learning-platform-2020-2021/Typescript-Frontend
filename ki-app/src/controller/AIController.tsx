import { Page } from "../view/pages/PageInterface";
import { StartPage } from "../view/pages/StartPage";
import { IState, States } from "../view/pages/State";


import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { MainController } from "./MainController";
import { RefferingController } from "./ReferringController";

export class AIController implements PageController {
    sensorManager: SensorManager;
    private page: Page = new StartPage({});
    private state: IState;
    private urlParams: URLSearchParams;

    constructor() {
        const queryString = window.location.search;
        this.urlParams = new URLSearchParams(queryString);
        this.sensorManager = new SensorManager();
        this.page.attach(this);
        this.state = this.page.getState();
        //MainController.getInstance().getFacade().registerAIModelUser(); //TODO
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        let currentState = this.page.getState().currentState;
        switch (currentState) {
            case States.StartDataRead:
                this.startDataRead();
                break;
            case States.ChangeToRefferring:
                MainController.getInstance().changeTo(new RefferingController());
                break;
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
                break;
            default:
                break;
        }
    }

    startDataRead() {
        let sensorTypes: number[] = this.urlParams.get("sensorTypes")!.split(",").map(x => +x);
        let dataSetName: string = "TODO";
        let waitTime = this.state.recordingSettings!.waitTime;
        let readTime = this.state.recordingSettings!.readTime;
        this.sensorManager.setUpDataRead(sensorTypes, dataSetName, waitTime, readTime);
        this.sensorManager.readData(this.page);
        //MainController.getInstance().getFacade().classify(this.urlParams.get("aiID"), sensorTypes, this.callback);
    }

    public callback(prediction: any) {
        this.state.aiUserData!.result = prediction;
        this.state.currentState = States.ClassifyResult;
        this.page.setState(this.state);
    }
}