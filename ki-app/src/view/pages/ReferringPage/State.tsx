import { IState } from "../State";
import { States } from "../State";
import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

export class State implements IState {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messages: { text: string, id: number; }[] = [];
  projectData?: { projectID: number; projectName: string; AIModelID: number[]; }[];
  currentProject?: { projectID: number, projectName: string, choosenAIModelID: number; };
  chosenModel?: string;
  adminData?: { name: string, email: string, password: string; };
  //minerData?:
  aiUserData?: { name: string, result: string; };
  labels?: { labelID: number, start: number, end: number; }[];
  sessionID?: string;
  //aiParameter?: 
  dataPoints?: { dataPoint?: { value: number; relativeTime: number; }; }[];
  dataRows?: { dataSetID: number, data: number[][][]; };
  dataSets?: { sensorTypes: string[], dataSetName: string; }[];
  qr?: string;
  recordingSettings?: { newDataSetName: string, usedSensorTypes: number[], availableSensorTypes: number[], readTime: number, waitTime: number; };
}
