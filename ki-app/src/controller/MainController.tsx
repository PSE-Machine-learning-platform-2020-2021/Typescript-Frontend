import { PageController } from "./PageController";
//import { StartController } from "./StartController";
import { RefferingController } from "./ReferringController";
import { MainControllerInterface } from "./MainControllerInterface";
import { IState, States } from "../view/pages/State";
import { Facade } from "../model/Facade";

export class MainController implements MainControllerInterface {
  private facade: Facade;

  private static mainController: MainController;

  private currentPageController: PageController | undefined;

  /**
   * Konstruktor des MainControllers. Holt sich die Fassade.
   */
  constructor() {
    this.facade = new Facade("de");
  }

  /**
   * Gibt sich selber zurück und sorgt dafür das nur ein MainController besteht.
   * @returns MainController
   */
  static getInstance() {
    if (this.mainController === undefined) {
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
    return false;//this.facade.checkLogin();
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
  startApp() {
    let refferingController: RefferingController = new RefferingController();
    this.changeTo(refferingController);
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
<<<<<<< HEAD
  getMessage(ids: number[]) {
    return [];//MainController.getInstance().getFacade().getMessage(ids);
=======
  getMessage(messages: { text: string, id: number; }[]) {
    let messageIDs: number[] = [];
    for (let index = 0; index < messages.length; index++) {
      messageIDs.push(messages[index].id);
    }
    let texts: string[] = [];
    for (let index = 0; index < messages.length; index++) {
      messages[index].text = texts[index];
      return messages;
    }
>>>>>>> 90d98927a215002b6c7db0280fc1c74c9ee1ff3f
  }

  /**
   * @param languageCode Das Sprachkürzel als string.
   * @returns Gibt true zurück falls der wechsel erfolgt ist, sonst false.
   */
  setLanguage(languageCode: string) {
<<<<<<< HEAD
    let changed = true;//this.facade.setLanguage(languageCode);
    return changed;
=======
    let nextState: States;
    let success = this.getFacade().setLanguage(languageCode);
    if (success) {
      nextState = States.NeedMessage;
    } else {
      nextState = States.LoadError;
    }
    return nextState;
>>>>>>> 90d98927a215002b6c7db0280fc1c74c9ee1ff3f
  }
}
