export class State {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: string[] = [];
  chosenSensors: string[] = [];
}


export enum States {
  NeedMessage,
  ChangePage
}