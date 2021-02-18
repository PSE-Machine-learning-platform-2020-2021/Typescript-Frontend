import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { FinishPage } from "../view/pages/FinishPage/index";

import { ReferringPage } from "../view/pages/ReferringPage/index"

import { PageController } from "./PageController";
import { MainController } from "./MainController";

export class FinishController implements PageController {

    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor() {
        this.page = new ReferringPage({});
        this.page.attach(this);
        this.state = this.page.getState();
        this.state.dataRows! = MainController.getInstance().getFacade().getCurrentDataRows()!.dataRows!
        this.page.setState(this.state)
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        this.state = this.page.getState().currenState;
        switch (this.state.currentState) {
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
                break;
            case States.ChangeLabel:
                this.changeDataLabel();
                break;
            case States.NewLabel:
                this.newDataLabel();
                break;
            case States.DeleteDataLabel:
                this.deleteDataLabel();
                break;
            default:
                break;
        }
    }

    /**
     * Ändert die Einstellungen eines DatenLabels gemäß den Änderungen aus der momentanen Seite.
     */
    private changeDataLabel() {
        let label = this.state.currentLabel!
        let sucess = MainController.getInstance().getFacade().setLabel(label.labelID, {start: label.start, end: label.end}, label.name);
        sucess.then((value: boolean) => {
            if(value) {
                this.state.currentState = States.setLabel
                this.page.setState(this.state)
            } else {
                this.state.currentState = States.LoadError
                this.page.setState(this.state)
            }
        })
    }

    /**
     * Erstellt ein neues Datenlabel. Dafür werden die neuen Daten des Labels aus der momentanene Seite an das
     * Modell geleitet. Die ID des neuen Labels wird darauf an die momentane Seite übergeben.
     */
    private newDataLabel() {
        let start: number = this.state.currentLabel!.start
        let end: number = this.state.currentLabel!.end
        let name: string = this.state.currentLabel!.name
        let promise: Promise<number> = MainController.getInstance().getFacade().createLabel({start , end}, name);
        promise.then((id: number) => {
            this.state.currentLabel!.labelID = id
            this.state.currentState = States.setLabel
            this.page.setState(this.state)
        })
    }

    /**
     * Löscht das Label welches gemäß der Methode getDeleteLabelID von der momentanen Seite angegeben wurde.
     */
    private deleteDataLabel() {
        let sucess = MainController.getInstance().getFacade().deleteLabel(this.state.currentLabel!.labelID);
        sucess.then((value: boolean) => {
            if(value) {
                this.state.currentState = States.setLabel
                this.page.setState(this.state)
            } else {
                this.state.currentState = States.LoadError
                this.page.setState(this.state)
            }
        })
    }
}