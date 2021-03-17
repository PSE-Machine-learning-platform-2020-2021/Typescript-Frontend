import { Page } from "../view/pages/PageInterface";
import { IState, States } from "../view/pages/State";
import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { DeliveryController } from "./DeliveryController";
import { VisualizationController } from "./VisualizationController";
import { ReferringPage } from "../view/pages/ReferringPage/index";
import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

/**
* Controller für die Verweisseite
*/
export class RefferingController implements PageController {
    private page: Page;
    private state: IState;

    /**
     * Konstruktor des Seitenverwalters. Registriert sich als Beobachter auf seiner Seite und setzt den Start Status. 
     */
    constructor() {
        this.page = new ReferringPage();
        //this.page = new StartPage({});
        //this.page = new ModelCreationPage({});
        // this.page = new VisualizationPage({});
        this.page.attach(this);
        this.state = this.page.getState();
        this.update();
    }

    /**
     * Die Update Methode des Seitenverwalters.
     */
    update() {
        this.state = this.page.getState();
        console.log("controller update: " + this.state.currentState.toString())
        switch (this.state.currentState) {
            case States.LoadProject:
                this.loadProject();
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
            case States.LoadModel:
                this.loadModel();
                break;
            case States.SetLanguage:
                MainController.getInstance().setLanguage(this.state.languageCode)
                break;
            case States.NeedMessage:
                this.state.messages = MainController.getInstance().getMessage(this.state.messages)!
                this.state.currentState = States.waitForDB
                this.page.setState(this.state);
                break;
            case States.ChangeToVisual:
                MainController.getInstance().changeTo(new VisualizationController(this.state.currentProject!));
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
        let loginSucess: Promise<boolean> = MainController.getInstance().getFacade().loginAdmin(adminData.email, adminData.password);
        this.state.wait! = loginSucess;
        this.state.currentState = States.waitForDB;
        this.page.setState(this.state);
        loginSucess.then((value: boolean) => {
            if (value) {
                this.state.projectData! = [];
                let projectData: Promise<{ projectID: number; projectName: string; AIModelID: number[]; }[]> = MainController.getInstance().getFacade().getProjectMetas();
                projectData.then((data: { projectID: number; projectName: string; AIModelID: number[]; }[]) => {
                    this.state.projectData! = data;
                    this.page.setState(this.state);
                });
                this.state.islogedIn! = true
            } else {
                this.state.currentState = States.LoginFail;
            }
            this.page.setState(this.state);
        });
        loginSucess.catch((value: boolean) => {
            console.log(value);
        });
        //this.state.projectData! = [{ projectID: 1, projectName: "string", AIModelID: [1,2] }]
        //this.page.setState(this.state)
    }

    /**
     * Registriert den Benutzer
     */
    register() {
        let adminData: { name: string, email: string, password: string; } = this.state.adminData!;
        let loginSucess: Promise<boolean> = MainController.getInstance().getFacade().registerAdmin(adminData.name, adminData.email, adminData.password);
        this.state.wait! = loginSucess;
        this.state.currentState = States.waitForDB;
        this.page.setState(this.state);
        loginSucess.then((value: boolean) => {
            if (value) {
                this.state.projectData! = [];
                let projectData: Promise<{ projectID: number; projectName: string; AIModelID: number[]; }[]> = MainController.getInstance().getFacade().getProjectMetas();
                projectData.then((data: { projectID: number; projectName: string; AIModelID: number[]; }[]) => {
                    this.state.projectData! = data;
                    this.page.setState(this.state);
                });
                this.state.islogedIn! = true
            } else {
                this.state.currentState = States.LoginFail;
            }
            console.log("Eingelogt? " + this.state.islogedIn! + " " + this.state.currentState)
            this.page.setState(this.state);
        });
    }

    /**
     * Erstellt ein QRCode und übergibt in an die Seite
     */
    createQR() {
        const url = new URL(document.URL);
        url.searchParams.append("SessionID", MainController.getInstance().getFacade().getSessionID().toString());
        url.searchParams.append("isMiner", "true");
        let link: string = url.toString();
        var qr = new QRCode();
        qr.setTypeNumber(5);
        qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
        qr.addData(link);
        qr.make();
        this.state.qr = qr.toDataURL();
        this.state.link = link
        this.state.currentState = States.SetQRC;
    }

    /**
     * Erstelle ein neues Projekt, welches auch als momentanes Projekt gesetzt wird.
     */
    createNewProject() {
        let sucess: Promise<boolean> = MainController.getInstance().getFacade().createProject(this.state.currentProject!.projectName);
        this.state.wait! = sucess;
        this.state.currentState = States.waitForDB;
        this.page.setState(this.state);
        sucess.then((value: boolean) => {
            if (value) {
                this.createQR();
                let projectData: Promise<{ projectID: number; projectName: string; AIModelID: number[]; }[]> = MainController.getInstance().getFacade().getProjectMetas();
                projectData.then((data: { projectID: number; projectName: string; AIModelID: number[]; }[]) => {
                    this.state.projectData! = data;
                });
            } else {
                this.state.currentState = States.LoadError;
            }
            this.page.setState(this.state);
        });

    }

    /**
     * Setzt ein Projekt als momentanes Projekt
     */
    loadProject() {
        let projectId: number = this.state.currentProject!.projectID!;
        let sucess: Promise<boolean> = MainController.getInstance().getFacade().loadProject(projectId);
        this.state.wait! = sucess;
        this.state.currentState = States.waitForDB;
        this.page.setState(this.state);
        sucess.then((value: boolean) => {
            if (value) {
                this.createQR();
                let projectData: Promise<{ projectID: number; projectName: string; AIModelID: number[]; }[]> = MainController.getInstance().getFacade().getProjectMetas();
                projectData.then((data: { projectID: number; projectName: string; AIModelID: number[]; }[]) => {
                    this.state.projectData! = data;
                });
            } else {
                this.state.currentState = States.LoadError;
            }
            this.page.setState(this.state);
        });
    }

    /**
     * Läde ein Modell und wechselt zur delivery Seite
     */
    loadModel() {
        let projectId: number = this.state.currentProject!.projectID;
        let sucess: Promise<boolean> = MainController.getInstance().getFacade().loadProject(projectId);
        this.state.wait! = sucess;
        this.state.currentState = States.waitForDB;
        this.page.setState(this.state);
        sucess.then((value: boolean) => {
            if (value) {
                let deliveryConroller: DeliveryController = new DeliveryController(this.state.currentProject!);
                MainController.getInstance().changeTo(deliveryConroller);
            } else {
                this.state.currentState = States.LoadError;
            }
        });
        this.page.setState(this.state);
    }
}