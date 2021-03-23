import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  languageCode: string = "de";
  messages: { text: string, id: number; }[] = [];

  dataSetMetas?: { dataSetID: number; dataSetName: string; }[] = [];
  currentDataSet?: { dataSetID: number; rows: { sensorType: number; datapoint: { value: number[]; relativeTime: number; }[]; }[]; }[] = [];
  //testDataSet?: { dataSetID: number; rows: { sensorType: number; datapoint: { value: number[]; relativeTime: number; }[]; }[]; }[] = [];
}
