import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { DeliveryPage } from "../view/pages/DeliveryPage/index";
//import { DeliveryFormat } from "../model/DeliveryFormat"

/**
* Controller der die Auslieferungsseite verwaltet
*/
export class DeliveryController implements PageController {
    /**
    * Seite welche gerade von dem Controller verwaltet wird
    */
    private page: Page;
    /**
    * Status der Seite
    */
    private state: IState;

    /**
    * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
    * @param currentProject Die momentanen Projectdaten für welches man ein Model ausliefern möchte. 
    */
    constructor(chosenAiModel: number) {
        this.page = new DeliveryPage();
        this.page.attach(this);
        this.state = this.page.getState();
        this.state.chosenAIModel = chosenAiModel
        this.page.setState(this.state)
        this.update()
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
                this.state.messages = MainController.getInstance().getMessage(this.state.messages)!;
                this.state.currentState = States.waitForDB;
                this.page.setState(this.state);
                break;
            default:
                break;
        }
    }

    //TODO Die Auslieferung des Modells ist noch nicht fertig

    /**
    * Holt sich aus dem Status alle angegebene Email-Adressen und gibt diese mit Daten zum Projekt an die Fassade welche eine Email an alle Adressen sendet.
    * Der Inhalt der Email gibt zugriff auf das Modell zur klassifizierung.
    */
    private deliverAsWebApp() {
        console.log(this.state.chosenEmails)
        MainController.getInstance().getFacade().sendAIModel(this.state.chosenAIModel!, this.state.chosenEmails!)
        
    }

    private deliverAsExe() {
        //todo in Quality Controll
    }
}