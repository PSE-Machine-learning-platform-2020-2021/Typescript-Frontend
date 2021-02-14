import React from 'react';
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
        this.needqr()
        this.register()
        this.login()
        this.needprojectlist()
        this.loadproject()
        this.loadmodel()
        //  this.loadproject
        const VDOM = (
            <div>
                <ConstantsText />
                <NewProjectButton />
                <LoginWindow />
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
            //console.log(this.state.qr)
            PubSub.publish('getqr', this.state.qr)
        })
    }

    register() {
        PubSub.subscribe('register', (_msg: any, data: { name: string, email: string, password: string; }) => {
            // console.log(this.state.currentState)
            this.state.adminData = data
            this.state.currentState = States.Register
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            let flag: boolean
            if (this.state.currentState != States.Register) {
                flag = false
            } else {
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
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            let flag: boolean
            if (this.state.currentState != States.Login) {
                flag = false
            } else {
                flag = true
            }
            PubSub.publish('loginstatus', flag)
        })

    }

    needprojectlist() {
        PubSub.subscribe('needproject', (_msg: any) => {
            // console.log(this.state.currentState)
            this.state.currentState = States.NeedProject
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            PubSub.publish('getprojectlist', this.state.projectData)
        })
    }

    loadproject() {
        PubSub.subscribe('loadproject', (_msg: any, data: { projectID: number, projectName: string, AIModelExist: boolean; }) => {
            // console.log(this.state.currentState)
            this.state.currentState = States.LoadProject
            this.state.currentProject = { projectID: data.projectID, projectName: data.projectName, AIModels: [] }
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            PubSub.publish('getmodelist', this.state.currentProject)

        })
    }
    loadmodel() {
        PubSub.subscribe('loadmodel', (_msg: any, data: { projectID: number, projectName: string, AIModelExist: boolean; }) => {
            // console.log(this.state.currentState)
            this.state.currentState = States.LoadProject
            this.state.currentProject = { projectID: data.projectID, projectName: data.projectName, AIModels: [] }
            //console.log(this.state.currentState)
            this.notify()
            //console.log(this.state.currentState)
            //PubSub.publish('getchosen', this.state.chosenModel)
        })
    }
}
