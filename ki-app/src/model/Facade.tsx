import { DeliveryFormat } from "./DeliveryFormat";
import { DatabaseConnector } from "./DatabaseConnector";
import { Language, LanguageMessages } from "./Language";
import { Admin, Dataminer, AIModelUser, User } from "./User";
import { AIBuilder } from "./AIBuilder";
import { AIDistributor } from "./AIDistributor";
import { AIController } from "../controller/AIController";
import { IDataRowST, IDataRowSTRID } from "./DataRow";
import { ILabel } from "./Label";
import { ISpan } from "./TimeSpan";
import { IDevice } from "./DeviceData";
import { IDataPoint } from "./DataPoint";

interface FacadeInterface {
  createDataSet(sensorTypeID: number[], dataSetName: string, datarowNames?: string[]): Promise<number>;
  sendDataPoint(dataRowID: number, datapoint: IDataPoint): Promise<boolean>;
  sendDataPointsAgain(): Promise<boolean>;
  loadProject(projectID?: number): Promise<boolean>;
  getProjectMetas(): Promise<{ projectID: number, projectName: string, AIModelID: number[]; }[]>;
  getDataSetMetas(): { dataSetID: number, dataSetName: string; }[];
  getSessionID(): number;
  getDataRows(dataSetID: number): { dataRows: IDataRowST[]; };
  getCurrentDataRows(): { dataRows: IDataRowST[]; };
  getMessages(): LanguageMessages | null;
  setLanguage(languageCode: string): Promise<boolean>;
  getLanguageMetas(): Promise<{ languageCode: number, languageName: string; }[]>;
  getAdminEmail(): string;
  deleteDataSet(dataSetID: number): Promise<boolean>;
  registerAdmin(adminName: string, adminEmail: string, password: string): Promise<boolean>;
  registerDataminer(dataminerName: string, sessionID: number): Promise<boolean>;
  registerAIModelUser(aiModelUserName: string, modelID: number): Promise<boolean>;
  loginAdmin(adminEmail: string, password: string): Promise<boolean>;
  createProject(projectName: string): Promise<boolean>;
  createLabel(span: ISpan, labelName: string): Promise<number>;
  setLabel(labelID: number, span: ISpan, labelName?: string): Promise<boolean>;
  deleteLabel(labelID: number): Promise<boolean>;
  getLabels(): { labels: ILabel[]; };
  classify(aiId: number, dataSetId: number, callBack: <R = unknown>(prediction: string | object) => R): void;
  getAIModel(id: number, format: DeliveryFormat): object;
  sendAIModel(model: number, ...recipients: string[]): boolean;
  applyModel(dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[],
    trainingDataPercentage: number, slidingWindowSize: number, slidingWindowStep: number): void;
} export type { FacadeInterface };

/**
 * Die Facade stellt alle interaktionen mit dem Model zur Verfügung
 */
export class Facade {
  private language?: Language; //Alle Nachrichten, in der geladenen Sprache
  private dbCon: DatabaseConnector; //Die Verbindung zur Datenbank
  private user?: User; //Der Benutzer, entweder Admin, Datenerfasser oder AIModelUser


  /**
   * Erstellt die Facade
   * @param languageCode der Sprachcode von der Sprache, die geladen werden soll
   */
  constructor(languageCode: string) {
    this.dbCon = new DatabaseConnector();
    this.dbCon.loadLanguage({ languageCode }).then((language: LanguageMessages) => { this.language = new Language(language); });
  }

