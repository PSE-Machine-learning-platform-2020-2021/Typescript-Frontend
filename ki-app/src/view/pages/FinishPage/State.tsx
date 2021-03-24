import { States } from "../State";

export class State {
  currentState: States = States.NeedMessage;
  currentLabel?: { labelID: number, start: number, end: number, name: string; }; //unbearbeitete Eingabe
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  usedSensorNames: string[] = [];
  dataRows?: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[] = [{ sensorType: 1, datapoint: [{ value: [5], relativeTime: 5 }] }];
  labels: { id: number, start: number, end: number, name: string; }[] = [];
}