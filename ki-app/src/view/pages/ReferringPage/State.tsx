import { IState } from "../State";
import { States } from "../State";
import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

export class State implements IState {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messages: { text: string, id: number; }[] = [];
  projectData?: { projectID: number; projectName: string; AIModelID: number[]; }[];
  currentProject?: { projectID: number, projectName: string, choosenAIModelID: number; };
  // chosenModel?: string;
  adminData?: { name: string, email: string, password: string; };
  //minerData?:
  aiUserData?: { name: string, result: string; };
  labels?: { labelID: number, start: number, end: number; }[];
  sessionID?: string;
  //aiParameter?: 
  qr?: string;
  wait?: Promise<any>
}
