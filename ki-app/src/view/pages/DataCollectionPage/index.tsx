import Title from '../../components/DataCollectionComponents/Title';
import Countdown from '../../components/DataCollectionComponents/Countdown';
import Diagram from '../../components/DataCollectionComponents/Diagram';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

/**
 * Darstellungsseite der Datenerfassungsseite
 */
export class DataCollectionPage implements Page {
    state: State;
    observers: PageController[] = [];

    /**
    * Konstruktor der Darstellungsseite.
    */
    constructor () {
        this.state = new State();
    }

    /**
    * Update Methode der Darstellungsseite. Diese Methode wird nach jeder Änderung, die kein Seitenwechsel ist, aufgerufen. 
    * Die Methode enthält den Aufbau der Seite und wird von ihr gerendert.
    * Es werden durch notify() alle controller über ein Update informiert und alle Seiten Elemente werden aktualisiert und erneut gerendert. 
    */
    private update () {
        this.notify();
        const VDOM = (
            <div>
                <Title />
                <Countdown countdownNumber={ this.state.recordingSettings?.waitTime! } chosenSensors={ this.state.recordingSettings?.usedSensorTypes! } />
                <Diagram dataRows={ this.state.dataRows! } pageChangeToFinish={ this.changeToFinish.bind( this ) } />
                <NotificationContainer />
            </div>
        );
        if ( document.getElementById( 'root' ) !== null ) {
            ReactDOM.render( VDOM, document.getElementById( 'root' ) );
        }
    }

    /**
     * Wechsel der Seite zur Fertigungsseite.
     */
    private changeToFinish () {
        this.state.currentState = States.ChangeToFinish;
        this.notify(); // Kein Update, da sonst die Seite neu rendert und der Seitenwechsel fehlschlägt
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
    setState ( state: any ) {
        this.state = state;
        this.update();
    }

    /**
     * Setzt einen neuen Zustand für die Seite und aktualisiert sie
     * @param state neuer Zustand für die Seite
     */
    getState () {
        return this.state;
    }
}