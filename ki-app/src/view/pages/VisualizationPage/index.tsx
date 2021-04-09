import React from 'react'
import './VisualizationPage.css'
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { IState, States } from '../State';
import FinishButton from '../../components/VisualizationComponents/FinishButton';
import DiagramList from '../../components/VisualizationComponents/DiagramList';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//Visualisierungsseite
export class VisualizationPage implements Page {
    private state: IState
    private observers: PageController[] = [];

    /**
    * Konstruktor der Visualisierungsseite.
    */
    constructor() {
        this.state = new State()
        this.update()
    }

    /**
    * Update Methode der Visualisierungsseite. Diese Methode wird nach jeder Änderung, die kein Seitenwechsel ist, aufgerufen. 
    * Die Methode enthält den Aufbau der Seite und wird von ihr gerendert.
    * Es werden durch notify() alle controller über ein Update informiert und alle Seiten Elemente werden aktualisiert und erneut gerendert. 
    */
    update(): void {
        this.notify()
        const VDOM = (
            <div className="visualizationpage">

                <DiagramList currentDataSets={this.state.currentDataSets!}
                //   testDataSet={this.state.testDataSet!}
                />
                <FinishButton pageChangeToCreation={this.changetoCreation.bind(this)} />

                <NotificationContainer />
            </div>
        );
        if (document.getElementById('root') !== null) {
            ReactDOM.render(VDOM, document.getElementById('root'));
        }
    }

    /**
    * Durch diese Methode kann sich ein Controller als Beobachter anmelden.
    * @param oberver neuer Beobachter
    */
    attach(observer: PageController): void {
        this.observers.push(observer);
    }

    /**
    * Durch diese Methode kann sich ein Controller als Beobachter abmelden.
    * @param oberver Beobachter der zu entfernen ist
    */
    detach(observer: PageController): void {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    /**
    * Durch diese Methode werden alle Beobachter über eine Änderung auf der Seite informiert.
    */
    notify(): void {
        for (const observer of this.observers) {
            observer.update();
        }
    }

    /**
    * Gibt den Status der Seite zurück
    */
    getState(): IState {
        return this.state;
    }

    /**
     * Setzt einen neuen Zustand für die Seite und aktualisiert sie
     * @param state neuer Zustand für die Seite
     */
    setState(state: IState): void {
        this.state = state;
        this.update()
    }

    /**
     * Wechsel der Seite zur Modellerstellungsseite.
     */
    private changetoCreation(): void {
        this.state.currentState = States.ChangeToCreation
        this.notify()
    }
}
