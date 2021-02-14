import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: { text: string, id: number; }[] = [];
  languageCode: string = "de";
  leadTime: number = -1;
  collectionTime: number = -1;
  chosenSensors: string[] = [];
}

