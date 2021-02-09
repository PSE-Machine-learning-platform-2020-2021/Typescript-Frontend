import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

export interface IState {
  currentState: States;
  languageCode: string;
  messages: { text: string, id: number; }[];
  projectData?: { projectID: number; projectName: string; aiIds: number[]; };
  //modelData?:
  adminData?: { name: string, email: string, password: string; };
  //minerData?:
  //aiUserData?:
  labels?: { labelID: number, start: number, end: number; }[];
  sessionID?: string;
  //aiParameter?: 
  dataPoints?: { dataRowID: number, value: number; }[];
  dataRows?: { dataSetID: number, data: number[][][]; };
  dataSets?: { sensorTypes: string[], dataSetName: string; }[];
  qr?: QRCode;
}

export enum States {
  NeedMessage,
  /**
   * Wechsel zur Startseite
   */
  ChangetoStart,
  NeedQR,
  SetLanguage,
  LoadError,
  Login,
  NewProjekt,
  LoadModel,
  LoginFail
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