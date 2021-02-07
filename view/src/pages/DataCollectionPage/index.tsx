import React, { Component } from 'react';
import Title from '../../components/DataCollectionComponents/Title';
import Countdown from '../../components/DataCollectionComponents/Countdown';
import { Status } from "../DataCollectionPage/Status";
import { Page } from "../PageInterface";
import Observer from '../Observer';


export default class DataCollectionPage extends Component implements Page {

    state = { Observer: new Observer(), Status: Status.NeedDiagram, Diagram: Document };

    attach(observer: Observer) {
        this.setState(state => ({
            Observer: observer
        }));
    }

    detach() {
        this.setState(state => ({
            Observer: null
        }));
    }

    notify() {
        this.state.Observer.notify();
    }

    getStatus() {
        return this.state.Status;
    }

    setStatus(status: Status) {
        this.setState(state => ({
            Status: status
        }));
    }

    getDiagram() {
        return this.state.Diagram;
    }

    setDiagram(diagram: Document) {
        this.setState(state => ({
            Diagram: diagram
        }));
    }

    render() {
        return (
            <div>
                <Title />
                <Countdown />
            </div>
        );
    }
}
