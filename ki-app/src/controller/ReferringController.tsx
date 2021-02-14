import { Page } from "../view/pages/PageInterface";
import { ReferringPage } from "../view/pages/ReferringPage/index";
import { IState, States } from "../view/pages/State";

import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { AIController } from "./AIController";

import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';


export class RefferingController implements PageController {
    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den Start Status. 
     */
    constructor() {
        this.page = new ReferringPage({});
        this.page.attach(this);
        this.state = this.page.getState();
        this.update();
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        this.state = this.page.getState();
        switch (this.state.currentState) {
            case States.NeedQRC:
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
                this.page.setState(MainController.getInstance().setLanguage(this.state.languageCode));
                break;
            case States.NeedMessage:
                this.page.setState(MainController.getInstance().getMessage(this.state.messages));
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
        let adminData: { name: string, email: string, password: string; } = this.state.adminData!;
        let loginSucess: boolean = MainController.getInstance().getFacade().loginAdmin(adminData.email, adminData.password);
        if (loginSucess) {
            this.state.projectData! = MainController.getInstance().getFacade().getProjectMetas();
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
        //let link: string = MainController.getInstance().getFacade().getDataMinerLink();

        var qr = new QRCode();
        qr.setTypeNumber(5);
        qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
        qr.addData("link");
        qr.make();
        this.state.qr = qr.toDataURL();
        console.log(qr.toDataURL());
        //divElement.innerHTML = state.qr
        this.state.currentState = States.NeedMessage;
        //this.page.setState(this.state);
    }

    createNewProject() {
        let sucess: boolean = MainController.getInstance().getFacade().createProject(this.state.currentProject!.projectName);
        if (sucess) {
            this.state.currentState = States.NeedMessage;
        } else {
            this.state.currentState = States.LoadError;

        }
        this.page.setState(this.state);
    }

    loadProject() {
        let projectId: number = this.state.currentProject!.projectID!;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            this.state.currentState = States.NeedMessage;
        } else {
            this.state.currentState = States.LoadError;
        }
        this.page.setState(this.state);
    }

    loadModel() {
        let projectId: number = this.state.currentProject!.projectID;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            //let aiController: AIController = new AIController();
            //MainController.getInstance().changeTo(aiController);
        } else {
            this.state.currentState = States.LoadError;
            this.page.setState(this.state);
        }
    }
}