import React from 'react';
import PubSub from 'pubsub-js';
import Title from '../../components/DataCollectionComponents/Title';
import Countdown from '../../components/DataCollectionComponents/Countdown';
import Diagram from '../../components/DataCollectionComponents/Diagram';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class DataCollectionPage implements Page {
    state = new State;
    observers: PageController[] = [];

    constructor() {
        this.state = new State()
    }

    update() {
        this.notify()
        const VDOM = (
            <div>
                <Title />
                <Countdown countdownNumber = {this.state.recordingSettings?.waitTime!} chosenSensors = {this.state.recordingSettings?.usedSensorTypes!}/>
                <Diagram dataRows = {this.state.dataRows!} pageChangeToFinish = {this.changeToFinish.bind(this)}/>
                <NotificationContainer/>
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
    }

    changeToFinish() {
            // eslint-disable-next-line
            this.state.currentState = States.ChangeToFinish;
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

    setState(state: any) {
        this.state = state
        this.update()
    }

    getState() {
        return this.state;
    }
}