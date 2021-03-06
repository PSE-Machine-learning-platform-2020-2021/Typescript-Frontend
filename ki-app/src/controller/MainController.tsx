import { PageController } from "./PageController";
import { RefferingController } from "./ReferringController";
import { MainControllerInterface } from "./MainControllerInterface";
import { Facade } from "../model/Facade";
import { StartController } from "./StartController";

import dataDE from '../model/language/de.json';
import { AIController } from "./AIController";
import { DeliveryController } from "./DeliveryController";

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
  constructor() {
    document.title = "Explorer App";
    this.facade = new Facade("de-de");
  }

  private languageCode: string = "de-de";

  /**
   * Gibt sich selber zurück und sorgt dafür das nur ein MainController besteht.
   * @returns MainController
   */
  static getInstance(): MainController {
    if (this.mainController === undefined) {
      this.mainController = new MainController();
      return this.mainController;
    }
    return this.mainController;
  }


  /**
   * Prüft ob der Benutzer angemeldet ist.
   * @returns Gibt true zurück falls der Benutzer angemeldet ist, sonst wird false zurück gegeben.
   */
  checkLoginStatus(): boolean {
    return false;//this.facade.checkLogin();
  }

  /**
   * Setzt den momentanen Seitenverwalter neu
   * @param destinationPageController Der neue Seitenverwalter
   */
  changeTo(destinationPageController: PageController): void {
    delete this.currentPageController;
    this.currentPageController = destinationPageController;
  }

  /**
   * Andwendungstart, entscheidet durch die URL ob es sich um Desktop oder Smartphone handelt
   */
  startApp(): void {
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    if (urlParams.get("isMiner") === "true") {
      this.currentPageController = new StartController();
    }
    else if (urlParams.get("deliverModel") === "true") {
      let modelID: number = +urlParams.get("modelID")!;
      this.currentPageController = new DeliveryController(modelID);
    }
    else if (urlParams.get("useModel") === "true") {
      let modelID: number = +urlParams.get("modelID")!;
      this.currentPageController = new AIController(modelID);
    }
    else {
      this.currentPageController = new RefferingController();
    }
  }

  /**
   * @returns Gibt die Fassade zurück
   */
  getFacade(): Facade {
    return this.facade;
  }

  /**
   * @param ids Alle ids, zu denen man die Texte möchte.
   * @returns Gibt alle texte zu den übergebenen ids zurück.
   */
  getMessage(messages: { text: string, id: number; }[]): { text: string, id: number; }[] {
    return [{ text: "null", id: -1 }];
    /** 
    let messageIDs: number[] = [];
    for ( let index = 0; index < messages.length; index++ ) {
      messageIDs.push( messages[ index ].id );
    }
    let texts: string[] = [];
    for ( let index = 0; index < messages.length; index++ ) {
      messages[ index ].text = texts[ index ];
      return messages;
    } */
  }

  getText() {
    switch (this.languageCode) {
      case "de-de":
        return dataDE;

      default:
        return dataDE;
    }
  }

  /**
   * @param languageCode Das Sprachkürzel als string.
   * @returns Gibt true zurück falls der wechsel erfolgt ist, sonst false.
   */
  setLanguage(languageCode: string) {
    this.languageCode = languageCode;
  }

  getLanguageCode(): string {
    return this.languageCode;
  }
}
