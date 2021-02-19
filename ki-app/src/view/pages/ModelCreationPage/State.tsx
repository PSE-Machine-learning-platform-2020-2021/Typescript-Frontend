import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messages: { text: string, id: number; }[] = [];

  dataSets?: { dataSetID: number; dataSetName: string; }[];
  trainingParameter?: {
    sensors: number[],
    dataSets: number[],
    classifier: string,
    scaler: string,
    features: string[],
    trainingDataPercentage?: number, // optional
    slidingWindowSize?: number,      // optional
    slidingWindowStep?: number;        // optional
  };
}

