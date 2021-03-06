import { Page } from "../view/pages/PageInterface";
import { StartPage } from "../view/pages/StartPage";
import { DataCollectionPage } from "../view/pages/DataCollectionPage/index";
import { IState, States } from "../view/pages/State";
import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { MainController } from "./MainController";
import { ResultPage } from "../view/pages/ResultPage/Result";


/**
* Controller welcher für die Klassifizierung verantworlich ist.
*/
export class AIController implements PageController {
    /**
     * Der Name des KI-Modell-Nutzers in der Datenbank. Wird auch verwendet, um ihn später zu identifizieren...
     */
    public static readonly AI_MODEL_USER_NAME: string = "KI-Modell-Anwender";
    private modelID: number;
    /**
    * Für die Verwaltung der Sensoren verantwortlich
    */
    private sensorManager: SensorManager;
    /**
    * Seite welche gerade von dem Controller verwaltet wird
    */
    private page: Page;
    /**
    * Status der Seite
    */
    private state: IState;
    /**
    * Die Attribute welche aus der URL genommen werden. Sollten aiID und Sensor Typen beinhalten
    */
    private urlParams: URLSearchParams;

    private dataSetID = 0;
    /**
    * Der Constructor des Controllers verarbeitet die URL bereitet den Sensormanager vor und setzt die startpage auf.
    */
    constructor(modelID: number) {
        const queryString = window.location.search;
        this.urlParams = new URLSearchParams(queryString);
        this.sensorManager = new SensorManager();
        this.page = new StartPage("Willkomen!");
        this.page.attach(this);
        this.state = this.page.getState();
        //TODO Beim Registrieren des AIModelUsers sollte der Name weg oder eine Möglichkeit bestehen den Namen zu beziehen
        MainController.getInstance().getFacade().registerDataminer(AIController.AI_MODEL_USER_NAME, -1);
        this.modelID = modelID;
        this.setUpSensorShown();
        this.page.setState(this.state);
        this.update();
    }

    private setUpSensorShown(): void {
        let sensorTypes: number[] = this.urlParams.get("sensorTypes")!.split(",").map(x => +x);
        let text: string = "Sie benötigen folgenede Sensoren: ";
        for (const element of sensorTypes) {
            switch (element) {
                case 2:
                    text += "Beschleunigungssensor ";
                    break;
                case 3:
                    text += "Gyroskop ";
                    break;
                default:
                    break;
            }
        }
        this.state.recordingSettings!.availableSensorTypes.push({ sensorTypID: -1, sensorType: text, chosen: true });
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update(): void {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.ChangeToDataCollection:
                this.start();
                break;
            case States.ChangeToFinish:
                this.changeToFinish();
                break;
            case States.ClassifyResult:
                this.classifyResult();
                break;
            case States.SetLanguage:
                this.page.setState(MainController.getInstance().setLanguage(this.state.languageCode));
                break;
            case States.NeedMessage:
                this.state.messages = MainController.getInstance().getMessage(this.state.messages)!;
                this.state.currentState = States.waitForDB;
                this.page.setState(this.state);
                break;
            default:
                break;
        }
    }

    /**
     * Holt sich alle wichtigen Daten für die Datenaufnahme aus der momentanen Seite. Darauf wird mit dem Sensormanager
     * die Datenaufnahme initialisiert. Zum Schluss wird der Seitenwechsel zur Erfassungseite durchgeführt. 
     */
    private async start(): Promise<void> {
        let sensorTypes: number[] = this.urlParams.get("sensorTypes")!.split(",").map(x => +x);
        let dataSetName: string = "Undefined";
        let waitTime = this.state.recordingSettings!.waitTime;
        let readTime = this.state.recordingSettings!.readTime;
        this.dataSetID = await this.sensorManager.setUpDataRead(sensorTypes, dataSetName, waitTime, readTime, false);
        this.page.detach(this);
        this.page = new DataCollectionPage();
        this.page.attach(this);
        this.state.leadTime = this.sensorManager.getWaitTime();
        this.state = this.page.getState();
        this.sensorManager.readData(this.page);
    }

    /**
     * Wechselt nach der Aufnahme des Datensatzes zur FinishPage.
     */
    //TODO Seite sollte für den AIModelUser noch angepasst werden. Hier wird ja nur Klassifiziert.
    private changeToFinish(): void {
        this.page.detach(this);
        this.page = new ResultPage();
        this.page.attach(this);
        this.state = this.page.getState();
        this.state.dataRows! = MainController.getInstance().getFacade().getCurrentDataRows().dataRows!;
        this.state.currentState = States.ClassifyResult;
        this.page.setState(this.state);
    }

    /**
     * Klassifiziert den Datensatz.
     */
    private classifyResult(): void {
        MainController.getInstance().getFacade().classify(+this.urlParams.get("modelID")!, this.dataSetID, this.callback.bind(this));
    }

    /**
     * Die Methode wird durch das Model aufgerufen falls ein Ergebnis der Klassifiziereung vorhanden ist.
     */
    public callback(prediction: any): any {
        if (prediction === undefined) {
            this.state.aiUserData!.result = "Fehler bei der Klassifizierung";

        } else {
            this.state.aiUserData!.result = prediction;
        }
        this.state.currentState = States.waitForDB;
        this.page.setState(this.state);
        const x: any = undefined;
        return x;
    }
}