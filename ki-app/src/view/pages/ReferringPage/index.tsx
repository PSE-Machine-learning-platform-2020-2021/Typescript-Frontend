import React, { Component } from 'react';
import ConstantsText from '../../components/ReferringComponents/ConstantsText';
import NewProjectButton from '../../components/ReferringComponents/NewProjectButton';
import LoginButton from '../../components/ReferringComponents/LoginButton';
import LoadModelButton from '../../components/ReferringComponents/LoadModelButton';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { MainController } from '../../../controller/MainController';
import ReactDOM from 'react-dom';

type Props = {
};

export class ReferringPage extends React.Component<Props, State> implements Page {

    observers: PageController[] = [];
    bttn: HTMLElement;



    constructor(props: Props) {
        super(props);
        ReactDOM.render(<div>
            <ConstantsText />
            <NewProjectButton />
            <LoginButton />
            <LoadModelButton />
        </div>, document.getElementById('root'));

        this.bttn = document.getElementById("new")!;
        console.log(this.bttn);
        this.bttn.onclick = function () {
            console.log("test");
        };


    }

    render() {
        return (
            <div>
                <ConstantsText />
                <NewProjectButton />
                <LoginButton />
                <LoadModelButton />
            </div>
        );
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
