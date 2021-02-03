import { DataRow } from "./DataRow"
import { Accelerometer, Sensor } from "./Sensor"

/**
 * 
 */
class Project {
    private id:number
    private name:string
    //constructor(project:object) {}
    constructor(projectID:number, sessionID:number, projectName:string) {
    }
    getName():string {}
    deleteDataSet(dataSetID:number):Boolean {}
    getID():number {}
    createDataSet(dataRowSensors:Sensor[], dataSetID:number, generateDate:number, dataSetName:string):void {}
    getDataSetID():number {}
    readDataPoint(dataRowID:number):object {}
    getDataSetMeta():object {}
    getDataRows(dataSetID):number[][][] {}
    getSessionID():number {}
    setLabel(labelID:number, start:number, end:number):Boolean {}
    getLabel():object[] {}
  } export {Project}