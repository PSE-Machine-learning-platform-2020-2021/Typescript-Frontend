import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messages: { text: string, id: number; }[] = [];

  dataSetMetas?: { dataSetID: number; dataSetName: string; }[];
  trainingParameter?: {
    dataSets: number[],
    imputator: string,
    classifier: string,
    scaler: string,
    features: string[]
    trainingDataPercentage?: number, // optional
    slidingWindowSize?: number,      // optional
    slidingWindowStep?: number;        // optional
  } = { dataSets: [], imputator: "", classifier: '', scaler: '', features: [] };
}

