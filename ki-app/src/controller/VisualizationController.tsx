import { PageController } from "./PageController";
import { VisualizationPage } from "../view/pages/VisualizationPage";
import { MainController } from "./MainController";
import { ModelCreationController } from "./ModelCreationController";

export class VisualizationController implements PageController {
    private page: VisualizationPage = new VisualizationPage();

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status.
     * Dieser Seitenverwalter benötigt einen SensorManager, welcher schon initilisiert wurde. 
     */
    constructor() {
        this.page.attach(this);
        this.page.setState("needMessage");
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        let state = this.page.getState();
        switch (state.action) {
            case "needMessage":
                let ids = this.page.getIds();
                this.page.setMessages(MainController.getInstance().getMessage(ids));
                break;
            case "needData":
                this.needData();
                break;
            case "changeToModelCreation":
                this.changeToModelCreation;
                break;
            default:
                break;
        }
    }

    needData() {
        // let data = MainController.getInstance().getFacade().getMinerData();
    }

    alertConnectionError() {

    }

    changeToModelCreation() {
        let modelCreationController: ModelCreationController = new ModelCreationController();
        MainController.getInstance().changeTo(modelCreationController);
    }
}