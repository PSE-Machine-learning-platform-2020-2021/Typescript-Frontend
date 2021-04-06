export interface IState {
  currentState: States;
  languageCode: string;
  messages: { text: string, id: number; }[];

  //Anzeige aller Projekte eines nutzers
  //ReferringPage
  projectData?: { projectID: number; projectName: string; AIModelID: number[]; }[];
  // Das Projekt welches in der view ausgewählt wurde
  currentProject?: { projectID: number, projectName: string, AIModelID: number[]; };
  chosenAIModel?: number;
  adminData?: { name: string, email: string, password: string; };
  aiUserData?: { name: string, result: string; };
  currentLabel?: { labelID: number, start: number, end: number; name: string; };
  sessionID?: string;
  dataPoints?: { rowId: number, sensorType: number, value: number[]; relativeTime: number; }[];
  dataRows?: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[];
  //DataSet?: {dataSetID: number, rows: {sensorType: number, value: number[]; relativeTime: number; }[] }[]
  dataSetMetas?: { dataSetID: number; dataSetName: string; }[];
  currentDataSets?: { dataSetID: number, rows: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[]; }[];
  qr?: string;
  diagramSvg?: string;
  recordingSettings?: { newDataSetName: string, usedSensorTypes: number[], readTime: number, waitTime: number, availableSensorTypes: { sensorTypID: number; sensorType: string; chosen: boolean; }[]; };
  leadTime?: number;
  usedSensorNames?: string[];
  trainingParameter?: {
    dataSets: number[],
    imputator: string,
    classifier: string,
    scaler: string,
    features: string[];
    trainingDataPercentage?: number, // optional
    slidingWindowSize?: number,      // optional
    slidingWindowStep?: number;        // optional
  };
  islogedIn?: boolean;

  chosenEmails?: string[];
  wait?: Promise<any>;
  link?: string;
  //Beispiel fuer Visu
  //testDataSet?: { dataSetID: number; rows: { sensorType: number; datapoint: { value: number[]; relativeTime: number; }[]; }[]; }[];
}

export enum States {
  waitForDB = "waitForDB",
  /**
   * Seite benötigt texte
   */
  NeedMessage = "NeedMessage",
  /**
   * Seite kann nun aus dem status die texte laden
   */
  SetMessage = "SetMessage",
  /**
   * Seite benötigt ein QRC
   */
  NeedQRC = "NeedQRC",
  /**
   * QRC kann angezeigt werden
   */
  SetQRC = "SetQRC",
  /**
   * Projektdaten können benutzt werden
   */
  SetProjects = "SetProjects",
  /**
   * Sprache der Anwendung soll geändert werden
   */
  SetLanguage = "SetLanguage",
  /**
   * Fehler für alle zu ladenen sachen
   */
  LoadError = "LoadError",
  /**
   * Ein Login Versuch soll durchgeführt werden
   */
  Login = "Login",
  /**
   * Ein Registrierungsversuch soll durchgeführt werden
   */
  Register = "Register",
  /**
     * Update aller Daten welche auf der Seite angezeigt werden, zum Beispiel Projekt Daten für die Projekt liste.
     */
  updateData = "updateData",
  /**
   * Ein neues Projekt soll erstellt werden
   */
  NewProjekt = "NewProjekt",
  /**
   * Projekts soll geladen werden
   */
  LoadProject = "LoadProject",
  /**
   * Model eines Projekts soll geladen werden
   */
  LoadModel = "LoadModel",
  /**
   * Login ist gescheitert
   */
  LoginFail = "LoginFail",
  /**
   * Beginne Datenerfassung
   */
  StartDataRead = "StartDataRead",
  /**
   * Klassifiziere Daten
   */
  ClassifyResult = "ClassifyResult",
  /**
   * Die Seite benötigt die neusten Datenreihen
   */
  NeedDataRows = "NeedDataRows",
  /**
   * Ein Label soll geändert werden
   */
  ChangeLabel = "ChangeLabel",
  /**
   * Ein Label soll gelöscht werden
   */
  DeleteLabel = "DeleteLabel",
  /**
   * Ein neues Label los erstellt werden
   */
  NewLabel = "NewLabel",
  /**
   * Wechsel zur Startseite
   */
  ChangeToStart = "ChangeToStart",
  /**
   * Wechsel zur Fertigungsseite
   */
  ChangeToFinish = "ChangeToFinish",
  /**
   * Wechsel zur Verweisseite
   */
  ChangeToDataCollection = "ChangeToDataCollection",

  ChangeToRefferring = "ChangeToRefferring",

  ChangeToVisual = "ChangeToVisual",

  ChangeToCreation = "ChangeToCreation",

  NeedInstantDiagram = "NeedInstantDiagram",

  /**
   * Zeige neue wartezeit
   */
  SetWaitTime = "SetWaitTime",
  /**
   * Zeige neue lesezeit
   */
  SetReadTime = "SetReadTime",

  //Visu
  NeedRows = "NeedRows",

  //Delivery
  /**
   * Liefert an die auf der Seite angegebenen Email-Adressen die WebApp für ein Modell
   */
  DeliverWeb = "DeliverWeb",
  //Download
  NeedDownload = "NeedDownload",

  //Modelcreation
  NeedDatabaseList = "NeedDatabaseList",

  /**
   * Neue Datenreihen sind im Status hinterlegt
   */
  SetDataRows = "SetDataRows",
  /**
   * Der Nutzer möchte mit dem KI Training beginnen
   */
  NeedKiTraining = "NeedKiTraining",
  /**
   * Eine Veränderung des Labels war erfolgreich
   */
  setLabel = "setLabel",

  NeedLeadTime = "NeedLeadTime",

}