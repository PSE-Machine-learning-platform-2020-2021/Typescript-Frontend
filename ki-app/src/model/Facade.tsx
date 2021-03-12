import { DeliveryFormat } from "./DeliveryFormat";
import { DatabaseConnector } from "./DatabaseConnector";
import { Language } from "./Language";
import { Admin, Dataminer, AIModelUser, User } from "./User";
import { AIBuilder } from "./AIBuilder";
import { AIDistributor } from "./AIDistributor";
import { AccelerometerData, GyroscopeData, SensorData } from "./SensorData";
import { isBreakStatement } from "typescript";

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
export class Facade {
  private language: Language; //Alle Nachrichten, in der geladenen Sprache
  private dbCon: DatabaseConnector; //Die Verbindung zur Datenbank
  private user?: User; //Der Benutzer, entweder Admin, Datenerfasser oder AIModelUser


  /**
   * Erstellt die Facade
   * @param languageCode der Sprachcode von der Sprache, die geladen werden soll
   */
  constructor(languageCode: string) {
    this.dbCon = new DatabaseConnector();
    this.language = new Language(this.dbCon.loadLanguage({ languageCode }));
  }

  /**
   * Erstellt ein Datensatz
   * @param sensorTypeID muss der Sensor Typ ID von einem Sensor des Gerätes übereinstimmen
   * @param dataSetName Name des Datensatzes
   * @returns true, wenn der Datensatz erstellt wurde. Dies ist der Fall, wenn ein Benutzer existiert welcher in einer Session ist und alle Sensortypen existieren.
   */
  async createDataSet(sensorTypeID: number[], dataSetName: string, datarowNames?: string[]): Promise<boolean> {
    if (this.user != null) {
      let sessionID: number = this.getSessionID();
      if (sessionID >= 0) {
        let projectID: number = this.user.getCurrentProjectID();
        let userID: number = this.user.getID();
        let dataRow: { sensorID: number, datarowName?: string; }[] = [];
        for (let i = 0; i < sensorTypeID.length; i++) {
          let sensorID = sensorTypeID[i];
          if (datarowNames != null && datarowNames.length >= i) {
            dataRow.push({ sensorID, datarowName: datarowNames[i] });
          } else {
            dataRow.push({ sensorID });
          }
        }
        let dataSetID: number = await this.dbCon.createDataSet({ sessionID, projectID, userID, dataSetName, dataRow });
        if (dataSetID >= 0) {
          ///////////////////////////////DUMMY
          var sensoren: SensorData[] = [];
          for (let i = 0; i < sensorTypeID.length; i++) {
            switch (sensorTypeID[i]) {
              case 2:
                sensoren.push(new AccelerometerData(-1, "", ""));
                break;
              case 3:
                sensoren.push(new GyroscopeData(-1, "", ""));
                break;
            }
          }
          return this.user.createDataSet(sensoren, dataSetID, dataSetName);
        }
      }
    }
    return false;
  }

  /**
   * Sendet den Datenpunkt an die Datenbank ////////////////////////////////////////////////////////////////////////////////////////////Daten noch in Model speichern
   * @param dataRowID die ID der aktuellen Datenreihe des eingelesenen Datenpunkts
   * @param value der SensorWert
   * @param relativeTime die relative Zeit zum Aufnahmestart in Millisekunden
   * @return true, wenn der Datenpunkt erfolgreich an die Datenbank gesendet wurde
   */
  async sendDataPoint(dataRowID: number, datapoint: { value: number[], relativeTime: number; }): Promise<boolean> {
    if (this.user != null) {
      let sessionID: number = this.getSessionID();
      let userID: number = this.user.getID();
      let dataSetID: number = this.user.getCurrentDataSetID();
      this.user.addDatapoint(dataRowID, datapoint);
      return this.dbCon.sendDataPoint({ sessionID, userID, dataSetID, dataRowID, datapoint });
    }
    return false;
  }

  /**
   * Lädt aus der Datenbank das Projekt mit der übergebenen ID, hierfür muss der Admin angemeldet sein
   * @param projectID die Projekt ID oder keine falls das aktuelle Projekt neu geladen werden soll
   * @returns true, wenn das Projekt erfolgreich geladen wurde dies tritt nur ein, wenn eine Verbindung zur Datenbank besteht,
   *          die Projekt ID existiert und der Admin dafür angemeldet ist
   */
  async loadProject(projectID?: number): Promise<boolean> {
    if (this.user != null && this.user instanceof Admin) {
      if (projectID == null) {
        projectID = this.user?.getCurrentProjectID();
      }
      let adminEmail: string = this.user.getEmail();
      let userID: number = this.user.getID();
      return this.user.loadProject(await this.dbCon.loadProject({ userID, adminEmail, projectID }));
    }
    return false;
  }