  /**
   * Erstellt ein Datensatz
   * @param sensorTypeID muss der Sensor Typ ID von einem Sensor des Gerätes übereinstimmen
   * @param dataSetName Name des Datensatzes
   * @returns true, wenn der Datensatz erstellt wurde. 
   * Dies ist der Fall, wenn ein Benutzer existiert welcher in einer Session ist und alle Sensortypen existieren.
   */
  async createDataSet(sensorTypeID: number[], dataSetName: string, datarowNames?: string[]): Promise<number> {
    if (this.user === undefined) {
      return -2;
    }
    let sessionID: number = this.getSessionID();
    if (sessionID === undefined) {
      sessionID = 0;
    }
    if (sessionID > 0 || this.user.getName() === AIController.AI_MODEL_USER_NAME) {
      let projectID: number = this.user.getCurrentProjectID();
      if (projectID === undefined) {
        projectID = 0;
      }
      let userID: number = this.user.getID();
      let dataRow: { sensorID: number, datarowName?: string; }[] = [];
      for (let i = 0; i < sensorTypeID.length; i++) {
        let sensorID = sensorTypeID[i];
        if (datarowNames != null && datarowNames.length >= i) {
          dataRow.push({ sensorID, datarowName: datarowNames[i] });
        }
        else {
          dataRow.push({ sensorID });
        }
      }
      let dataSetID: number = await this.dbCon.createDataSet({ sessionID, projectID, userID, dataSetName, dataRow });
      if (dataSetID <= 0) {
        return -3;
      }
      var dataRows: IDataRowSTRID[] = [];
      for (let i = 0; i < sensorTypeID.length; i++) {
        dataRows.push({ sensorType: sensorTypeID[i], dataRow: [], dataRowID: i });
      }
      if (this.user.createDataSet(dataSetID, dataSetName, new Date().getMilliseconds(), dataRows) || this.user.getName() === AIController.AI_MODEL_USER_NAME) {
        return dataSetID;
      }
      return -4;
    }
    return -5;
  }

  /**
   * Sendet den Datenpunkt an die Datenbank und speichert den Punkt lokal
   * @param dataRowID die ID der aktuellen Datenreihe des eingelesenen Datenpunkts
   * @param value der SensorWert
   * @param relativeTime die relative Zeit zum Aufnahmestart in Millisekunden
   * @return true, wenn der Datenpunkt erfolgreich an die Datenbank gesendet wurde
   */
  async sendDataPoint(dataRowID: number, datapoint: IDataPoint[]): Promise<boolean> {
    if (this.user !== undefined) {
      let sessionID: number = this.getSessionID();
      let userID: number = this.user.getID();
      let dataSetID: number = this.user.getCurrentDataSetID();
      this.user.addDatapoint(dataRowID, datapoint);
      return this.dbCon.sendDataPoint({ sessionID, userID, dataSetID, dataRowID, datapoint });
    }
    return false;
  }

  /**
   * Gibt die Email des Admins zurück
   * @returns Email des Admins oder "undefined" wenn kein Admin angmeldet ist
   */
  getAdminMail(): string {
    if (this.user != null && this.user instanceof Admin) {
      return (this.user as Admin).getEmail();
    }
    return "error";
  }

