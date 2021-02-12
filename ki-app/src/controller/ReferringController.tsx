import { Page } from "../view/pages/PageInterface";
<<<<<<< HEAD
import { ReferringPage } from "../view/pages/ReferringPage/index";
import { IState, States } from "../view/pages/State";

import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { VisualizationController } from "./VisualizationController";
import { AIController } from "./AIController";

import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

export class RefferingController implements PageController {
    private page: Page;
    private state: IState;
=======

import { State, States } from "../view/pages/FinishPage/State";
import { PageController } from "./PageController";
import { MainController } from "./MainController";
//import { VisualizationController } from "./VisualizationController";
//import { AIController } from "./AIController";
import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';
import { QRData } from "qrcode-generator-ts/js/qrcode/QRData";
import { ReferringPage } from "../view/pages/ReferringPage";
import { VisualizationPage } from "../view/pages/VisualizationPage"
import { FinishPage } from "../view/pages/FinishPage/index";
import { DeliveryPage } from "../view/pages/DeliveryPage";
import ModelCreationPage from "../view/pages/ModelCreationPage";

export class RefferingController implements PageController {
    private page: Page;
>>>>>>> origin/MergeTest

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den start Status. 
     */
    constructor() {
        this.page = new ReferringPage({});
<<<<<<< HEAD
        this.page.attach(this);
        this.state = this.page.getState();
        this.update();
=======
        //fuer test page
        //this.page = new FinishPage({});
        //this.page = new VisualizationPage({});
        //this.page = new DeliveryPage({})
        //this.page = new ModelCreationPage({})
        this.page.attach(this);
>>>>>>> origin/MergeTest
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
<<<<<<< HEAD
        this.state = this.page.getState();
        switch (this.state.currentState) {
=======
        let currentState: States = this.page.getState();
        switch (currentState) {
>>>>>>> origin/MergeTest
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
<<<<<<< HEAD
                this.page.setState(MainController.getInstance().setLanguage(this.state.languageCode));
                break;
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
=======
                let languageCode = this.page.getState().languageCode;
                //this.page.languageChanged(MainController.getInstance().setLanguage(languageCode));
                break;
            case States.NeedMessage:
                let ids = this.page.getState().messageIDs;
                this.page.getState().messages = MainController.getInstance().getMessage(ids);
>>>>>>> origin/MergeTest
                break;
            default:
                break;
        }
    }

    private setLanguage() {
        let languageCode = this.state.languageCode;
        let success = MainController.getInstance().setLanguage(languageCode);
        if (success) {
            this.state.currentState = States.NeedMessage;
        } else {
            this.state.currentState = States.LoadError;
        }
        this.page.setState(this.state);
    }

    login() {
<<<<<<< HEAD
        let adminData: { name: string, email: string, password: string; } = this.state.adminData!;
        let loginSucess: boolean = MainController.getInstance().getFacade().loginAdmin(adminData.email, adminData.password);
        if (loginSucess) {
            let projectMeta: { projectID: number; projectName: string; }[] = MainController.getInstance().getFacade().getProjectMetas();
            this.state.projectData = projectMeta;
=======
        let loginData: string[] = this.page.getState().loginData;
        let loginSucess: boolean = false;//MainController.getInstance().getFacade().loginAdmin(loginData[0], loginData[0]);
        if (loginSucess) {
            let projectMeta: { projectID: number; projectName: string; }[] = [{ projectID: 1, projectName: "w" }]; //MainController.getInstance().getFacade().getProjectMetas();
            this.page.getState().projectMeta = projectMeta;
            this.page.setState("loggedIn");
>>>>>>> origin/MergeTest
        } else {
            this.state.currentState = States.LoginFail;

        }
        this.page.setState(this.state);
    }

    register() {
        let adminData: { name: string, email: string, password: string; } = this.state.adminData!;
        let loginSucess: boolean = MainController.getInstance().getFacade().registerAdmin(adminData.name, adminData.email, adminData.password);
        if (!loginSucess) {
            this.state.currentState = States.LoginFail;
        }
        this.page.setState(this.state);
    }

    createQR() {
<<<<<<< HEAD
        let link: string = MainController.getInstance().getFacade().getDataMinerLink();
=======
        let link: string = "test"; //MainController.getInstance().getFacade().getDataMinerLink();
>>>>>>> origin/MergeTest

        var qr = new QRCode();
        qr.setTypeNumber(5);
        qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
        qr.addData(link);
        qr.make();
<<<<<<< HEAD
        this.state.qr = qr;
        this.state.currentState = States.NeedQR;
        this.page.setState(this.state);
    }

    createNewProject() {
        let sucess: boolean = MainController.getInstance().getFacade().createProject(this.state.projectData?.projectName!);
=======

        this.page.setState(States.ShowQR);
    }

    createNewProject() {
        let sucess: boolean = false;//MainController.getInstance().getFacade().createProject(this.page.getState().toLoadProjectID);
>>>>>>> origin/MergeTest
        if (sucess) {
            this.state.currentState = States.NeedQR;
        } else {
            this.state.currentState = States.ProjectError;
        }
        this.page.setState(this.state);
    }

    loadProject() {
<<<<<<< HEAD
        let projectId: number = this.state.toLoadProjectID;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
=======
        let projectId: number = this.page.getState().toLoadProjectID;
        let sucess: boolean = false;//MainController.getInstance().getFacade().loadProject(projectId);
>>>>>>> origin/MergeTest
        if (sucess) {
            this.state.currentState = States.NeedQR;
        } else {
            this.state.currentState = States.LoadError;
        }
        this.page.setState(this.state);
    }

    loadModel() {
<<<<<<< HEAD
        let projectId: number = this.state.toLoadProjectID;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
=======
        let projectId: number = this.page.getState().toLoadProjectID;
        let sucess: boolean = false;// MainController.getInstance().getFacade().loadProject(projectId);
>>>>>>> origin/MergeTest
        if (sucess) {
            //let aiController: AIController = new AIController();
            //MainController.getInstance().changeTo(aiController);
        } else {
            this.state.currentState = States.LoadError;
            this.page.setState(this.state);
        }
    }

    changeToVisualization() {
        //let visualizationController: VisualizationController = new VisualizationController();
        //MainController.getInstance().changeTo(visualizationController);
    }
}