export class State {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  emails: { id: string, address: string, chosen: boolean }[] = [];

}


export enum States {
  NeedMessage,
  NeedData,
  GotData,
  ChangePage,
  Download,
  Send
}
