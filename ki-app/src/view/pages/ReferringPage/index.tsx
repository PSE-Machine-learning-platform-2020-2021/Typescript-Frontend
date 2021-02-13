import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import ConstantsText from '../../components/ReferringComponents/ConstantsText';
import NewProjectButton from '../../components/ReferringComponents/NewProjectButton';
import LoginButton from '../../components/ReferringComponents/LoginButton';
import LoadModelButton from '../../components/ReferringComponents/LoadModelButton';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { MainController } from '../../../controller/MainController';
import ReactDOM from 'react-dom';
import { States } from '../State';

type Props = {

};

export class ReferringPage extends React.Component<Props, State> implements Page {

    //change status
    //state: State;

    //this.state.currentState = States.NewProjekt;
    state = new State();
    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);

        this.needqr()
        const VDOM = (
            <div>
                <ConstantsText />
                <NewProjectButton />
                <LoginButton />
                <LoadModelButton />
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

    needqr() {
        PubSub.subscribe('needqr', (_msg: any) => {
            // console.log(this.state.currentState)
            this.state.currentState = States.NeedQRC
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            PubSub.publish('getqr', this.state.qr)
        })

    }
}
