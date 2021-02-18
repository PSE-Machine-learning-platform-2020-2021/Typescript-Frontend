import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messages: { text: string, id: number; }[] = [];

  chosenEmails?: string[];
}
