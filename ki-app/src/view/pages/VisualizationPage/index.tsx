import React from 'react'
import './VisualizationPage.css'
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import FinishButton from '../../components/VisualizationComponents/FinishButton';
import DiagramList from '../../components/VisualizationComponents/DiagramList';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export class VisualizationPage implements Page {
    private state: State
    private observers: PageController[] = [];

    constructor() {
        this.state = new State()
        this.update()
    }

    update() {
        this.notify()
        const VDOM = (
            <div className="visualizationpage">

                <DiagramList
                    currentDataSet={this.state.currentDataSet!}
                //testDataSet={this.state.testDataSet!}
                />
                <FinishButton pageChangeToCreation={this.changetoCreation.bind(this)} />

                <NotificationContainer />
            </div>
        );
        if (document.getElementById('root') !== null) {
            ReactDOM.render(VDOM, document.getElementById('root'));
        }
    }


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

    changetoCreation() {
        this.state.currentState = States.ChangeToCreation
        this.notify()
    }
}