  /**
   * Lädt vom aktuell angemeldeten Admin von seinen Projekten den Namen und die die Projekt ID
   * @returns Von allen Projekten des Admins Projekt ID und Projektname
   */
  async getProjectMetas(): Promise<{ projectID: number, projectName: string, AIModelID: number[]; }[]> {
    if (this.user != null) {
      let userID: number = this.user.getID();
      return await this.dbCon.getProjectMetas({ userID, adminEmail: this.getAdminEmail() });
    }
    return [];
  }

  /**
   * Gibt vom aktuellen Projekt von allen Datensätzen die Datensatz ID und der Datensatz Name zurück
   */
  getDataSetMetas(): { dataSetID: number, dataSetName: string; }[] {
    if (this.user != null) {
      return this.user.getDataSetMetas();
    }
    return [];
  }

  /**
   * Gibt die Session ID des aktuellen Projekts zurück, -1 falls kein aktuelles Projekt existiert
   */
  getSessionID(): number {
    if (this.user != null) {
      return this.user.getSessionID();
    }
    return -1;
  }

  /**
   * Gibt vom aktuellen Projekt die Datenreihen der Datensatz ID zurück und setzt diesen Datensatz als aktuellen Datensatz
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getDataRows(dataSetID: number): { dataRows?: { sensorType: number, value: number[], relativeTime: number; }[][]; } {
    if (this.user != null) {
      return this.user.getDataRows(dataSetID);
    }
    return {};
  }

  /**
   * Gibt vom aktuellen Projekt die Datenreihen des aktuellen Datensatzes zurück
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getCurrentDataRows(): { dataRows?: { sensorType: number, value: number[], relativeTime: number; }[][]; } {
    if (this.user != null) {
      return this.user.getCurrentDataRows();
    }
    return {};
  }

  /**
   * Gibt aus der geladenen Sprache die Nachrichten die über die IDs angegeben werden
   * @param messageID alle IDs, von denen die Sprachnachricht geladen werden soll
   * @returns alle Nachrichten, in der gleichen Reihenfolge wie angefordert
   */
  getMessage(messageID: number[]): Promise<{ messageID: number, message: string; }[]> {
    return this.language.getMessage(messageID);
  }

  /**
   * Gibt die auswählbaren Sensoren als ID mit ihrer Art in der Passenden Sprache zurück
   */
  async getAvailableSensors(): Promise<{ sensorTypID: number, sensorType: string; }[]> {
    if (this.user != null) {
      var sensors: { sensorTypID: number, sensorType: string; }[] = [];
      let message: { messageID: number, message: string; }[] = await this.language.getMessage(this.user.getAvailableSensors());
      for (let i = 0; i < message.length; i++) {
        sensors.push({ sensorTypID: message[i].messageID, sensorType: message[i].message });
      }
      return sensors;
    }
    return [];
  }

  /**
   * Lädt die Sprache aus der Datenbank mit dem übergebenen Sprachcode
   * @param languageCode Sprachcode
   * @returns true, falls die Sprache erfolgreich geladen wurde
   */
  async setLanguage(languageCode: string): Promise<boolean> {
    if (languageCode !== await this.language.getLanguageCode()) {
      return this.language.setLanguagePromise(this.dbCon.loadLanguage({ languageCode }));
    }
    return true;
  }

  /**
   * Gibt von allen in der Datenbank verfügbaren Sprachen den Sprachcode sowie den Sprachennamen zurück
   */
  getLanguageMetas(): Promise<{ languageCode: number, languageName: string; }[]> {
    return this.dbCon.getLanguageMetas();
  };

  /**
   * Gibt die Email vom Admin zurück, diese kann leer sein falls kein Admin angemeldet ist
   */
  getAdminEmail(): string {
    if (this.user instanceof Admin) {
      return this.user.getEmail();
    }
    return "";
  }

  /**
   * Löscht den Datensatz mit der übergebenen Datensatz ID
   * @param dataSetID die Datensatz ID
   * @returns true, wenn das löschen erfolgreich ist
   */
  async deleteDataSet(dataSetID: number): Promise<boolean> {
    if (this.user != null) {
      let projectID: number = this.user.deleteDataSet(dataSetID);
      if (projectID >= 0) {
        let adminEmail: string = this.getAdminEmail();
        let userID = this.user.getID();
        return this.dbCon.deleteDataSet({ userID, adminEmail, projectID, dataSetID });
      }
    }
    return false;
  }


