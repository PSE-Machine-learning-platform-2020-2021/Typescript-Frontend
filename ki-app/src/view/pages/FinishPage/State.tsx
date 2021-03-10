import { States } from "../State";

export class State {
  currentState: States = States.NeedMessage;
  currentLabel?: { labelId: number, start: number, end: number, name: string; };
  languageCode: string = "de";
  messageIDs: number[] = [];
  messages: string[] = [];
  usedSensorNames: string[] = [];
  dataRows: { sensorType: number, value: number[]; relativeTime: number; }[][] = [];
  labels: { id: number, start: number, end: number, name: string; }[] = [];
}