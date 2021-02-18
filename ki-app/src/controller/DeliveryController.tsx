import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { DeliveryPage } from "../view/pages/DeliveryPage/index";

export class DeliveryController implements PageController {

    private page: Page;
    private state: IState;

    /**
    * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
    * @param currentProject Die momentanen Projectdaten für welches man ein Model ausliefern möchte. 
    */
    constructor(currentProject: { projectID: number, projectName: string, choosenAIModelID: number; }) {
        this.page = new DeliveryPage({});
        this.page.attach(this);
        this.state = this.page.getState()
        this.state.currentProject = currentProject
        this.page.setState(this.state)
    }

    /**
    * Die Update Methode des Seitenverwalters.
    */
    update() {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.DeliverWeb:
                this.deliverAsWebApp();
                break;
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
                break;
            default:
                break;
        }
    }

    /**
    * Holt sich aus dem Status alle angegebene Email-Adressen und gibt diese mit Daten zum Projekt an die Fassade welche eine Email an alle Adressen sendet.
    * Der Inhalt der Email gibt zugriff auf das Modell zur klassifizierung.
    */
    deliverAsWebApp() {
        //let emails: string[] = this.state.currentMail;
        let emails: string[] = ["Darius.Seiter@outlook.com"]
        //let text: string = MainController.getInstance().getFacade().getDeliverText();
        let text: string = "TEST"
        for (let index = 0; index < emails.length; index++) {
            const element: string = emails[index];
            //MainController.getInstance().getFacade().sendMail(element, this.state.currentProject);
        }
    }

    deliverAsExe() {
        //todo in Quality Controll
    }
}