import { PageController } from "./PageController";
import { StartController } from "./StartController";
import { RefferingController } from "./ReferringController";
import { MainControllerInterface } from "./MainControllerInterface";
import { IState, States } from "../view/pages/State";

export class MainController implements MainControllerInterface {
  private facade: view.Facade;

  private static mainController: MainController;

  private currentPageController: PageController | undefined;

  /**
   * Konstruktor des MainControllers. Holt sich die Fassade.
   */
  MainController() {
    this.facade = new DataView.Facade();
  }

  /**
   * Gibt sich selber zurück und sorgt dafür das nur ein MainController besteht.
   * @returns MainController
   */
  static getInstance() {
    if (this.mainController == undefined) {
      this.mainController = new MainController();
      return this.mainController;
    }
    return this.mainController;
  }

  /**
   * Prüft ob das Gerät auf das Internet zugreifen kann.
   * @returns Gibt true zurück falls eine Internetverbindung besteht, sonst wird false zurück gegeben.
   */
  checkConnection() {
    return window.navigator.onLine;
  }

  /**
   * Prüft ob der Benutzer angemeldet ist.
   * @returns Gibt true zurück falls der Benutzer angemeldet ist, sonst wird false zurück gegeben.
   */
  checkLoginStatus() {
    return this.facade.checkLogin();
  }

  // static getSession() {
  //    return false
  //}

  /**
   * Setzt den momentanen Seitenverwalter neu
   * @param destinationPageController Der neue Seitenverwalter
   */
  changeTo(destinationPageController: PageController) {
    this.currentPageController = destinationPageController;
  }

  /**
   * Andwendungstart für einen Desktop
   */
  startDesktop() {
    let refferingController: RefferingController = new RefferingController();
    this.changeTo(refferingController);
  }

  /**
   * Andwendungstart für ein Smartphone
   */
  startSmartphone() {
    let startController: StartController = new StartController();
    this.changeTo(startController);
  }

  /**
   * @returns Gibt die Fassade zurück
   */
  getFacade() {
    return this.facade;
  }

  /**
   * @param ids Alle ids, zu denen man die Texte möchte.
   * @returns Gibt alle texte zu den übergebenen ids zurück.
   */
  getMessage(messages: { text: string, id: number; }[]) {
    let messageIDs: number[] = [];
    for (let index = 0; index < messages.length; index++) {
      messageIDs.push(messages[index].id);
    }
    let texts: string[] = this.getFacade().getMessage(messageIDs);
    for (let index = 0; index < messages.length; index++) {
      messages[index].text = texts[index];
      return messages;
    }
  }

  /**
   * @param languageCode Das Sprachkürzel als string.
   * @returns Gibt true zurück falls der wechsel erfolgt ist, sonst false.
   */
  setLanguage(languageCode: string) {
    let nextState: States;
    let success = this.getFacade().setLanguage(languageCode);
    if (success) {
      nextState = States.NeedMessage;
    } else {
      nextState = States.LoadError;
    }
    return nextState;
  }
}
