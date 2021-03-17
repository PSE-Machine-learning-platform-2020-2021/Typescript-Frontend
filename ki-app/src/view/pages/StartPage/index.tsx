import Title from '../../components/StartComponents/Title';
import Input from '../../components/StartComponents/Input';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class StartPage implements Page {
    state: State
    observers: PageController[] = [];

    constructor(admin: string) {
        this.state = new State()
        this.update()
        NotificationManager.success(admin)
    }

    update() {
        this.notify()
        const VDOM = (
            <div>
                <Title />
                <Input availableSensorTypes = {this.state.recordingSettings.availableSensorTypes} pageChangeSettings = {this.changeSettings.bind(this)}/>
                <NotificationContainer/>
            </div>
            
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
    }

     /**
     * Prüft ob der Nutzer "Start" druckt und ändert den Zustand.
     */
      changeSettings(recordingSettings: {
        newDataSetName: string, 
        usedSensorTypes: number[], 
        waitTime: number, 
        readTime: number, 
        availableSensorTypes: { sensorTypID: number, sensorType: string, chosen: boolean; }[] 
    }) {
        this.state.recordingSettings = recordingSettings;
        this.state.currentState = States.ChangeToDataCollection;
        this.notify();
    }

    /**
     * Die Methoden für Beobachtermuster
     * @param observer Beobachter,nähmlich Controller
     */
     attach(observer: PageController) {
        this.observers.push(observer);
    }

    detach(observer: PageController) {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify() {
        for (let index = 0; index < this.observers.length; index++) {
            const element = this.observers[index];
            element.update();
        }
    }

    getState() {
        return this.state;
    }

    setState(state: any) {
        this.state = state
        this.update()
    }
}
