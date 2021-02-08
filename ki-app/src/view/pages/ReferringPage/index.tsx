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

    observer: PageController[] = [];
    state: State = new State();

    constructor(props: Props) {
        super(props);
        this.render();
    }


    render() {
        ReactDOM.render(<div>
            <ConstantsText />
            <NewProjectButton />
            <LoginButton />
            <LoadModelButton />
        </div>, document.getElementById('root'));

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
        this.observer.push(observer);
    }

    detach() {
        //todo
    }

    notify() {
        for (let index = 0; index < this.observer.length; index++) {
            const element = this.observer[index];
            element.update();
        }

    }

    getState() {
        return this.state;
    }

    setState(state: State) {
        this.state = state;
    }
}
