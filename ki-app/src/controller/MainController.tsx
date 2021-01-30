import { PageController } from "./PageController";
import { StartController } from "./StartController";
import {RefferingController} from "./ReferringController";
export class MainController {

    private static facade : view.Facade;

    private static currentPageController : PageController;

    /**
    * Prüft ob das Gerät auf das Internet zugreifen kann.
    * @returns Gibt true zurück falls eine Internetverbindung besteht, sonst wird false zurück gegeben.
    */
    static checkConnection() {
        return (window.navigator.onLine);
    }

    /**
    * Prüft ob der Benutzer angemeldet ist.
    * @returns Gibt true zurück falls der Benutzer angemeldet ist, sonst wird false zurück gegeben.
    */
    static checkLoginStatus() {
        return (this.facade.checkLogin());
    }

    // static getSession() {
    //    return false
    //}

    /**
    * Setzt den momentanen Seitenverwalter neu
    * @param destinationPageController Der neue Seitenverwalter
    */
    static changeTo(destinationPageController: PageController){
        this.currentPageController = destinationPageController;
    }

    /**
    * Andwendungstart für einen Desktop
    */
    static startDesktop() {
        let refferingController: RefferingController  = new RefferingController()
        this.changeTo(refferingController)
    }

    /**
    * Andwendungstart für ein Smartphone
    */
    static startSmartphone() {
        let startController: StartController  = new StartController()
        this.changeTo(startController)
    }

    /**
    * @returns Gibt die Fassade zurück
    */
    static getFacade() {
        return this.facade;
    }
}