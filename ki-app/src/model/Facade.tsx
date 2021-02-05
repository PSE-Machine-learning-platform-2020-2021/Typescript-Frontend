interface FacadeInterface {
  createDataSet(sensorTypes: string[], dataSetName: string): boolean;
  sendDataPoint(dataRowID: number, value: number[]): boolean;
  readDataPoint(dataRowID: number): object;
  loadProject(projectID: number): boolean;
  getProjectMetas(): string[];
  getDataSetMeta(): string[];
  getSessionID(): number;
  getDataRows(dataSetID: number): number[][][];
  getCurrentDataRows(): { value: number, relativeTime: number; }[];
  getMessage(messageID: number): string;
  setLanguage(languageCode: string): boolean;
  getLanguageMetas(): object[];
  getEmail(): string;
  deleteDataSet(dataSetID: number): boolean;
  registerAdmin(adminName: string, email: string, password: string): boolean;
  registerDataminer(dataminerName: string, sessionID: number): boolean;
  registerAIModelUser(aiModelUserName: string): boolean;
  loginAdmin(email: string, password: string): boolean;
  logoutAdmin(): boolean;
  createProject(projectName: string): boolean;
  setLabel(labelID: number, start: number, end: number): boolean;
  createLabel(): number; //labelid von datenbank
  getLabels(): object[];
  checkLogin(): boolean;
  classify(aiId: number, dataSetId: number, callBack: Function): void;
  getAIModel(format: DeliveryFormat): object;
  applyModel(modeldata: object): void;
} export type { FacadeInterface };

class Facade {
  constructor(languageCode: string) {
  }
  createDataSet(sensorTypes: string[], dataSetName: string): boolean { }
  sendDataPoint(dataRowID: number, value: number[]): boolean { }
  readDataPoint(dataRowID: number): object { }
  loadProject(projectID: number): boolean { }
  getProjectMetas(): string[] { }
  getDataSetMeta(): string[] { }
  getSessionID(): number { }
  getDataRows(dataSetID: number): number[][][] { }
  getMessage(messageID: number): string { }
  setLanguage(languageCode: string): boolean { }
  getLanguageMetas(): object[] { }
  getEmail(): string { }
  deleteDataSet(dataSetID: number): boolean { }
  registerAdmin(adminName: string, email: string, password: string): boolean { }
  registerDataminer(dataminerName: string, sessionID: number): boolean { }
  registerAIModelUser(aiModelUserName: string): boolean { }
  loginAdmin(email: string, password: string): boolean { }
  logoutAdmin(): boolean { }
  createProject(projectName: string): boolean { }
  setLabel(labelID: number, start: number, end: number): boolean { }
  getLabels(): object[] { }
  checkLogin(): boolean { }
  classify(aiId: number, dataSetId: number, callBack: Function): void { }
  getAIModel(format: DeliveryFormat): object { }
  applyModel(modeldata: object): void { }
} export { Facade };
