import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { VisualizationController } from "./VisualizationController";
import { AIController } from "./AIController";
import { qrcodegen } from "../qrcode/qrcodegen";

export class RefferingController implements PageController {
    private page = new view.StartPage();
    private qrc = qrcodegen.QrCode;
    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
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
            case "needQR":
                this.createQR();
                break;
            case "login":
                this.login();
                break;
            case "newProjekt":
                this.createNewProject();
                break;
            case "loadModel":
                this.loadModel();
                break;
            case "setLanguage":
                let languageCode = this.page.getLanguageCode();
                this.page.languageChanged(MainController.getInstance().setLanguage(languageCode));
                break;
            case "needMessage":
                let ids = this.page.getIds();
                this.page.setMessages(MainController.getInstance().getMessage(ids));
                break;
            default:
                break;
        }
    }

    login() {
        let loginData: string[] = this.page.getLoginData();
        let loginSucess: boolean = MainController.getInstance().getFacade().loginAdmin(loginData[0], loginData[0]);
        if (loginSucess) {
            let projectMeta: string[] = MainController.getInstance().getFacade().getProjectMetas();
            this.page.setProjectMeta(projectMeta);
            this.page.setState("loggedIn");
        } else {
            this.page.setState("loginFailed");
        }
    }

    createQR() {
        let link: string = MainController.getInstance().getFacade().getDataMinerLink();
        let qr0 = this.qrc.encodeText(link, this.qrc.Ecc.MEDIUM);
        let svg = qr0.toSvgString(4);
        this.page.setQRsvg(svg);
        this.page.setState("showQRcode");
    }

    createNewProject() {
        let sucess: boolean = MainController.getInstance().getFacade().createProject(this.page.getNewProjectName());
        if (sucess) {
            this.page.setState("needQR");
        } else {
            this.page.setState("ProjectError");
        }
    }

    loadProject() {
        let projectId: number = this.page.getProjectID;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            this.page.setState("needQR");
        } else {
            this.page.setState("ProjectError");
        }
    }

    loadModel() {
        let projectId: number = this.page.getProjectID;
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