import { DataCollectionPage } from "../view/pages/DataCollectionPage/index";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { PageController } from "./PageController";
import { SensorManager } from "./SensorManager";
import { MainController } from "./MainController";
import { FinishController } from "./FinishController";

/**
* Controller der die Datenerfassungsseite verwaltet
*/
export class DataCollectionController implements PageController {
    /**
    * Für die Verwaltung der Sensoren verantwortlich
    */
    private sensorManager: SensorManager;
    /**
    * Seite welche gerade von dem Controller verwaltet wird
    */
    private page: Page = new DataCollectionPage();
    /**
    * Status der Seite
    */
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor ( sensorManager: SensorManager ) {
        this.sensorManager = sensorManager;
        this.page.attach( this );
        this.state = this.page.getState();
        this.state.leadTime = this.sensorManager.getWaitTime();

        this.sensorManager.readData( this.page );


    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update () {
        let state = this.page.getState();
        switch ( state.currentState ) {
            case States.StartDataRead:
                this.sensorManager.readData( this.page );
                break;
            case States.NeedMessage:
                this.state.messages = MainController.getInstance().getMessage( this.state.messages )!;
                this.state.currentState = States.waitForDB;
                this.page.setState( this.state );
                break;
            case States.NeedInstantDiagram:
                break;
            case States.ChangeToFinish:
                MainController.getInstance().changeTo( new FinishController() );
                break;
            case States.LoadError:
                if ( window.confirm( "Es wurden nicht alle Daten Erfolgreich gesendet. Stellen sie sicher das eine Internetverbindung besteht. Sollen die Daten erneut gesendet werden?" ) ) {
                    MainController.getInstance().getFacade().sendDataPointsAgain();
                }
                this.state.currentState = States.waitForDB;
                this.page.setState( state );
                break;
            //case States.SetWaitTime:
            //    PubSub.publish('nextCount', this.state.recordingSettings!.waitTime);
            //    break;
            default:
                break;
        }
    }
}