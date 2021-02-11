export enum Status {
  NeedData,
  GotData,
  ChangePage
}

export class State {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  qrSvg: any = "todo";
  labels: { id: number, name: string, chosen: false, start: number, end: number; }[] = [];
}


export enum States {
  NeedMessage,
  NeedDiagram,
  GotDiagram,
  ChangePage
}