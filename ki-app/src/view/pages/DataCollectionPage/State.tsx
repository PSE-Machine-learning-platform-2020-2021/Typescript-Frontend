export enum Status {
  NeedDiagram,
  ChangePage
}

export class State {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  loginData: string[] = [];
  projectMeta: string[] = [];
  qrSvg: any = "todo";
  NewProjectName: string = "";
  toLoadProjectID: number = 0;
}


export enum States {
  NeedMessage,
  NeedDiagram,
  GotData,
  ChangePage,
  NeedQR,
  Login,
  NewProjekt,
  LoadProject,
  LoadModel,
  SetLanguage,
  ShowQR
}