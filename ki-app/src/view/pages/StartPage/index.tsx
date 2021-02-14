import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Title from '../../components/StartComponents/Title';
import Input from '../../components/StartComponents/Input';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';

type Props = {

};

export class StartPage extends React.Component<Props, State> implements Page {
    state = new State();
    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);
        this.changeSettings();
        const VDOM = (
            <div>
                <Title />
                <Input />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
    }

    /**
     * Prüft ob der Nutzer "Start" druckt und ändert den Zustand.
     */
    changeSettings() {
        PubSub.subscribe('settingsFinish', (data: {
            newDataSetName: string,
            usedSensorTypes: string[],
            waitTime: number,
            readTime: number,
        }) => {
            let a = this.state.recordingSettings;
            this.setState({ recordingSettings: data });
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
