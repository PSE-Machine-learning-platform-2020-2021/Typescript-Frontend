abstract class User {
    private id:number
    private name:string
  
    constructor(id:number) {}
    setName(name:string):void {}
    getName():string {}
  } export {User}
  
  class Admin extends User {
    private email:string
    constructor(id:number, deviceID:number, adminName:string, email:string) {}
    //constructor(admin:object) {}
    getDataSetID():number {}
    readDataPoint(dataRowID:number):object {}
    existProject(projectID: number):Boolean {}
    addProject(project:object):Boolean {}
    getDataSetMeta():string[] {}
    getDataRows(dataSetID: number):number[][][] {}
    getSessionID():number {}
    getEmail():string {}
    deleteDataSet(dataSetID:number):Boolean {}
    createProject(projectID:number, sessionID:number, projectName:string) {}
    setLabel(labelID:number, start:number, end:number):Boolean {}
    getLabels():object[] {}
  } export {Admin}
  
  class Dataminer extends User {
    constructor(dataminer:object) {}
    getDeviceSensors():Sensor[] {}
  } export {Dataminer}
  
  class AIModelUser extends User {
    constructor(id:number) {}
  } export {AIModelUser}