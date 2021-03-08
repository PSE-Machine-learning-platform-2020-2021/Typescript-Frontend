import React from 'react';
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
                <br /><br /><br /><br /><br />
                <NewProjectButton />
                <br />
                <LoadModelButton />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
        this.createNewProject();
        this.register();
        this.login();
        this.getmodellist();
        this.getProjectList();
        this.loadproject();
        this.changetovisu();
        this.loadmodel();
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
        PubSub.unsubscribe('createnewproject')
        PubSub.subscribe('createnewproject', (_msg: any, data: string) => {
            //console.log(this.state.currentState)
            // eslint-disable-next-line
            this.state.currentState = States.NewProjekt;
            //console.log(this.state.currentState)
            // eslint-disable-next-line
            this.state.currentProject = { projectID: -10000, projectName: data, choosenAIModelID: -10000 };
            //hier notifty for createnewProject
            this.notify();
        });
    }

    register() {
        PubSub.unsubscribe('register')
        PubSub.subscribe('register', (_msg: any, data: { name: string, email: string, password: string; }) => {
            // eslint-disable-next-line
            this.state.adminData = data;
            // eslint-disable-next-line
            this.state.currentState = States.Register;
            //console.log(this.state.currentState)
            this.notify();
            this.state.wait!.then(() => {
                //console.log(this.state.currentState)
                let flag: boolean;
                // eslint-disable-next-line
                if (this.state.currentState != States.Register) {
                    flag = false;
                } else {
                    PubSub.publish('disabled', false);
                    flag = true;
                }
                PubSub.publish('registerstatus', flag);
            });
        });
    }

    login() {
        PubSub.unsubscribe('login')
        PubSub.subscribe('login', (_msg: any, data: { name: string, email: string, password: string; }) => {
            // console.log(this.state.currentState)
            // eslint-disable-next-line
            this.state.adminData = data;
            // eslint-disable-next-line
            this.state.currentState = States.Login;
            this.notify();
            let flag: boolean;
            this.state.wait!.then(() => {
                // eslint-disable-next-line
                if (this.state.currentState as States == States.LoginFail as States) {
                    flag = false;
                } else {
                    flag = true;
                    PubSub.publish('disabled', false);
                    PubSub.publish('getprojectlist', this.state.projectData);
                }
                PubSub.publish('loginstatus', flag);

            });
        });
    }

    getmodellist() {
        PubSub.unsubscribe('needmodellist')
        PubSub.subscribe('needmodellist', (msg: any, data: { projectID: number; }) => {
            for (let index = 0; index < this.state.projectData!.length; index++) {
                // eslint-disable-next-line
                if (data.projectID == this.state.projectData![index].projectID) {
                    PubSub.publish('getmodellist', this.state.projectData![index]);
                    return;
                }
            }

        });
    }

    getProjectList() {
        PubSub.unsubscribe('needprojectlist')
        PubSub.subscribe('needprojectlist', () => {
            PubSub.publish('getprojectlist', this.state.projectData!);
        });
    }

    loadproject() {
        PubSub.unsubscribe('loadproject')
        PubSub.subscribe('loadproject', (_msg: any, data: { projectID: number, projectName: string, choosenAIModelID: number; }) => {
            // eslint-disable-next-line
            this.state.currentProject = { projectID: data.projectID, projectName: data.projectName, choosenAIModelID: -10000 };
            // eslint-disable-next-line
            this.state.currentState = States.LoadProject;
            //console.log(data.projectID);
            this.notify();
        });
    }

    changetovisu() {
        PubSub.unsubscribe('changetovisu')
        PubSub.subscribe('changetovisu', (_msg: any) => {
            // eslint-disable-next-line
            this.state.currentState = States.ChangeToVisual;
            this.notify();
        });
    }

    loadmodel() {
        PubSub.unsubscribe('loadmodel')
        PubSub.subscribe('loadmodel', (_msg: any, data: { projectID: number, projectName: string, choosenAIModelID: number; }) => {
            // eslint-disable-next-line
            this.state.currentProject = data;
            // eslint-disable-next-line
            this.state.currentState = States.LoadModel;
            this.notify();
        });
    }
}
