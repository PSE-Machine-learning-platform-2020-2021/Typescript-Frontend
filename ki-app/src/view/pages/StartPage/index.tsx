import Title from '../../components/StartComponents/Title';
import Input from '../../components/StartComponents/Input';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


/**
 * Die Darstellungsseite für die Startseite der Datenerfasser
 */
export class StartPage implements Page {
    state: State;
    observers: PageController[] = [];

    /**
     * Konstruktor der Darstellungseite
     * @param admin Name der Person für den aufgenommen wird
     */
    constructor ( admin: string ) {
        this.state = new State();
        this.update();
        NotificationManager.success( admin );
    }

    /**
    * Update Methode der Darstellungsseite. Diese Methode wird nach jeder Änderung, die kein Seitenwechsel ist, aufgerufen. 
    * Die Methode enthält den Aufbau der Seite und wird von ihr gerendert.
    * Es werden durch notify() alle controller über ein Update informiert und alle Seiten Elemente werden aktualisiert und erneut gerendert. 
    */
    update () {
        this.notify();
        const VDOM = (
            <div>
                <Title />
                <Input availableSensorTypes={ this.state.recordingSettings.availableSensorTypes } pageChangeSettings={ this.changeSettings.bind( this ) } />
                <NotificationContainer />
            </div>

        );
        ReactDOM.render( VDOM, document.getElementById( 'root' ) );
    }

    /**
    * Prüft ob der Nutzer "Start" druckt und ändert den Zustand.
    */
    changeSettings ( recordingSettings: {
        newDataSetName: string,
        usedSensorTypes: number[],
        waitTime: number,
        readTime: number,
        availableSensorTypes: { sensorTypID: number, sensorType: string, chosen: boolean; }[];
    } ) {
        this.state.recordingSettings = recordingSettings;
        this.state.currentState = States.ChangeToDataCollection;
        this.notify();
    }

    /**
    * Durch diese Methode kann sich ein Controller als Beobachter anmelden.
    * @param oberver neuer Beobachter
    */
    attach ( observer: PageController ) {
        this.observers.push( observer );
    }

    /**
    * Durch diese Methode kann sich ein Controller als Beobachter abmelden.
    * @param oberver Beobachter der zu entfernen ist
    */
    detach ( observer: PageController ) {
        const index = this.observers.indexOf( observer, 0 );
        if ( index > -1 ) {
            this.observers.splice( index, 1 );
        }
    }

    /**
    * Durch diese Methode werden alle Beobachter über eine Änderung auf der Seite informiert.
    */
    notify () {
        for ( let index = 0; index < this.observers.length; index++ ) {
            const element = this.observers[ index ];
            element.update();
        }
    }

    /**
    * Gibt den Status der Seite zurück
    */
    getState () {
        return this.state;
    }

    /**
     * Setzt einen neuen Zustand für die Seite und aktualisiert sie
     * @param state neuer Zustand für die Seite
     */
    setState ( state: any ) {
        this.state = state;
        this.update();
    }
}
