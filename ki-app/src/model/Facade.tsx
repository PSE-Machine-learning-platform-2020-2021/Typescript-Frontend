import { DeliveryFormat } from "./DeliveryFormat";
import { ExplorerConnector } from "./ExplorerConnector";
import { Language } from "./Language";
import { Sensor } from "./Sensor";
import { Admin, Dataminer, User } from "./User";

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

/**
 * Die Facade stellt alle interaktionen mit dem Model zur Verfügung
 */
class Facade {
  private language: Language; //Alle Nachrichten, in der geladenen Sprache
  private explorerConnector: ExplorerConnector; //Die Verbindung zur Datenbank
  private admin?: Admin; //Falls ein Admin angemeldet ist der Admin, oder die Daten von einem Admin für den Datenerfasser
  private user?: User; //Der Benutzer, entweder Datenerfasser oder AIModelUser


  /**
   * Erstellt die Facade
   * @param languageCode der Sprachcode von der Sprache, die geladen werden soll
   */
  constructor(languageCode: string) {
    this.explorerConnector = new ExplorerConnector();
    this.language = new Language(this.explorerConnector.loadLanguage(languageCode));

  }

  /**
   * Erstellt ein Datensatz
   * @param sensorTypes muss der Bezeichnung von einem Sensor des Gerätetypes übereinstimmen
   * @param dataSetName Name des Datensatzes
   * @returns true, wenn der Datensatz erstellt wurde. Dies ist der Fall, wenn ein Benutzer existiert welcher in einer Session ist und alle Sensortypen existieren.
   */
  createDataSet(sensorTypes: string[], dataSetName: string): boolean {
    if (this.user != null && this.user instanceof Dataminer && this.admin != null) {
      let dataRowSensors: Sensor[] = this.user.getDeviceSensors(sensorTypes);
      if (dataRowSensors.length > 0) {
        let dataSetID: number = this.explorerConnector.createDataSet(this.getSessionID(), sensorTypes, this.user.getName(), dataSetName);
        return this.admin.createDataSet(dataRowSensors, dataSetID, dataSetName);
      }
    }
    return false;
  }

  /**
   * Sendet den Datenpunkt an die Datenbank
   * @param dataRowID die ID der aktuellen Datenreihe des eingelesenen Datenpunkts
   * @param value der SensorWert
   * @param relativeTime die relative Zeit zum Aufnahmestart in Millisekunden
   * @return true, wenn der Datenpunkt erfolgreich an die Datenbank gesendet wurde
   */
  sendDataPoint(dataRowID: number, value: number, relativeTime: number): boolean {
    if (this.admin != null) {
      let dataSetID: number = this.admin.getCurrentDataSetID();
      return this.explorerConnector.sendDataPoint(this.getSessionID(), dataSetID, dataRowID, value, relativeTime);
    }
    return false;
  }

  /**
   * Liest für den aktuellen Datensatz den Sensor aus von der Datenreihe mit der übergebenen ID
   * @param dataRowID die DatenreihenID
   */
  readDataPoint(dataRowID: number): { dataPoint?: { value: number, relativeTime: number; } {
    if (this.admin != null) {
      return this.admin.readDataPoint(dataRowID);
    }
    return {};
  }

  /**
   * Lädt aus der Datenbank das Projekt mit der übergebenen ID, hierfür muss der Admin angemeldet sein
   * @param projectID die Projekt ID
   * @returns true, wenn das Projekt erfolgreich geladen wurde dies tritt nur ein, wenn eine Verbindung zur Datenbank besteht,
   *          die Projekt ID existiert und der Admin dafür angemeldet ist
   */
  loadProject(projectID: number): boolean {
    if (this.admin != null) {
      let adminEmail: string = this.admin.getEmail();
      this.admin.loadProject(this.explorerConnector.loadProject(adminEmail, projectID));
    }

  }



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
