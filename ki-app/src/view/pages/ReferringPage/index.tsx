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
        this.update()
    }

    update() {
        this.notify()
        const VDOM = (
            <div>
                <ConstantsText />
                <LoginWindow pageRegister = {this.register.bind(this)} pageLogin = {this.login.bind(this)}/>
                <br /><br /><br /><br /><br />
                <NewProjectButton   disabled = {!this.state.islogedIn!} 
                                    pageNewProject = {this.createNewProject.bind(this)}
                                    qr = {this.state.qr!}
                                    link = {this.state.link!}
                                    pageChangeToVisu = {this.changetovisu.bind(this)}
                />
                <br />
                <LoadModelButton    pageLoadModel = {this.loadmodel.bind(this)} 
                                    disabled = {!this.state.islogedIn!} 
                                    projectData = {this.state.projectData!} 
                                    pageSetCurrentprojekt = {this.setCurrentProjekt.bind(this)}
                                    qr = {this.state.qr!}
                                    pageLoadProjekt = {this.loadproject.bind(this)}
                                    pageChangeToVisu = {this.changetovisu.bind(this)}
                />

                <NotificationContainer/>
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'))
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

    createNewProject(projectName: string) {
        this.state.currentProject!.projectName = projectName
        this.state.currentState = States.NewProjekt
        this.update()
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
      this.update()
      this.state.wait!.then(() => {
          //console.log(this.state.currentState)
          // eslint-disable-next-line
          if (this.state.currentState as States == States.LoginFail as States) {
            NotificationManager.error("Registrieren fehlgeschlagen!", "", 3000)
            return
          }
          NotificationManager.success("Wilkommen " + this.state.adminData?.email)
          this.update()
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
                        NotificationManager.error("Login fehlgeschlagen!", "", 3000)
                        return
                    }
                    NotificationManager.success("Wilkommen " + this.state.adminData?.email)
                    this.update()
                });
    }

    loadproject(data: { projectID: number, projectName: string, choosenAIModelID: number }) {
            this.state.currentProject = data
            // eslint-disable-next-line
            this.state.currentState = States.LoadProject
            //console.log(data.projectID);
            this.update()
    }

    setCurrentProjekt( currentProject: { projectID: number, projectName: string, choosenAIModelID: number }) {
        this.state.currentProject = currentProject
        this.update()
    }

    changetovisu() {
        this.state.currentState = States.ChangeToVisual
        this.notify()
    }

    loadmodel(chosenmodelID: number) {
        this.state.currentProject!.choosenAIModelID = chosenmodelID
        this.state.currentState =  States.LoadModel
        this.update()
    }

    setState(state: any) {
        this.state = state
        this.update()
    }
}
