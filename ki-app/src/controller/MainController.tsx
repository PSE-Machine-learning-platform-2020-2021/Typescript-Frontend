import { PageController } from "./PageController";
import { RefferingController } from "./ReferringController";
import { MainControllerInterface } from "./MainControllerInterface";
import { States } from "../view/pages/State";
import { Facade } from "../model/Facade";
import { StartController } from "./StartController";

/**
* Hauptverwalter der Anwendung. Enthält momentane Seite, die Fassade und verwaltet die Sprache.
*/
export class MainController implements MainControllerInterface {
  /**
  * Fassade des Models
  */
  private facade: Facade;

  /**
  * Nach dem Singelton Muster enthält sich der Maincontroller genau einmal selber.
  */
  private static mainController: MainController;

  /**
  * Der momentane Seitencontroller
  */
  private currentPageController: PageController | undefined;

  /**
   * Konstruktor des MainControllers. Holt sich die Fassade.
   */
  constructor () {
    this.facade = new Facade( "de-de" );
  }

  /**
   * Gibt sich selber zurück und sorgt dafür das nur ein MainController besteht.
   * @returns MainController
   */
  static getInstance () {
    if ( this.mainController === undefined ) {
      this.mainController = new MainController();
      return this.mainController;
    }
    return this.mainController;
  }

  /**
   * Prüft ob das Gerät auf das Internet zugreifen kann.
   * @returns Gibt true zurück falls eine Internetverbindung besteht, sonst wird false zurück gegeben.
   */
  checkConnection () {
    return window.navigator.onLine;
  }

  /**
   * Prüft ob der Benutzer angemeldet ist.
   * @returns Gibt true zurück falls der Benutzer angemeldet ist, sonst wird false zurück gegeben.
   */
  checkLoginStatus () {
    return false;//this.facade.checkLogin();
  }

  /**
   * Setzt den momentanen Seitenverwalter neu
   * @param destinationPageController Der neue Seitenverwalter
   */
  changeTo ( destinationPageController: PageController ) {
    this.currentPageController = destinationPageController;
  }

  /**
   * Andwendungstart, entscheidet durch die URL ob es sich um Desktop oder Smartphone handelt
   */
  startApp () {
    const queryString = window.location.search;
    let urlParams = new URLSearchParams( queryString );
    var controller: PageController;
    if ( urlParams.get( "isMiner" ) === "true" ) {
      controller = new StartController();
    } else {
      controller = new RefferingController();
    }
    this.changeTo( controller );
  }

  /**
   * @returns Gibt die Fassade zurück
   */
  getFacade () {
    return this.facade;
  }

  /**
   * @param ids Alle ids, zu denen man die Texte möchte.
   * @returns Gibt alle texte zu den übergebenen ids zurück.
   */
  getMessage ( messages: { text: string, id: number; }[] ) {
    return [{ text: "null", id: -1 }]
    let messageIDs: number[] = [];
    for ( let index = 0; index < messages.length; index++ ) {
      messageIDs.push( messages[ index ].id );
    }
    let texts: string[] = [];
    for ( let index = 0; index < messages.length; index++ ) {
      messages[ index ].text = texts[ index ];
      return messages;
    }
  }

  /**
   * @param languageCode Das Sprachkürzel als string.
   * @returns Gibt true zurück falls der wechsel erfolgt ist, sonst false.
   */
  setLanguage ( languageCode: string ) {
    let nextState: States;
    let success = this.getFacade().setLanguage( languageCode );
    if ( success ) {
      nextState = States.NeedMessage;
    } else {
      nextState = States.LoadError;
    }
    return nextState;
  }
}
