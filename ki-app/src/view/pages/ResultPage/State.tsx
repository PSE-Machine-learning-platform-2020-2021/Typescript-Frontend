import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: { text: string, id: number; }[] = [];
  languageCode: string = "de";
  recordingSettings = {
    newDataSetName: "", usedSensorTypes: [ 0, ], waitTime: -1, readTime: -1,
    availableSensorTypes: [] as { sensorTypID: number, sensorType: string, chosen: boolean; }[]
  };
  leadTime: number = 3;
  collectionTime: number = 5;
  name: string = "";
  wait?: Promise<any>;
}