  //wann Device erstellen ??? + constructor in User anpassen mit neuem Device parameter 
  async registerAdmin(adminName: string, adminEmail: string, password: string): Promise<boolean> {
    //TODO Device
    let device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; } = { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] };
    let IDs: { adminID: number, device: { deviceID: number, sensorID: number[]; }; } = await this.dbCon.registerAdmin({ adminName, adminEmail, password, device });
    if (IDs.adminID >= 0) {
      this.user = new Admin(IDs.adminID, IDs.device.deviceID, adminName, adminEmail);
      return true;
    }
    return false;
  }

  async registerDataminer(dataminerName: string, sessionID: number): Promise<boolean> {
    //TODO Device
    let device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; } = { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] };
    let dataminer: { dataminerID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: number; }; } = await this.dbCon.registerDataminer({ dataminerName, sessionID, device });
    if (dataminer.dataminerID >= 0 && dataminer.device.deviceID >= 0) {
      this.user = new Dataminer(dataminer.dataminerID, dataminer.device.deviceID, dataminerName);
      this.user.loadProject(dataminer.project);
      return true;
    }
    return false;
  }

  /**
   * 
   * @param aiModelUserName 
   */
  async registerAIModelUser(aiModelUserName: string, modelID: number): Promise<boolean> {
    //TODO Device
    let device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; } = { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] };
    let aiModelUser: { aiModelUserID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: -1; }; } = await this.dbCon.registerAIModelUser({ aiModelUserName, modelID, device });
    if (aiModelUser.aiModelUserID >= 0 && aiModelUser.device.deviceID >= 0) {
      this.user = new AIModelUser(aiModelUser.aiModelUserID, aiModelUser.device.deviceID, aiModelUserName);
      this.user.loadProject(aiModelUser.project);
      return true;
    }
    return false;
  }

  //TODO Device
  async loginAdmin(adminEmail: string, password: string): Promise<boolean> {
    if (this.user == null) {
      let adminData: { admin: { adminID: number, deviceID: number, adminName: string, email: string, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }; } = await this.dbCon.loginAdmin({ adminEmail, password });
      if (adminData.admin != null && adminData.admin.adminID !== -1) {
        let admin = adminData.admin;
        this.user = new Admin(admin.adminID, admin.deviceID, admin.adminName, admin.email, admin.device);
        return true;
      }
    }
    return false;
  }

  /* eventuell implementieren
    logoutAdmin(): boolean {
      if (this.user != null) {
        let logout = this.dbCon.logoutAdmin(this.getAdminEmail());
        if (logout) {
          delete this.user;
        } else {
          return false;
        }
      }
      return true;
    }
    */

  async createProject(projectName: string): Promise<boolean> {
    if (this.user instanceof Admin) {
      let userID = this.user.getID();
      let adminEmail = this.getAdminEmail();
      let project: { projectID: number, sessionID: number; } = await this.dbCon.createProject({ userID, adminEmail, projectName });
      return this.user.createProject(project.projectID, project.sessionID, projectName);
    }
    return false;
  }

  async createLabel(span: { start: number, end: number; }, labelName: string): Promise<number> {
    if (this.user != null) {
      let sessionID: number = this.getSessionID();
      let userID: number = this.user.getID();
      let datasetID: number = this.user.getCurrentDataSetID();
      let labelID: number = await this.dbCon.createLabel({ sessionID, userID, datasetID, label: { span, labelName } });
      if (labelID >= 0) {
        let created: boolean = this.user.createLabel(labelID, span, labelName);
        if (created) {
          return labelID;
        }
      }
    }
    return -1;
  }

  async setLabel(labelID: number, span: { start: number, end: number; }, labelName?: string): Promise<boolean> {
    if (this.user != null) {
      let setted: boolean = this.user.setLabel(labelID, span, labelName);
      if (setted) {
        let sessionID: number = this.getSessionID();
        let userID: number = this.user.getID();
        let datasetID: number = this.user.getCurrentDataSetID();
        return this.dbCon.setLabel({ sessionID, userID, datasetID, label: { labelID, span, labelName } });
      }
    }
    return false;
  }

  async deleteLabel(labelID: number): Promise<boolean> {
    if (this.user != null) {
      let deleted: boolean = this.user.deleteLabel(labelID);
      if (deleted) {
        let sessionID: number = this.getSessionID();
        let userID: number = this.user.getID();
        let dataSetID: number = this.user.getCurrentDataSetID();
        return this.dbCon.deleteLabel({ sessionID, userID, dataSetID, labelID });
      }
    }
    return false;
  }


  getLabels(): { labels?: { name: string, id: number, start: number, end: number; }[]; } {
    if (this.user != null) {
      return this.user.getLabels();
    }
    return {};
  }

  classify(aiId: number, dataSetId: number, callBack: <R = unknown>(prediction: string | object) => R): void {
    let aiBuilder = new AIBuilder(aiId);
    aiBuilder.classify(dataSetId, callBack);
  };

  getAIModel(id: number, format: DeliveryFormat): object {
    let aiDist = new AIDistributor(id, format);
    return aiDist.getAIModel();
  }

  applyModel(trainingParameter: { dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[], trainingDataPercentage?: number, slidingWindowSize?: number, slidingWindowStep?: number; }): void {
    let aiBuilder = new AIBuilder(-1);
    aiBuilder.applyModel(trainingParameter);
  }

}