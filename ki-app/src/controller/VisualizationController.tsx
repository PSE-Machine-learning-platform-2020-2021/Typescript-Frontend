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

    SetDataRows() {
        let intervalId = setInterval(() => {
            MainController.getInstance().getFacade().loadProject();
            var dataSets = MainController.getInstance().getFacade().getDataSetMetas();
            this.state.currentDataSets! = [];
            for (let index = 0; index < dataSets.length; index++) {
                let data = MainController.getInstance().getFacade().getDataRows(dataSets[index].dataSetID).dataRows!;
                this.state.currentDataSets!.push({ dataSetID: dataSets[index].dataSetID, rows: data });
            }
            this.state.currentState = States.SetDataRows;
            this.page.setState(this.state);
            this.state = this.page.getState();
            if (this.state.currentState === States.ChangeToCreation) clearInterval(intervalId);
        }, 3000);
    }

    alertConnectionError() {
        this.state.currentState = States.LoadError;
        this.page.setState(this.state);
    }
}