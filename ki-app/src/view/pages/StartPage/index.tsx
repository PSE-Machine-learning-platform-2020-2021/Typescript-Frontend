import React, { Component } from 'react';
import Title from '../../components/StartComponents/Title';
import Input from '../../components/StartComponents/Input';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { MainController } from '../../../controller/MainController';
import ReactDOM from 'react-dom';

type Props = {
};

export class StartPage extends React.Component<Props, State> implements Page {

    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);
        const VDOM = (
            <div>
                <Title />
                <Input />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
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

    setState(state: State) {
        this.state = state;
        this.notify();
    }
}
