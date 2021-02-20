export interface IState {
  currentState: States;
  languageCode: string;
  messages: { text: string, id: number; }[];

  //Anzeige aller Projekte eines nutzers
  //ReferringPage
  projectData?: { projectID: number; projectName: string; AIModelID: number[]; }[];
  // Das Projekt welches in der view ausgewählt wurde
  currentProject?: { projectID: number, projectName: string, choosenAIModelID: number; };
  adminData?: { name: string, email: string, password: string; };
  aiUserData?: { name: string, result: string; };
  currentLabel?: { labelID: number, start: number, end: number; name: string; };
  sessionID?: string;
  dataPoints?: { dataPoint?: { value: number; relativeTime: number; }; }[];
  dataRows?: { value: number; relativeTime: number; }[][];
  dataSets?: { dataSetID: number; dataSetName: string; }[];
  qr?: string;
  diagramSvg?: string;
  recordingSettings?: { newDataSetName: string, usedSensorTypes: number[], readTime: number, waitTime: number, availableSensorTypes: { sensorTypID: number; sensorType: string; chosen: boolean; }[]; };
  trainingParameter?: {
    sensors?: number[],
    dataSets: number[],
    imputations: string[],
    classifier: string,
    scaler: string,
    extractions: string[],
    trainingDataPercentage?: number, // optional
    slidingWindowSize?: number,      // optional
    slidingWindowStep?: number;        // optional
  };


  chosenEmails?: string[];
  wait?: Promise<any>
}

export enum States {
  /**
   * Seite benötigt texte
   */
  NeedMessage,
  /**
   * Seite kann nun aus dem status die texte laden
   */
  SetMessage,
  /**
   * Seite benötigt ein QRC
   */
  NeedQRC,
  /**
   * QRC kann angezeigt werden
   */
  SetQRC,
  /**
   * Projektdaten können benutzt werden
   */
  SetProjects,
  /**
   * Sprache der Anwendung soll geändert werden
   */
  SetLanguage,
  /**
   * Fehler für alle zu ladenen sachen
   */
  LoadError,
  /**
   * Ein Login Versuch soll durchgeführt werden
   */
  Login,
  /**
   * Ein Registrierungsversuch soll durchgeführt werden
   */
  Register,
  /**
     * Update aller Daten welche auf der Seite angezeigt werden, zum Beispiel Projekt Daten für die Projekt liste.
     */
  updateData,
  /**
   * Ein neues Projekt soll erstellt werden
   */
  NewProjekt,
  /**
   * Projekts soll geladen werden
   */
  LoadProject,
  /**
   * Model eines Projekts soll geladen werden
   */
  LoadModel,
  /**
   * Login ist gescheitert
   */
  LoginFail,
  /**
   * Beginne Datenerfassung
   */
  StartDataRead,
  /**
   * Klassifiziere Daten
   */
  ClassifyResult,
  /**
   * Die Seite benötigt die neusten Datenreihen
   */
  NeedDataRows,
  /**
   * Ein Label soll geändert werden
   */
  ChangeLabel,
  /**
   * Ein Label soll gelöscht werden
   */
  DeleteDataLabel,
  /**
   * Ein neues Label los erstellt werden
   */
  NewLabel,
  /**
   * Wechsel zur Startseite
   */
  ChangeToStart,
  /**
   * Wechsel zur Fertigungsseite
   */
  ChangeToFinish,
  /**
   * Wechsel zur Verweisseite
   */
  ChangeToDataCollection,

  ChangeToRefferring,

  ChangeToVisual,

  ChangeToCreation,

  NeedInstantDiagram,

  /**
   * Zeige neue wartezeit
   */
  SetWaitTime,
  /**
   * Zeige neue lesezeit
   */
  SetReadTime,

  //Visu
  NeedImageList,

  //Delivery
  /**
   * Liefert an die auf der Seite angegebenen Email-Adressen die WebApp für ein Modell
   */
  DeliverWeb,
  //Download
  NeedDownload,

  //Modelcreation
  NeedDatabaseList,

  /**
   * Neue Datenreihen sind im Status hinterlegt
   */
  SetDataRows,
  /**
   * Der Nutzer möchte mit dem KI Training beginnen
   */
  NeedKiTraining

}