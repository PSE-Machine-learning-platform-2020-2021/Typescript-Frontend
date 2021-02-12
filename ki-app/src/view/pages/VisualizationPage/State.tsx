import eximage1 from '../../images/exImage1.svg'
export class State {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  imageSrc: string = eximage1
}


export enum States {
  NeedMessage,
  NeedData,
  GotData,
  ChangePage,
  Finish
}
