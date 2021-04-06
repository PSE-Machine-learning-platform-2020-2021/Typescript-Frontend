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


export class VisualizationPage implements Page {
    private state: IState
    private observers: PageController[] = [];

    constructor() {
        this.state = new State()
        this.update()
    }

    update(): void {
        this.notify()
        const VDOM = (
            <div className="visualizationpage">

                <DiagramList
                    currentDataSet = {this.state.currentDataSets!}
                //testDataSet={this.state.testDataSet!}
                />
                <FinishButton pageChangeToCreation = {this.changetoCreation.bind(this)} />

                <NotificationContainer />
            </div>
        );
        if (document.getElementById('root') !== null) {
            ReactDOM.render(VDOM, document.getElementById('root'));
        }
    }


    attach(observer: PageController): void {
        this.observers.push(observer);
    }

    detach(observer: PageController): void {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update();
        }
    }

    getState(): IState {
        return this.state;
    }

    setState(state: IState): void {
        this.state = state;
        this.update()
    }

    private changetoCreation(): void {
        this.state.currentState = States.ChangeToCreation
        this.notify()
    }
}
