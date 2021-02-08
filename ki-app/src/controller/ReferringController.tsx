import { Page } from "../view/pages/PageInterface";
import { ReferringPage } from "../view/pages/ReferringPage/index";
import { State, States } from "../view/pages/ReferringPage/State";
import { PageController } from "./PageController";
import { MainController } from "./MainController";
//import { VisualizationController } from "./VisualizationController";
//import { AIController } from "./AIController";
import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';
import { QRData } from "qrcode-generator-ts/js/qrcode/QRData";

export class RefferingController implements PageController {
    private page: Page;

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
        let currentState: States = this.page.getState();
        switch (currentState) {
            case States.NeedQR:
                this.createQR();
                break;
            case States.Login:
                this.login();
                break;
            case States.NewProjekt:
                this.createNewProject();
                break;
            case States.LoadModel:
                this.loadModel();
                break;
            case States.SetLanguage:
                let languageCode = this.page.getState().languageCode;
                //this.page.languageChanged(MainController.getInstance().setLanguage(languageCode));
                break;
            case States.NeedMessage:
                let ids = this.page.getState().messageIDs;
                this.page.getState().messages = MainController.getInstance().getMessage(ids);
                break;
            default:
                break;
        }
    }

    login() {
        let loginData: string[] = this.page.getState().loginData;
        let loginSucess: boolean = false;//MainController.getInstance().getFacade().loginAdmin(loginData[0], loginData[0]);
        if (loginSucess) {
            let projectMeta: { projectID: number; projectName: string; }[] = [{ projectID: 1, projectName: "w" }]; //MainController.getInstance().getFacade().getProjectMetas();
            this.page.getState().projectMeta = projectMeta;
            this.page.setState("loggedIn");
        } else {
            this.page.setState("loginFailed");
        }
    }

    createQR() {
        let link: string = "test"; //MainController.getInstance().getFacade().getDataMinerLink();

        var qr = new QRCode();
        qr.setTypeNumber(5);
        qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
        qr.addData(link);
        qr.make();

        this.page.setState(States.ShowQR);
    }

    createNewProject() {
        let sucess: boolean = false;//MainController.getInstance().getFacade().createProject(this.page.getState().toLoadProjectID);
        if (sucess) {
            this.page.setState("needQR");
        } else {
            this.page.setState("ProjectError");
        }
    }

    loadProject() {
        let projectId: number = this.page.getState().toLoadProjectID;
        let sucess: boolean = false;//MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            this.page.setState("needQR");
        } else {
            this.page.setState("ProjectError");
        }
    }

    loadModel() {
        let projectId: number = this.page.getState().toLoadProjectID;
        let sucess: boolean = false;// MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            //let aiController: AIController = new AIController();
            //MainController.getInstance().changeTo(aiController);
        } else {
            this.page.setState("ProjectError");
        }
    }

    changeToVisualization() {
        //let visualizationController: VisualizationController = new VisualizationController();
        //MainController.getInstance().changeTo(visualizationController);
    }
}