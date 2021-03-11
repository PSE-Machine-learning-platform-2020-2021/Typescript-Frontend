import { States } from "../State";

export class State {
  currentState: States = States.NeedMessage;
  currentLabel?: { labelID: number, start: number, end: number, name: string; }; //unbearbeitete Eingabe
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  usedSensorNames: string[] = [];
  dataRows: { sensorType: number, value: number[]; relativeTime: number; }[][] = [];
  labels: { id: number, start: number, end: number, name: string; }[] = [];
}