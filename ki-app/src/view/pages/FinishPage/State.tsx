export class State {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  usedSensorNames: string[] = [];
  dataRows: { sensorType: number, value: number[]; relativeTime: number; }[][] = [];
  labels: { id: string, start: number, end: number, name: string; }[] = [];
}

export enum States {
  NeedMessage,
  NeedDiagram,
  ChangePage
}
