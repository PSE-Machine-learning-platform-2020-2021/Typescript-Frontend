import { PageController } from "./PageController";
import { VisualizationPage } from "../view/pages/VisualizationPage/index";
import { MainController } from "./MainController";
import { ModelCreationController } from "./ModelCreationController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { State } from "../view/pages/DeliveryPage/State";

export class VisualizationController implements PageController {
    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor(currentProjekt: { projectID: number, projectName: string, choosenAIModelID: number; }) {
        this.page = new VisualizationPage({});
        this.page.attach(this);
        this.state = this.page.getState()
        this.state.currentProject = currentProjekt
        this.page.setState(this.state)
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
                break;
            case States.ChangeToCreation:
                MainController.getInstance().changeTo(new ModelCreationController())
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

    SetDataRows() {
        let data = [this.state.dataSets!]//MainController.getInstance().getFacade().getMinerData();
        for (let index = 0; index < data.length; index++) {
            this.state.dataSets! = data[index];
            this.state.currentState = States.SetDataRows
            this.page.setState(this.state)
        }
    }

    alertConnectionError() {
        this.state.currentState = States.LoadError
        this.page.setState(this.state)
    }

    /**
     * Ändert die Einstellungen eines DatenLabels gemäß den Änderungen aus der momentanen Seite.
     */
    private changeDataLabel() {
        let label = this.state.currentLabel!
        MainController.getInstance().getFacade().setLabel(label.labelID, {start: label.start, end: label.end}, label.name);
    }

    /**
     * Erstellt ein neues Datenlabel. Dafür werden die neuen Daten des Labels aus der momentanene Seite an das
     * Modell geleitet. Die ID des neuen Labels wird darauf an die momentane Seite übergeben.
     */
    private newDataLabel() {
        let label = this.state.currentLabel!
        //label.labelID = MainController.getInstance().getFacade().creatLabel(label.start, label.end);
        this.state.currentLabel! = label
    }

    /**
     * Löscht das Label welches gemäß der Methode getDeleteLabelID von der momentanen Seite angegeben wurde.
     */
    private deleteDataLabel() {
        //MainController.getInstance().getFacade().deleteLabel(this.state.currentLabel!.labelID);
    }
}