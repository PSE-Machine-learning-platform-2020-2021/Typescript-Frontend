import { Page } from "../view/pages/PageInterface";
import { ReferringPage } from "../view/pages/ReferringPage/index";
import { State } from "../view/pages/ReferringPage/State";
import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { VisualizationController } from "./VisualizationController";
import { AIController } from "./AIController";
import { qrcodegen } from "../qrcode/qrcodegen";

export class RefferingController implements PageController {
    private page: Page;
    private qrc = qrcodegen.QrCode;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor() {
        this.page = new ReferringPage({});
        this.page.attach(this);
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        let currentState: State.States = this.page.getState();
        switch (currentState) {
            case State.States.NeedQR:
                this.createQR();
                break;
            case State.States.Login:
                this.login();
                break;
            case State.States.NewProjekt:
                this.createNewProject();
                break;
            case State.States.LoadModel:
                this.loadModel();
                break;
            case State.States.SetLanguage:
                let languageCode = this.page.getState().languageCode;
                //this.page.languageChanged(MainController.getInstance().setLanguage(languageCode));
                break;
            case State.States.NeedMessage:
                let ids = this.page.getState().messageIDs;
                this.page.getState().messages = MainController.getInstance().getMessage(ids);
                break;
            default:
                break;
        }
    }

    login() {
        let loginData: string[] = this.page.getState().loginData;
        let loginSucess: boolean = MainController.getInstance().getFacade().loginAdmin(loginData[0], loginData[0]);
        if (loginSucess) {
            let projectMeta: { projectID: number; projectName: string; }[] = MainController.getInstance().getFacade().getProjectMetas();
            this.page.getState().projectMeta = projectMeta;
            this.page.setState("loggedIn");
        } else {
            this.page.setState("loginFailed");
        }
    }

    createQR() {
        let link: string = MainController.getInstance().getFacade().getDataMinerLink();
        let qr0 = this.qrc.encodeText(link, this.qrc.Ecc.MEDIUM);
        let svg = qr0.toSvgString(4);
        this.page.getState().qrSvg = svg;
        this.page.setState(State.States.ShowQR);
    }

    createNewProject() {
        let sucess: boolean = MainController.getInstance().getFacade().createProject(this.page.getState().toLoadProjectID);
        if (sucess) {
            this.page.setState("needQR");
        } else {
            this.page.setState("ProjectError");
        }
    }

    loadProject() {
        let projectId: number = this.page.getState().toLoadProjectID;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            this.page.setState("needQR");
        } else {
            this.page.setState("ProjectError");
        }
    }

    loadModel() {
        let projectId: number = this.page.getState().toLoadProjectID;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            let aiController: AIController = new AIController();
            MainController.getInstance().changeTo(aiController);
        } else {
            this.page.setState("ProjectError");
        }
    }

    changeToVisualization() {
        let visualizationController: VisualizationController = new VisualizationController();
        MainController.getInstance().changeTo(visualizationController);
    }
}