  /**
     * Sendet den aktuell bereits aufgenommenen Datensatz an die Datenbank
     * Dafür da, falls die Verbindung verloren ging und der Datensatz neu hochgeladen werden muss
     * @return true, wenn der Datensatz erfolgreich an die Datenbank gesendet wurde
     */
  async sendDataPointsAgain(): Promise<boolean> {
    if (this.user !== undefined) {
      let sessionID: number = this.getSessionID();
      let userID: number = this.user.getID();
      let dataSetID: number = this.user.getCurrentDataSetID();
      let rows = this.user.getCurrentDataRows();
      for (let i = 0; i < rows.dataRows.length; i++) {
        var result = await this.dbCon.sendDataPointsAgain({ sessionID, userID, dataSetID, dataRowID: i, datapoints: rows.dataRows[i].datapoint });
        if (!result) {
          return false;
        }
      }
      return true;
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
   * Lädt vom aktuell angemeldeten Admin von seinen Projekten den Namen, die Projekt ID und die AIModelIDs
   * @returns Von allen Projekten des Admins Projekt ID und Projektname und die AIModelIDs
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
    if (this.user !== undefined) {
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
  getDataRows(dataSetID: number): { dataRows: IDataRowST[]; } {
    if (this.user != null) {
      return this.user.getDataRows(dataSetID);
    }
    return { dataRows: [] };
  }

  /**
   * Gibt vom aktuellen Projekt die Datenreihen des aktuellen Datensatzes zurück
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getCurrentDataRows(): { dataRows: IDataRowST[]; } {
    if (this.user != null) {
      return this.user.getCurrentDataRows();
    }
    return { dataRows: [] };
  }

  /**
   * Gibt aus der geladenen Sprache die Nachrichten die über die IDs angegeben werden
   * @param messageID alle IDs, von denen die Sprachnachricht geladen werden soll
   * @returns alle Nachrichten, in der gleichen Reihenfolge wie angefordert
   */
  getMessages(): LanguageMessages | null {
    if (this.language != null) {
      return this.language.getMessage();
    }
    return null;
  }

  /**
   * Lädt die Sprache aus der Datenbank mit dem übergebenen Sprachcode
   * @param languageCode Sprachcode
   * @returns true, falls die Sprache erfolgreich geladen wurde
   */
  async setLanguage(languageCode: string): Promise<boolean> {
    if (this.language == null) {
      const language: LanguageMessages = await this.dbCon.loadLanguage({ languageCode });
      this.language = new Language(language);
      return true;
    } else if (languageCode !== this.language.getLanguageCode()) {
      const language: LanguageMessages = await this.dbCon.loadLanguage({ languageCode });
      return this.language.setLanguage(language);
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
    if (this.user != null && this.user.deleteDataSet(dataSetID)) {
      let projectID: number = this.user.getCurrentProjectID();
      if (projectID >= 0) {
        let adminEmail: string = this.getAdminEmail();
        let userID = this.user.getID();
        return this.dbCon.deleteDataSet({ userID, adminEmail, projectID, dataSetID });
      }
    }
    return false;
  }

  async registerAdmin(adminName: string, adminEmail: string, password: string): Promise<boolean> {
    //TODO Device
    let device: IDevice = { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] };
    let IDs: {
      adminID: number, device: { deviceID: number, sensorID: number[]; };
    } = await this.dbCon.registerAdmin({ adminName, adminEmail, password, device });
    if (IDs.adminID >= 0) {
      this.user = new Admin(IDs.adminID, IDs.device.deviceID, adminName, adminEmail);
      return true;
    }
    return false;
  }

  async registerDataminer(dataminerName: string, sessionID: number): Promise<boolean> {
    //TODO Device
    let device: IDevice = { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] };
    let dataminer:
      {
        dataminerID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: number; };
      } = await this.dbCon.registerDataminer({ dataminerName, sessionID, device });
    if (dataminer.dataminerID >= 0 && dataminer.device.deviceID >= 0) {
      this.user = new Dataminer(dataminer.dataminerID, dataminer.device.deviceID, dataminerName);
      this.user.loadProject(dataminer.project);
      return true;
    }
    return false;
  }

  async registerAIModelUser(aiModelUserName: string, modelID: number): Promise<boolean> {
    //TODO Device
    let device: IDevice = { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] };
    let aiModelUser: {
      aiModelUserID: number, device: { deviceID: number, sensorID: number[]; },
      project: { projectID: number, projectName: string, sessionID: number; };
    } = await this.dbCon.registerAIModelUser({ aiModelUserName, modelID, device });
    if (aiModelUser.aiModelUserID >= 0 && aiModelUser.device.deviceID >= 0) {
      this.user = new AIModelUser(aiModelUser.aiModelUserID, aiModelUser.device.deviceID, aiModelUserName);
      this.user.loadProject(aiModelUser.project);
      return true;
    }
    return false;
  }

  async loginAdmin(adminEmail: string, password: string): Promise<boolean> {
    if (this.user == null) {
      let adminData: {
        admin: { adminID: number, deviceID: number, adminName: string, email: string, device: IDevice; };
      } = await this.dbCon.loginAdmin({ adminEmail, password });
      if (adminData.admin != null && adminData.admin.adminID !== -1) {
        let admin = adminData.admin;
        this.user = new Admin(admin.adminID, admin.deviceID, admin.adminName, admin.email, admin.device);
        return true;
      }
    }
    return false;
  }

