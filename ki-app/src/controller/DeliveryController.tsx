import { PageController } from "./PageController";
import { MainController } from "./MainController";
import { DeliveryPage } from "../view/src/pages/DeliveryPage/index";

export class DeliveryController implements PageController {

    private page = new DeliveryPage();

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
            case "deliverWebApp":
                this.deliverAsWebApp();
                break;
            case "deliverExe":
                this.deliverAsExe();
                break;
            case "needMessage":
                let ids = this.page.getIds();
                this.page.setMessages(MainController.getInstance().getMessage(ids));
                break;
            default:
                break;
        }
    }

    deliverAsWebApp() {
        let emails: string[] = this.page.getEMails();
        let link: string = MainController.getInstance().getFacade().getModelLink();
        for (let index = 0; index < emails.length; index++) {
            const element: string = emails[index];
            MainController.getInstance().getFacade().sendMail(element);
        }
    }

    deliverAsExe() {
        //todo
    }
}