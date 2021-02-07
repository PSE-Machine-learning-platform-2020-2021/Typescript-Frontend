import React, { Component } from 'react';
import Title from '../../components/StartComponents/Title';
import Input from '../../components/StartComponents/Input';
import { Status } from "../StartPage/Status";
import { Page } from "../PageInterface";
import Observer from '../Observer';

export default class StartPage extends Component implements Page {
    state = { Observer: new Observer(), Status: Status.NeedData, AvailableSensors: ['', '', '', ''], ChosenSensors: ['', '', '', ''] };

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

    getAvailableSensors() {
        return this.state.AvailableSensors;
    }

    setAvailableSensors(availableSensors: string[]) {
        this.setState(state => ({
            AvailableSensors: availableSensors
        }));
    }

    getChosenSensors() {
        return this.state.ChosenSensors;
    }

    setChosenSensors(chosenSensors: string[]) {
        this.setState(state => ({
            AvailableSensors: chosenSensors
        }));
    }


    render() {
        return (
            <div>
                <Title />
                <Input />
            </div>
        );
    }
}
