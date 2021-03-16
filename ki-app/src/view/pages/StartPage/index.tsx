import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Title from '../../components/StartComponents/Title';
import Input from '../../components/StartComponents/Input';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';

interface Props  {

};

export class StartPage extends React.Component<Props, State> implements Page {
    state = new State();
    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);
        const VDOM = (
            <div>
                <Title />
                <Input testString = {this.state.languageCode}/>
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
        this.changeSettings();
    }

    /**
     * Prüft ob der Nutzer "Start" druckt und ändert den Zustand.
     */
    changeSettings() {
        PubSub.subscribe('settingsFinish', (_msg: any, data: {
            newDataSetName: string,
            usedSensorTypes: number[],
            waitTime: number,
            readTime: number,
            availableSensorTypes: { sensorTypID: number, sensorType: string, chosen: boolean; }[];
        }) => {
            this.state.recordingSettings = data;
            this.state.currentState = States.ChangeToDataCollection;
            this.notify();
        });
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
}
