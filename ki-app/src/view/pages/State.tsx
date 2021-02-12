import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

export interface IState {
  currentState: States;
  languageCode: string;
  messages: { text: string, id: number; }[];
  //Anzeige aller Projekte eines nutzers
  projectData?: { projectID: number, projectName: string, AIModelExist: boolean; }[];
  // Das Projekt welches in der view ausgewählt wurde
  currentProject?: { projectID: number, projectName: string, AIModels: string[]; };
  adminData?: { name: string, email: string, password: string; };
  //minerData?:
  aiUserData?: { name: string, result: string; };
  labels?: { labelID: number, start: number, end: number; }[];
  sessionID?: string;
  //aiParameter?: 
  dataPoints?: { dataRowID: number, value: number; }[];
  dataRows?: { dataSetID: number, data: number[][][]; };
  dataSets?: { sensorTypes: string[], dataSetName: string; }[];
  qr?: QRCode;
  recordingSettings?: { newDataSetName: string, usedSensorTypes: string[], readTime: number, waitTime: number; };
}

export enum States {
  NeedMessage,
  /**
   * Wechsel zur Startseite
   */
  ChangeToStart,
  ChangeToFinish,
  NeedQR,
  SetLanguage,
  /**
   * Fehler für alle zu ladenen sachen
   */
  LoadError,
  Login,
  /**
     * Update aller Daten welche auf der Seite angezeigt werden, zum Beispiel Projekt Daten für die Projekt liste.
     */
  updateData,
  NewProjekt,
  LoadModel,
  LoginFail,
  StartDataRead,
  ChangeToRefferring,
  ClassifyResult,
  NeedDataRows,
  ChangeLabel,
  DeleteDataLabel,
  NewLabel
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