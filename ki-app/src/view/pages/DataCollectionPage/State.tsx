import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: { text: string, id: number; }[] = [];
  languageCode: string = "de";
  leadTime: number = -1;
  usedSensorNames: string[] = [];
  dataRows?: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[] = [];
  dataPoints?: { rowId: number, sensorType: number, value: number[]; relativeTime: number; }[] = [];
}