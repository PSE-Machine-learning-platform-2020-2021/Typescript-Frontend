export class State {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  datasets: { id: string, name: string, chosen: boolean }[] = [];
  features: { name: string, chosen: boolean }[] = [];
  imputations: { name: string, chosen: boolean }[] = [];
  modeltypes: { name: string, chosen: boolean }[] = [];
  normalizations: { name: string, chosen: boolean }[] = [];

}


export enum States {
  NeedMessage,
  NeedData,
  GotData,
  ChangePage,
  NeedParameter,
  StartTrain
}
