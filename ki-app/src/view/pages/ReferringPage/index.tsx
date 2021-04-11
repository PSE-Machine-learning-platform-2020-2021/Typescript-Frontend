import ReactDOM from 'react-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ConstantsText from '../../components/ReferringComponents/ConstantsText';
import NewProjectButton from '../../components/ReferringComponents/NewProjectButton';
import LoadModelButton from '../../components/ReferringComponents/LoadModelButton';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { States } from '../State';
import LoginWindow from '../../components/ReferringComponents/LoginWindow';

/*
*Darstellungsseite der Verweisseite.
*/
export class ReferringPage implements Page {
    private state: State;
    private observers: PageController[] = [];

    private WELCOME = "Wilkommen "
    private REG_ERROR = "Registrieren fehlgeschlagen!"
    private MAIL_INVALID = "Email-Adresse nicht gültig"
    private LOGIN_ERROR = "Login fehlgeschlagen!"

    /**
    * Konstruktor der Darstellungsseite.
    */
    constructor() {
        this.state = new State();
        this.update();
    }

    /**
    * Update Methode der Darstellungsseite. Diese Methode wird nach jeder Änderung, die kein Seitenwechsel ist, aufgerufen. 
    * Die Methode enthält den Aufbau der Seite und wird von ihr gerendert.
    * Es werden durch notify() alle controller über ein Update informiert und alle Seiten Elemente werden aktualisiert und erneut gerendert. 
    */
    update() {
        this.notify();
        const VDOM = (
            <div>
                <ConstantsText
                //nur für test
                //changeToDelivery={this.changeToDelivery.bind(this)}
                />
                <LoginWindow pageRegister={this.register.bind(this)} pageLogin={this.login.bind(this)} />
                <NewProjectButton disabled={!this.state.islogedIn!}
                    pageNewProject={this.createNewProject.bind(this)}
                    qr={this.state.qr!}
                    link={this.state.link!}
                    pageChangeToVisu={this.changetovisu.bind(this)}
                />
                <br />
                <LoadModelButton disabled={!this.state.islogedIn!}
                    projectData={this.state.projectData!}
                    pageSetCurrentprojekt={this.setCurrentProjekt.bind(this)}
                    pageLoadModel={this.loadmodel.bind(this)}
                    pageLoadProjekt={this.loadproject.bind(this)}
                    pageChangeToVisu={this.changetovisu.bind(this)}
                    qr={this.state.qr!} 
                    link={this.state.link!}
                    />
                    
                <NotificationContainer />
            </div>
        );
        if (document.getElementById('root') !== null) {
            ReactDOM.render(VDOM, document.getElementById('root'));
        }
    }

    /**
    * Durch diese Methode kann sich ein Controller als Beobachter anmelden.
    * @param oberver neuer Beobachter
    */
    attach(observer: PageController) {
        this.observers.push(observer);
    }

    /**
    * Durch diese Methode kann sich ein Controller als Beobachter abmelden.
    * @param oberver Beobachter der zu entfernen ist
    */
    detach(observer: PageController) {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    /**
    * Durch diese Methode werden alle Beobachter über eine Änderung auf der Seite informiert.
    */
    notify() {
        for (let index = 0; index < this.observers.length; index++) {
            const element = this.observers[index];
            element.update();
        }
    }

    /**
    * Gibt den Status der Seite zurück
    */
    getState() {
        return this.state;
    }

    /**
    * Der Benutzer möchte ein neues Projekt erstellen
    * @param projectName Name des neuen Projekts
    */
    private createNewProject(projectName: string) {
        this.state.currentProject!.projectName = projectName;
        this.state.currentState = States.NewProjekt;
        this.update();
    }

    /**
     * Ein Benutzer möchte sich registrieren
     * @param username Name des Benutzers
     * @param email Email des Benutzers
     * @param password Passwort des Benutzers
     */
    private register(username: string, email: string, password: string) {
        var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z])+$/;
        if (!pattern.test(email)) {
            NotificationManager.error(this.MAIL_INVALID, "", 3000);
        } else {
            this.state.adminData! = { name: username, email: email, password: password };
            this.state.currentState = States.Register;
            this.update();
            this.state.wait!.then(() => {
                if (this.state.currentState as States === States.LoginFail as States) {
                    NotificationManager.error(this.REG_ERROR, "", 3000);
                    return;
                }
                NotificationManager.success(this.WELCOME + this.state.adminData?.email);
                this.update();
            });
        }
    }

    /**
     * Ein Benutzer möchte sich Anmelden
     * @param email Email des Benutzers
     * @param password Passwort des Benutzers
     */
    private login(email: string, password: string) {
        // console.log(this.state.currentState)
        // eslint-disable-next-line
        this.state.adminData! = { name: "", email: email, password: password };
        // eslint-disable-next-line
        this.state.currentState = States.Login;
        this.update();
        this.state.wait!.then(() => {
            // eslint-disable-next-line
            if (this.state.currentState as States == States.LoginFail as States) {
                NotificationManager.error(this.LOGIN_ERROR, "", 3000);
                return;
            }
            NotificationManager.success(this.WELCOME + this.state.adminData?.email);
            this.update();
        });
    }

    /**
     * Ein Projekt soll geladen werden
     * @param data Infomationen über das zu ladene Projekt
     */
    private loadproject(data: { projectID: number, projectName: string, AIModelID: number[]; }) {
        this.state.currentProject = data;
        this.state.currentState = States.LoadProject;
        this.update();
    }

    /**
     * Ein Projekt als momentanes Projekt setzen
     * @param currentProject Infomationene über das momentane projekt
     */
    private setCurrentProjekt(currentProject: { projectID: number, projectName: string, AIModelID: number[]; }) {
        this.state.currentProject = currentProject;
        this.update();
    }

    /**
     * Wechsel der Seite zur Visualisierungseite.
     */
    private changetovisu() {
        this.state.currentState = States.ChangeToVisual;
        this.notify(); // Kein Update, da sonst die Seite neu rendert und der Seitenwechsel fehlschlägt
    }

    /**
     * Lade ein KI-Model
     * @param chosenmodelID ID des Models
     */
    private loadmodel(chosenmodelID: number) {
        this.state.chosenAIModel = chosenmodelID;
        this.state.currentState = States.LoadModel;
        this.update();
    }

    /**
    //nur für test DeliveryPage
    private changeToDelivery() {
        this.state.currentState = States.ChangeToDelivery;
        this.notify();
    }
 */
    /**
     * Setzt einen neuen Zustand für die Seite und aktualisiert sie
     * @param state neuer Zustand für die Seite
     */
    setState(state: any) {
        this.state = state;
        this.update();
    }
}
