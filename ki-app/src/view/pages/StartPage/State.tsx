export class State {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: string[] = [];
  availableSensors: string[] = [];
  chosenSensors: string[] = [];
}


export enum States {
  NeedMessage,
  NeedData, //available sensors
  GotData,

}