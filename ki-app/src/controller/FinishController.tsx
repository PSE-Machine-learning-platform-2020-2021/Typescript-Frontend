import { Page } from "../view/pages/PageInterface";
import { AIPage } from "../view/pages/AIPage/index";
import { IState, States } from "../view/pages/State";

import { PageController } from "./PageController";
import { MainController } from "./MainController";

export class FinishController implements PageController {

    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor() {
        this.page = new FinishPage({});
        this.page.attach(this);
        this.state = this.page.getState();
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        let currentState: States = this.page.getState().currenState;
        switch (currentState) {
            case States.NeedDataRows:
                this.getDataRows();
                break;
            case States.NeedMessage:
                let ids = this.page.getIds();
                this.page.setMessages(MainController.getInstance().getMessage(ids));
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
     * Holt die Datenreihen aus dem Modell und übergibt sie an die momentane Seite.
     */
    private getDataRows() {
        let rows = MainController.getInstance().getFacade().getCurrentDataRows();
        this.page.setDataRows(rows);
    }

    /**
     * Ändert die Einstellungen eines DatenLabels gemäß den Änderungen aus der momentanen Seite.
     */
    private changeDataLabel() {
        let label = this.page.getChangedLabel();
        MainController.getInstance().getFacade().setDataLabel(label.id, label.start, label.end);
    }

    /**
     * Erstellt ein neues Datenlabel. Dafür werden die neuen Daten des Labels aus der momentanene Seite an das
     * Modell geleitet. Die ID des neuen Labels wird darauf an die momentane Seite übergeben.
     */
    private newDataLabel() {
        let start = this.page.getNewLabelStart();
        let end = this.page.getNewLabelEnd();
        let id = MainController.getInstance().getFacade().createLabel(start, end);
        this.page.setNewLabelID(id);
    }

    /**
     * Löscht das Label welches gemäß der Methode getDeleteLabelID von der momentanen Seite angegeben wurde.
     */
    private deleteDataLabel() {
        let id = this.page.getDeleteLabelID();
        MainController.getInstance().getFacade().deleteLabel(id);
    }
}