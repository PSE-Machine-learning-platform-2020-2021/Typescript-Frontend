import { IState } from "../State";
import { States } from "../State";

export class State implements IState {
  currentState: States = States.NeedMessage;
  messageIDs: number[] = [];
  messages: { text: string, id: number; }[] = [];
  languageCode: string = "de";
  recordingSettings = { newDataSetName: "", usedSensorTypes: [0,], waitTime: -1, readTime: -1, availableSensorTypes: [{ sensorTypID: 0, sensorType: "", chosen: false },], };
  leadTime: number = -1;
  collectionTime: number = -1;
}

