import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

export interface IState {
  currentState: States;
  languageCode: string;
  messages: { text: string, id: number; }[];
  //Anzeige aller Projekte eines nutzers
  projectData?: { projectID: number, projectName: string, aiModelIDs: number[]; }[];
  // Das Projekt welches in der view ausgewählt wurde
  currentProject?: { projectID: number, projectName: string, choosenAIModelID: number; };
  adminData?: { name: string, email: string, password: string; };
  //minerData?:
  aiUserData?: { name: string, result: string; };
  labels?: { labelID: number, start: number, end: number; }[];
  sessionID?: string;
  //aiParameter?: 
  dataPoints?: { dataRowID: number, value: number; }[];
  dataRows?: { dataSetID: number, data: number[][][]; };
  dataSets?: { sensorTypes: string[], dataSetName: string; }[];
  //
  qr?: string;
  diagramSvg?: string;
  recordingSettings?: { newDataSetName: string, usedSensorTypes: number[], readTime: number, waitTime: number; };
  availableSensorTypes?: { sensorTypID: number; sensorType: string; }[];
  //Untere sind schon in recordSettings enthalten
  //chosenSensors?: string[];
  //leadtime?: number;
  //collectiontime?: number;
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
   * Model eines Projekts soll geladen werden
   */
  LoadProject,
  LoadModel,
  /**
   * Login ist gescheitert
   */
  LoginFail,
  /**
  * Login erfolgreich
  */
  loginSucess,
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
  ChangeToRefferring,

  ChangeToDataCollection,

  NeedInstantDiagram
}

/**  BEISPIEL
export class test implements IState {
  currentState: States = States.ChangePage;
  languageCode: string = "de";
  messageIDs: number[] = [0, 1];
  messages: string[] = [];
  ...
}
*/