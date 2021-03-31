import { States, IState } from "../../view/pages/State";

export class State implements IState {
  currentState = States.NeedMessage;
  languageCode = "de-de";
  messages: { text: string, id: number; }[] = [ { text: "NONE", id: -1 } ];
  //Anzeige aller Projekte eines nutzers
  //ReferringPage
  projectData?: { projectID: number; projectName: string; AIModelID: number[]; }[];
  // Das Projekt welches in der view ausgewählt wurde
  currentProject?: { projectID: number, projectName: string, choosenAIModelID: number; };
  adminData?: { name: string, email: string, password: string; };
  aiUserData?: { name: string, result: string; };
  currentLabel?: { labelID: number, start: number, end: number; name: string; };
  sessionID?: string;
  dataPoints?: { rowId: number, sensorType: number, value: number[]; relativeTime: number; }[];
  dataRows?: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[];
  //DataSet?: {dataSetID: number, rows: {sensorType: number, value: number[]; relativeTime: number; }[] }[]
  dataSetMetas?: { dataSetID: number; dataSetName: string; }[];
  currentDataSets?: { dataSetID: number, rows: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[]; }[];
  qr?: string;
  diagramSvg?: string;
  recordingSettings?: { newDataSetName: string, usedSensorTypes: number[], readTime: number, waitTime: number, availableSensorTypes: { sensorTypID: number; sensorType: string; chosen: boolean; }[]; } = { newDataSetName: "null", usedSensorTypes: [ -1 ], readTime: -1, waitTime: -1, availableSensorTypes: [] };
  leadTime?: number;
  usedSensorNames?: string[];
  trainingParameter?: {
    dataSets: number[],
    imputator: string,
    classifier: string,
    scaler: string,
    features: string[];
    trainingDataPercentage?: number, // optional
    slidingWindowSize?: number,      // optional
    slidingWindowStep?: number;        // optional
  };
  islogedIn?: boolean = false;

  chosenEmails?: string[];
  wait?: Promise<any>;
  link?: string;
  //Beispiel fuer Visu
  //testDataSet?: { dataSetID: number; rows: { sensorType: number; datapoint: { value: number[]; relativeTime: number; }[]; }[]; }[];
}