  /**
   * Erstellt für den angemeldeten Admin ein neues Projekt
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

  /**
   * Erstellt ein neues Label für den aktuellen Datensatz
   * @param span Start und Endzeit des Zeitfensters in Sekunden
   */
  async createLabel(span: ISpan, labelName: string): Promise<number> {
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

  /**
   * Überschreibt ein bestehendes Label mit den übergebenen Parametern
   * @param labelID die LabelID, die schon exisiteren muss und überschrieben wird
   * @param span Start und Endzeit des Zeitfensters in Sekunden
   */
  async setLabel(labelID: number, span: ISpan, labelName?: string): Promise<boolean> {
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

  /**
   * Löscht das bestehende Label mit der LabelID
   * @param labelID die LabelID, die schon exisitert
   */
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

  /**
   * Gibt die geladenen Labels zurück von dem aktuellen Datensatz
   * @returns 
   */
  getLabels(): { labels: ILabel[]; } {
    if (this.user != null) {
      return this.user.getLabels();
    }
    return { labels: [] };
  }

  classify(aiId: number, dataSetId: number, callBack: <R = unknown>(prediction: string | object) => R): void {
    let aiBuilder = new AIBuilder(aiId);
    aiBuilder.classify(dataSetId, callBack);
  };

  getAIModel(id: number, format: DeliveryFormat): object {
    let aiDist = new AIDistributor(id, format);
    return aiDist.getAIModel();
  }

  /**
   * Erzeugt eine Anfrage an den Server, an jede übergebene E-Mail-Adresse eine E-Mail zu versenden,
   * die einen Link zur Startseite des mit übergebenen KI-Modells enthält.
   * 
   * @param model      - Die ID des zu verteilenden KI-Modells.
   * @param recipients - Die Liste der E-Mail-Adressen, an die das KI-Modell verteilt werden soll.
   * @returns True, wenn die Anfrage an den Server erfolgreich durchgeführt werden konnte, False sonst.
   */
  sendAIModel(model: number, recipients: string[]): boolean {
    const distributor = new AIDistributor(model, DeliveryFormat.WEB_APP);
    return distributor.sendAIModel(recipients);
  }

  /**
   * Diese Methode erzeugt eine Anfrage an den Server, die ihn damit beauftragt, ein KI-Modell mit den 
   * angegebenen Parametern zu erzeugen und zu trainieren. 
   * 
   * @param dataSets               - Die zum Training zu verwendenden Datensätze.
   * @param imputator              - Der zur Vervollständigung der Daten zu verwendende Imputer.
   * @param classifier             - Der Klassifizierer, der das Herzstück des zu erstellenden KI-Modells darstellt.
   * @param scaler                 - Der Scaler, der die Daten für den Klassifizierer aufbereitet.
   * @param features               - Die Merkmale, die aus den gegebenen Datensätzen herausgearbeitet werden sollen.
   * @param trainingDataPercentage - Optional. Der Anteil der Daten, der zum Training des KI-Modells verwendet werden soll. 
   *                                 Standardmäßig sind das alle übergebenen Daten, da wir noch kein serverseitiges Testen der KI-Modell-Qualität durchführen.
   * @param slidingWindowSize      - Optional. Die Größe der Datenblöcke, die jeweils verwertet werden. Standardwert ist 128 Datenpunkte.
   * @param slidingWindowStep      - Optional. Die Schrittweite von einem Datenblock zum nächsten. Standardwert ist 64 Datenpunkte. 
   */
  applyModel(dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[],
    trainingDataPercentage: number = 1, slidingWindowSize: number = 128, slidingWindowStep: number = 64): void {
    const aiBuilder = new AIBuilder(-1);
    const projectID = this.user!.getCurrentProjectID();
    aiBuilder.applyModel(dataSets, imputator, classifier, scaler, features, projectID, trainingDataPercentage, slidingWindowSize, slidingWindowStep);
  }
}