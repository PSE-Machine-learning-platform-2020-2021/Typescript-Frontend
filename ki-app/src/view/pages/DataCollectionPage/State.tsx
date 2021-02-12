export class State {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: string[] = [];
  countdownNumber: number = 0;
  diagramSvg: any = "todo";
}


export enum States {
  NeedMessage,
  NeedCounter,
  CountFinish,
  NeedDiagram,
  ChangePage
}