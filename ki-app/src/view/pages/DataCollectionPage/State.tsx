import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: { text: string, id: number; }[] = [];
  languageCode: string = "de";
  leadTime: number = -1;
  usedSensorNames: string[] = [];
  dataRows?: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[] = [{ sensorType: 1, datapoint: [{ value: [5], relativeTime: 5 }] }];
  dataPoints?: { rowId: number, sensorType: number, value: number[]; relativeTime: number; }[] = [];
  recordingSettings?: { newDataSetName: string, usedSensorTypes: number[], readTime: number, waitTime: number, availableSensorTypes: { sensorTypID: number; sensorType: string; chosen: boolean; }[]; } 
  = { newDataSetName: "null", usedSensorTypes: [-1], readTime: -1, waitTime: -1, availableSensorTypes: [{ sensorTypID: -1, sensorType: "null", chosen: false }]}
}