import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { DataCollectionController } from "./DataCollectionController";
import { IState, States } from "../view/pages/State";
import { StartPage } from "../view/pages/StartPage/index";

export class StartController implements PageController {

    private urlParams: URLSearchParams;

    private page: Page;
    private sensorManager = new SensorManager();
    private state: IState;
    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor () {
        const queryString = window.location.search;
        this.urlParams = new URLSearchParams( queryString );
        let admin = this.urlParams.get( "Admin" )!;
        this.page = new StartPage( "Wilkommen! Sie erfassen für " + admin );
        this.state = this.page.getState();
        this.page.attach( this );
        MainController.getInstance().getFacade().registerDataminer( "Miner", +this.urlParams.get( "SessionID" )! );
        this.state.wait! = this.sensorManager.getAvailableSensors().then(
            ( availableSensor ) => {
                for ( let index = 0; index < availableSensor.length; index++ ) {
                    const sensorTypID: number = availableSensor[ index ].sensorTypID;
                    const sensorType: string = availableSensor[ index ].sensorType;
                    const chosen: boolean = false;
                    this.state.recordingSettings!.availableSensorTypes.push( { sensorTypID, sensorType, chosen } );

                }
                this.page.setState( this.state );
            } );
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update () {
        this.state = this.page.getState();
        switch ( this.state.currentState ) {
            case States.ChangeToDataCollection:
                this.start();
                break;
            case States.SetLanguage:
                MainController.getInstance().setLanguage( this.state.languageCode );
                break;
            case States.NeedMessage:
                this.state.messages = MainController.getInstance().getMessage( this.state.messages )!;
                this.state.currentState = States.waitForDB;
                this.page.setState( this.state );
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
        let sensorTypes: number[] = this.state.recordingSettings!.usedSensorTypes;
        let dataSetName: string = this.state.recordingSettings!.newDataSetName;
        let waitTime: number = this.state.recordingSettings!.waitTime;
        let readTime: number = this.state.recordingSettings!.readTime;
        this.sensorManager.setUpDataRead( sensorTypes, dataSetName, waitTime, readTime, true ); //Was ist wenn Datensatz nicht erstellt? also false zurück gegeben wird
        let dataCollectionController = new DataCollectionController( this.sensorManager );
        MainController.getInstance().changeTo( dataCollectionController );
    }


}