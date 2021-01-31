interface FacadeInterface{
    createDataSet(sensorTypes:string[], dataSetName:string):Boolean
    sendDataPoint(dataRowID:number, value:number[]):Boolean
    readDataPoint(dataRowID:number):object
    loadProject(projectID:number):Boolean
    getProjectMetas():string[]
    getDataSetMeta():string[]
    getSessionID():number
    getDataRows(dataSetID:number):number[][][]
    getMessage(messageID:number):string
    setLanguage(languageCode:string):Boolean
    getLanguageMetas():object[]
    getEmail():string
    deleteDataSet(dataSetID:number):Boolean
    registerAdmin(adminName:string, email:string, password:string):Boolean
    registerDataminer(dataminerName:string, sessionID:number):Boolean
    registerAIModelUser(aiModelUserName:string):Boolean
    loginAdmin(email:string, password:string):Boolean
    logoutAdmin():Boolean
    createProject(projectName:string):Boolean
    setLabel(labelID:number, start:number, end:number):Boolean
    getLabels():object[]
    checkLogin():Boolean
    classify(aiId:number, dataSetId:number, callBack:Function):void
    getAIModel(format:DeliveryFormat):object
    applyModel(modeldata:object):void
  } export type {FacadeInterface}

class Facade{
    constructor(languageCode:string) {
    }
    createDataSet(sensorTypes:string[], dataSetName:string):Boolean {}
    sendDataPoint(dataRowID:number, value:number[]):Boolean {}
    readDataPoint(dataRowID:number):object {}
    loadProject(projectID:number):Boolean {}
    getProjectMetas():string[] {}
    getDataSetMeta():string[] {}
    getSessionID():number {}
    getDataRows(dataSetID:number):number[][][] {}
    getMessage(messageID:number):string {}
    setLanguage(languageCode:string):Boolean {}
    getLanguageMetas():object[] {}
    getEmail():string {}
    deleteDataSet(dataSetID:number):Boolean {}
    registerAdmin(adminName:string, email:string, password:string):Boolean {}
    registerDataminer(dataminerName:string, sessionID:number):Boolean {}
    registerAIModelUser(aiModelUserName:string):Boolean {}
    loginAdmin(email:string, password:string):Boolean {}
    logoutAdmin():Boolean {}
    createProject(projectName:string):Boolean {}
    setLabel(labelID:number, start:number, end:number):Boolean {}
    getLabels():object[] {}
    checkLogin():Boolean {}
    classify(aiId:number, dataSetId:number, callBack:Function):void {}
    getAIModel(format:DeliveryFormat):object {}
    applyModel(modeldata:object):void {}
} export {Facade}
