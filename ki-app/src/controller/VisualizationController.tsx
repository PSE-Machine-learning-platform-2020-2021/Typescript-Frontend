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
    constructor(currentProject: { projectID: number, projectName: string, AIModelID: number[]; }) {
        this.page = new VisualizationPage();
        this.page.attach(this);
        this.state = this.page.getState();
        this.state.currentProject = currentProject;
        this.SetDataRows();
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.NeedMessage:
                this.state.messages = MainController.getInstance().getMessage(this.state.messages)!;
                this.state.currentState = States.waitForDB;
                this.page.setState(this.state);
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
    private SetDataRows() {
        this.state.dataSetMetas = MainController.getInstance().getFacade().getDataSetMetas();
        MainController.getInstance().getFacade().loadProject(this.state.currentProject!.projectID);
        var dataSets = MainController.getInstance().getFacade().getDataSetMetas();
        this.state.currentDataSets! = [];
        for (let index = 0; index < dataSets.length; index++) {
            let data = MainController.getInstance().getFacade().getDataRows(dataSets[index].dataSetID).dataRows;
            this.state.currentDataSets!.push({ dataSetID: dataSets[index].dataSetID, rows: data });
            this.page.setState(this.state);
        }
        this.state.currentState = States.SetDataRows;
        this.page.setState(this.state);
        this.state = this.page.getState();

        let intervalId = setInterval(() => {

            if (this.state.currentState === States.ChangeToCreation) {
                clearInterval(intervalId);
                return;
            }
            this.state.dataSetMetas = MainController.getInstance().getFacade().getDataSetMetas();
            MainController.getInstance().getFacade().loadProject(this.state.currentProject!.projectID);
            var dataSets = MainController.getInstance().getFacade().getDataSetMetas();
            this.state.currentDataSets! = [];
            for (let index = 0; index < dataSets.length; index++) {
                let data = MainController.getInstance().getFacade().getDataRows(dataSets[index].dataSetID).dataRows;
                this.state.currentDataSets!.push({ dataSetID: dataSets[index].dataSetID, rows: data });
            }
            this.state.currentState = States.SetDataRows;
            this.page.setState(this.state);
            this.state = this.page.getState();
        }, 2021);
    }
}