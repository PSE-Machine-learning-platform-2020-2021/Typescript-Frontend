import { timeStamp } from "console";
import { PageController } from "./PageController";
import { MainController } from "./MainController"

export class FinishController implements PageController {
    
    private page = new view.FinishPage() 

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor() {
        this.page.attach(this)
        this.page.setState("needMessage")
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update(){
        let state = this.page.getState()
        switch (state) {
            case "needDataRows":
                this.getDataRows();
                break;
            case "needMessage":
                let ids = this.page.getIds();
                this.page.setMessages(MainController.getInstance().getMessage(ids));
                break;
            case "changeDataLabel":
                this.changeDataLabel();
                break;
            case "newDataLabel":
                this.newDataLabel();
                break;
            case "deleteDataLabel":
                this.deleteDataLabel()
                break;
            default:
                break;
        }
    }

    /**
     * Holt die Datenreihen aus dem Modell und übergibt sie an die momentane Seite.
     */
    getDataRows() {
        let rows = MainController.getInstance().getFacade().getCurrentDataRows();
        this.page.setDataRows(rows);
    }

    /**
     * Ändert die Einstellungen eines DatenLabels gemäß den Änderungen aus der momentanen Seite.
     */
    changeDataLabel() {
        let label = this.page.getChangedLabel();
        MainController.getInstance().getFacade().setDataLabel(label.id, label.start, label.end);
    }

    /**
     * Erstellt ein neues Datenlabel. Dafür werden die neuen Daten des Labels aus der momentanene Seite an das
     * Modell geleitet. Die ID des neuen Labels wird darauf an die momentane Seite übergeben.
     */
    newDataLabel() {
        let start = this.page.getNewLabelStart();
        let end = this.page.getNewLabelEnd();
        let id = MainController.getInstance().getFacade().createLabel(start, end);
        this.page.setNewLabelID(id);
    }

    /**
     * Löscht das Label welches gemäß der Methode getDeleteLabelID von der momentanen Seite angegeben wurde.
     */
    deleteDataLabel() {
        let id = this.page.getDeleteLabelID();
        MainController.getInstance().getFacade().deleteLabel(id);
    }
}