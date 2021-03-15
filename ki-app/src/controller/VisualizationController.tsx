import { PageController } from "./PageController";
import { VisualizationPage } from "../view/pages/VisualizationPage/index";
import { MainController } from "./MainController";
import { ModelCreationController } from "./ModelCreationController";
import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";

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
        this.state = this.page.getState();
        this.state.currentProject = currentProjekt;
        this.page.setState(this.state);
        this.SetDataRows();
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
                MainController.getInstance().changeTo(new ModelCreationController());
                break;
            default:
                break;
        }
    }

    /**
    * Übergibt der Seite alle Datenreihen die verfügbar sind. Dies wird Alle drei Sekunden wiederholt bis der Seitenzustand auf
    * ChangeToCreation wechselt.
    */
    SetDataRows() {
        //Nur COPY damit es sofort da ist und nicht erst nach dem die intervall Zeit abgelaufen ist
        MainController.getInstance().getFacade().loadProject(this.state.currentProject!.projectID);
        var dataSets = MainController.getInstance().getFacade().getDataSetMetas();
        this.state.currentDataSets! = [];
        for (let index = 0; index < dataSets.length; index++) {
            let data = MainController.getInstance().getFacade().getDataRows(dataSets[index].dataSetID).dataRows!;
            this.state.currentDataSets!.push({ dataSetID: dataSets[index].dataSetID, rows: data });
            PubSub.publish('visualizationDiagram', { dataSetID: dataSets[index].dataSetID, dataRows: data });
        }
        this.state.currentState = States.SetDataRows;
        this.page.setState(this.state);
        this.state = this.page.getState();
        //bis hier nur copy

        let intervalId = setInterval(() => {
            if (this.state.currentState === States.ChangeToCreation) clearInterval(intervalId);
            MainController.getInstance().getFacade().loadProject(this.state.currentProject!.projectID);
            var dataSets = MainController.getInstance().getFacade().getDataSetMetas();
            this.state.currentDataSets! = [];
            for (let index = 0; index < dataSets.length; index++) {
                let data = MainController.getInstance().getFacade().getDataRows(dataSets[index].dataSetID).dataRows!;
                this.state.currentDataSets!.push({ dataSetID: dataSets[index].dataSetID, rows: data });
                PubSub.publish('visualizationDiagram', { dataSetID: dataSets[index].dataSetID, dataRows: data });
            }
            this.state.currentState = States.SetDataRows;
            this.page.setState(this.state);
            this.state = this.page.getState();
        }, 1000);
    }
}