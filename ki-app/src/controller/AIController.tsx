import { Page } from "../view/pages/PageInterface";
import { StartPage } from "../view/pages/StartPage";
import { DataCollectionPage } from "../view/pages/DataCollectionPage/index";
import { FinishPage } from "../view/pages/FinishPage/index";
import { IState, States } from "../view/pages/State";
import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { MainController } from "./MainController";


/**
* Controller welcher für die Klassifizierung verantworlich ist.
*/
export class AIController implements PageController {
    /**
    * Für die Verwaltung der Sensoren verantwortlich
    */
    private sensorManager: SensorManager;
    /**
    * Seite welche gerade von dem Controller verwaltet wird
    */
    private page: Page = new StartPage( {} );
    /**
    * Status der Seite
    */
    private state: IState;
    /**
    * Die Attribute welche aus der URL genommen werden. Sollten aiID und Sensor Typen beinhalten
    */
    private urlParams: URLSearchParams;

    /**
    * Der Constructor des Controllers verarbeitet die URL bereitet den Sensormanager vor und setzt die startpage auf.
    */
    constructor () {
        const queryString = window.location.search;
        this.urlParams = new URLSearchParams( queryString );
        this.sensorManager = new SensorManager();
        this.page.attach( this );
        this.state = this.page.getState();
        //TODO Beim Registrieren des AIModelUsers sollte der Name weg oder eine Möglichkeit bestehen den Namen zu beziehen
        MainController.getInstance().getFacade().registerAIModelUser( "Gustav", +this.urlParams.get( "aiID" )! );
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update () {
        this.state = this.page.getState();
        switch ( this.state.currentState ) {
            case States.StartDataRead:
                this.start();
                break;
            case States.SetLanguage:
                this.page.setState( MainController.getInstance().setLanguage( this.state.languageCode ) );
                break;
            case States.NeedMessage:
                this.page.setState( MainController.getInstance().getMessage( this.state.messages ) );
                break;
            case States.StartDataRead:
                this.sensorManager.readData( this.page );
                this.changeToFinish();
                break;
            case States.ClassifyResult:
                this.classifyResult();
                break;
            default:
                break;
        }
    }

    /**
     * Holt sich alle wichtigen Daten für die Datenaufnahme aus der momentanen Seite. Darauf wird mit dem Sensormanager
     * die Datenaufnahme initialisiert. Zum Schluss wird der Seitenwechsel zur Erfassungseite durchgeführt. 
     */
    private start () {
        let sensorTypes: number[] = this.urlParams.get( "sensorTypes" )!.split( "," ).map( x => +x );
        let dataSetName: string = "Undefined";
        let waitTime = this.state.recordingSettings!.waitTime;
        let readTime = this.state.recordingSettings!.readTime;
        this.sensorManager.setUpDataRead( sensorTypes, dataSetName, waitTime, readTime, false );
        this.page = new DataCollectionPage( {} );
        this.page.attach( this );
        this.state = this.page.getState();
    }

    /**
     * Wechselt nach der Aufnahme des Datensatzes zur FinishPage.
     */
    //TODO Seite sollte für den AIModelUser noch angepasst werden. Hier wird ja nur Klassifiziert.
    changeToFinish () {
        this.page = new FinishPage( {} );
        this.page.attach( this );
        this.state = this.page.getState();
        this.state.dataRows! = MainController.getInstance().getFacade().getCurrentDataRows()!.dataRows!;
        this.page.setState( this.state );
    }

    /**
     * Klassifiziert den Datensatz.
     */
    classifyResult () {
        let id: number = MainController.getInstance().getFacade().getDataSetMetas()[ 0 ].dataSetID;
        MainController.getInstance().getFacade().classify( +this.urlParams.get( "aiID" )!, id, this.callback );
    }

    /**
     * Die Methode wird durch das Model aufgerufen falls ein Ergebnis der Klassifiziereung vorhanden ist.
     */
    public callback ( prediction: any, ) {
        this.state.aiUserData!.result = prediction;
        this.state.currentState = States.ClassifyResult;
        this.page.setState( this.state );
        let R: any;
        return R;
    }
}