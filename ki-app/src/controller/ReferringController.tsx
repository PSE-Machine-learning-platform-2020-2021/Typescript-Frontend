import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";

import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { DeliveryController } from "./DeliveryController";

import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';
import { ReferringPage } from "../view/pages/ReferringPage";
import { VisualizationController } from "./VisualizationController";
import { VisualizationPage } from "../view/pages/VisualizationPage";


export class RefferingController implements PageController {
    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den Start Status. 
     */
    constructor() {
        this.page = new ReferringPage({});
        this.page = new VisualizationPage({})
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
            case States.LoadProject:
                this.loadProject();
                break;
            case States.NeedQRC:
                this.createQR();
                break;
            case States.Register:
                this.register();
                break;
            case States.Login:
                this.login();
                break;
            case States.NewProjekt:
                this.createNewProject();
                break;
            case States.LoadProject:
                this.loadProject();
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
            case States.Register:
                this.register();
                break;
            case States.ChangeToVisualization:
                //  MainController.getInstance().changeTo(new VisualizationController())
                break;
            default:
                break;
        }
    }

    /**
     * Logt den Benutzer ein
     */
    login() {
        let adminData: { name: string, email: string, password: string; } = this.state.adminData!;
        let loginSucess: boolean = MainController.getInstance().getFacade().loginAdmin(adminData.email, adminData.password);
        if (loginSucess) {
            this.state.projectData! = MainController.getInstance().getFacade().getProjectMetas();
        } else {
            this.state.currentState = States.LoginFail;
        }
    }

    /**
     * Registriert den Benutzer
     */
    register() {
        let adminData: { name: string, email: string, password: string; } = this.state.adminData!;
        let loginSucess: boolean = MainController.getInstance().getFacade().registerAdmin(adminData.name, adminData.email, adminData.password);
        if (!loginSucess) {
            this.state.currentState = States.LoginFail;
        }
    }

    /**
     * Erstellt ein QRCode und übergibt in an die Seite
     */
    createQR() {
        //let link: string = MainController.getInstance().getFacade().getDataMinerLink();

        var qr = new QRCode();
        qr.setTypeNumber(5);
        qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
        qr.addData("link");
        qr.make();
        this.state.qr = qr.toDataURL();
        //divElement.innerHTML = state.qr
        this.state.currentState = States.SetQRC;

    }

    /**
     * Erstelle ein neues Projekt, welches auch als momentanes Projekt gesetzt wird.
     */
    createNewProject() {
        let sucess: boolean = MainController.getInstance().getFacade().createProject(this.state.currentProject!.projectName);
        if (sucess) {
            this.state.currentState = States.NeedQRC;
        } else {
            this.state.currentState = States.LoadError;
        }
    }

    /**
     * Setzt ein Projekt als momentanes Projekt
     */
    loadProject() {
        let projectId: number = this.state.currentProject!.projectID!;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            this.state.currentState = States.NeedQRC;
        } else {
            this.state.currentState = States.LoadError;
        }
    }

    /**
     * Läde ein Modell und wechselt zur delivery Seite
     */
    loadModel() {
        let projectId: number = this.state.currentProject!.projectID;
        let sucess: boolean = MainController.getInstance().getFacade().loadProject(projectId);
        if (sucess) {
            //  let deliveryConroller: DeliveryController = new DeliveryController(this.state.currentProject!)
            //   MainController.getInstance().changeTo(deliveryConroller);
        } else {
            this.state.currentState = States.LoadError;
        }
    }
}