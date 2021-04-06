import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { ModelCreationPage } from "../view/pages/ModelCreationPage/index";

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
    constructor () {
        this.page = new ModelCreationPage();
        this.page.attach( this );
        this.state = this.page.getState();
        this.state.dataSetMetas! = MainController.getInstance().getFacade().getDataSetMetas();
        this.page.setState( this.state );
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update () {
        this.state = this.page.getState();
        switch ( this.state.currentState ) {
            case States.NeedKiTraining:
                this.startTraining();
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
    * Startet das Training mit den ausgewählten Einstellungen in der View. 
    * Holt sich aus den ausgewählten Datensätzen die benutzten Sensoren.
    */
    private startTraining () {
        /*
        // Auf Sensorenarten wird geprüft
        let sensors: number[] = [];
        for ( let index = 0; index < this.state.trainingParameter!.dataSets.length; index++ ) {
            //Jede Datenreihe wird durchgegangen
            let rows = MainController.getInstance().getFacade().getDataRows( this.state.trainingParameter!.dataSets[ index ] ).dataRows!;
            for ( let index2 = 0; index2 < rows.length; index2++ ) {
                for ( let index3 = 0; index3 < rows[ index2 ].length; index3++ ) {
                    if ( sensors.indexOf( rows[ index2 ][ index3 ].sensorType ) === -1 ) {
                        sensors.push( rows[ index2 ][ index3 ].sensorType );
                    }
                }
            }
        }
        //Benutzte Sensoren werden hinzugefügt
        this.state.trainingParameter!.sensors = sensors;*/
        //console.log(this.state.trainingParameter)
        MainController.getInstance().getFacade().applyModel( this.state.trainingParameter! );
    }
}