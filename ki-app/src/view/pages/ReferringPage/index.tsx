import PubSub from 'pubsub-js';
import ConstantsText from '../../components/ReferringComponents/ConstantsText';
import NewProjectButton from '../../components/ReferringComponents/NewProjectButton';
import LoadModelButton from '../../components/ReferringComponents/LoadModelButton';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { States } from '../State';
import LoginWindow from '../../components/ReferringComponents/LoginWindow';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ReactDOM from 'react-dom';


export class ReferringPage implements Page {

    private state: State
    private observers: PageController[] = [];

    constructor() {
        this.state = new State()
        ReactDOM.render(this.render(), document.getElementById('root'));
    }

    render() {
        const VDOM = (
            <div>
                <ConstantsText />
                <LoginWindow pageRegister = {this.register.bind(this)} pageLogin = {this.login.bind(this)}/>
                <br /><br /><br /><br /><br />
                <NewProjectButton disabled = {!this.state.islogedIn!}/>
                <br />
                <LoadModelButton    pageLoadModel = {this.loadmodel} 
                                    disabled = {!this.state.islogedIn!} 
                                    projectData = {this.state.projectData!} 
                                    pageSetCurrentprojekt = {this.setCurrentProjekt}
                />

                <NotificationContainer/>
            </div>
        );
        return VDOM
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
            this.setState({currentState: States.NewProjekt})
            //console.log(this.state.currentState)
            // eslint-disable-next-line
            this.setState({currentProject: { projectID: -10000, projectName: data, choosenAIModelID: -10000 }})
            //hier notifty for createnewProject
            this.notify();
        });
    }

    register(username: string, email: string, password: string) {
        /** mit controller weiter veraendern*/
    var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z])+$/
    if (!pattern.test(email)) {
        NotificationManager.error("Email-Adresse nicht gültig", "", 3000)
    } else {
      // eslint-disable-next-line
      this.state.adminData! = {name: username, email: email, password: password}
      // eslint-disable-next-line
      this.state.currentState = States.Register
      //console.log(this.state.currentState)
      this.notify();
      this.state.wait!.then(() => {
          //console.log(this.state.currentState)
          // eslint-disable-next-line
          if (this.state.currentState != States.Register) {
            alert('Registrieren fehlgeschlagen!');
          }
          this.render()
      });
    }
}

    login(email: string, password: string) {
                // console.log(this.state.currentState)
                // eslint-disable-next-line
                this.state.adminData! = {name: "", email: email, password: password}
                // eslint-disable-next-line
                this.state.currentState = States.Login
                this.notify();
                this.state.wait!.then(() => {
                    // eslint-disable-next-line
                    if (this.state.currentState as States == States.LoginFail as States) {
                        alert('Login fehlgeschlagen!');
                    }
                    this.render()
                });
    }

    loadproject(data: { projectID: number, projectName: string, choosenAIModelID: number }) {
            this.state.currentProject = data
            // eslint-disable-next-line
            this.state.currentState = States.LoadProject
            //console.log(data.projectID);
            this.notify();
    }

    setCurrentProjekt( currentProject: { projectID: number, projectName: string, choosenAIModelID: number }) {
        this.state.currentProject = currentProject
    }

    changetovisu() {
        this.state.currentState = States.ChangeToVisual
        this.notify();
    }

    loadmodel(chosenmodelID: number) {
        this.state.currentProject!.choosenAIModelID = chosenmodelID
        this.state.currentState =  States.LoadModel
        this.notify();
    }

    setState(state: any) {
        this.state = state
        ReactDOM.render(this.render(), document.getElementById('root'))
        this.notify()
    }
}
