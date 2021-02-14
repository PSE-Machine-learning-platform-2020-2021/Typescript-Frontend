import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { DataCollectionController } from "./DataCollectionController";
import { IState, States } from "../view/pages/State";
import { StartPage } from "../view/pages/StartPage/index";

export class StartController implements PageController {

    private page: Page = new StartPage({});
    private sensorManager = new SensorManager();
    state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor() {
        this.state = this.page.getState();
        this.state.recordingSettings!.availableSensorTypes = MainController.getInstance().getFacade().getAvailableSensors();
        this.page.attach(this);

    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.StartDataRead:
                this.start();
                break;
            case States.SetLanguage:
                this.page.setState(MainController.getInstance().setLanguage(this.state.languageCode));
                break;
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
                break;
            default:
                break;
        }
    }

    /**
     * Holt sich alle wichtigen Daten für die Datenaufnahme aus der momentanen Seite. Darauf wird mit dem Sensormanager
     * die Datenaufnahme initialisiert. Zum Schluss wird der Seitenwechsel zur Erfassungseite durchgeführt. 
     */
    private start() {
        let sensorTypes: number[] = this.state.recordingSettings!.usedSensorTypes;
        let dataSetName: string = this.state.recordingSettings!.newDataSetName;
        let waitTime: number = this.state.recordingSettings!.waitTime;
        let readTime: number = this.state.recordingSettings!.readTime;
        this.sensorManager.setUpDataRead(sensorTypes, dataSetName, waitTime, readTime);
        let dataCollectionController = new DataCollectionController(this.sensorManager);
        MainController.getInstance().changeTo(dataCollectionController);
    }
}