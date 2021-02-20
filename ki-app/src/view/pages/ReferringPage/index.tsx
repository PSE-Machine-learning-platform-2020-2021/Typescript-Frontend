import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import ConstantsText from '../../components/ReferringComponents/ConstantsText';
import NewProjectButton from '../../components/ReferringComponents/NewProjectButton';
import LoadModelButton from '../../components/ReferringComponents/LoadModelButton';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import LoginWindow from '../../components/ReferringComponents/LoginWindow';

type Props = {

};

export class ReferringPage extends React.Component<Props, State> implements Page {

    state = new State();
    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);

        const VDOM = (
            <div>
                <ConstantsText />
                <LoginWindow />
                <NewProjectButton />
                <LoadModelButton />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
        this.createNewProject()
        this.register()
        this.login()
        this.getmodellist()
        this.loadproject()
        this.changetovisu()
        this.loadmodel()
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

    createNewProject() {
        PubSub.subscribe('createnewproject', (_msg: any, data: string) => {
            // console.log(this.state.currentState)
            this.state.currentState = States.NewProjekt;
            this.state.currentProject = { projectID: -10000, projectName: data, choosenAIModelID: -10000 }
            //hier notifty for createnewProject
            this.notify()
            //notify for needqr
            this.notify()
            PubSub.publish('getqr', this.state.qr)
        })
    }

    register() {
        PubSub.subscribe('register', (_msg: any, data: { name: string, email: string, password: string; }) => {
            // console.log(this.state.currentState)
            this.state.adminData = data
            this.state.currentState = States.Register
            //this.setState({ adminData: data })
            //this.setState({ currentState: States.Register })
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            let flag: boolean
            if (this.state.currentState != States.Register) {
                flag = false
            } else {
                PubSub.publish('disabled', false)
                flag = true
            }
            PubSub.publish('registerstatus', flag)
        })
    }

    login() {
        PubSub.subscribe('login', (_msg: any, data: { name: string, email: string, password: string; }) => {
            // console.log(this.state.currentState)
            this.state.adminData = data
            this.state.currentState = States.Login
            this.notify()
            let flag: boolean
            this.state.wait!.then(() => {
                if (this.state.currentState as States === States.LoginFail as States) {
                    flag = false
                } else {
                    flag = true
                    PubSub.publish('disabled', false)
                    PubSub.publish('getprojectlist', this.state.projectData)
                }
                PubSub.publish('loginstatus', flag)
            })
        })
    }

    getmodellist() {
        PubSub.subscribe('needmodellist', (_msg: any, data: { projectID: number, projectName: string, AIModelID: number[]; }) => {
            // console.log(this.state.currentState)
            this.state.currentState = States.LoadProject
            this.state.currentProject = { projectID: data.projectID, projectName: data.projectName, choosenAIModelID: -10000 }
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            PubSub.publish('getmodellist', this.state.projectData)

        })
    }

    loadproject() {
        PubSub.subscribe('loadproject', (_msg: any, data: { projectID: number, projectName: string, choosenAIModelID: number; }) => {
            this.state.currentProject = { projectID: data.projectID, projectName: data.projectName, choosenAIModelID: -10000 }
            this.state.currentState = States.NeedQRC
            this.notify()
            PubSub.publish('getqr', this.state.qr)
        })
    }
    changetovisu() {
        PubSub.subscribe('changetovisu', (_msg: any) => {
            this.state.currentState = States.ChangeToVisual
            this.notify()
        })
    }

    loadmodel() {
        PubSub.subscribe('loadmodel', (_msg: any, data: { projectID: number, projectName: string, choosenAIModelID: number; }) => {
            this.state.currentProject = data
            this.state.currentState = States.LoadModel
            this.notify()
        })
    }
}
