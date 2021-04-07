import { SensorData } from "./SensorData";

//Die Schnittstelle zur Datenbank.
export class DatabaseConnector {
  private static readonly databasePHPURL: string = "/src/database/index.php";
  private static lastProjectUpdate: number = 0;

  /**
   * Gibt Name und Code jeder verfügbaren Sprache zurück
   */
  async getLanguageMetas(): Promise<{ languageCode: number, languageName: string; }[]> {
    const result: { languageCode: number, languageName: string; }[] = await this.sendRequest("get_language_metas");
    return result;
  }

  /**
   * Läd die Sprache mit dem gegebenen Sprachcode, falls dieser in der Datenbank verfügbar ist
   * @param languageCode Sprachcode
   * @returns die Sprache
   */
  async loadLanguage(requestData: { languageCode: string; }): Promise<string[]> {
    const result: string[] = await this.sendRequest("load_language", requestData);
    return result;
  }

  //Erzeugt ein neues Projekt und setzt dieses als das momentan benutzte Projekt. Der Parameter projectName beinhaltet den Namen des neuen Projektes.
  /**
   * Erzeugt ein neues Projekt in der Datenbank
   * @param userID von dem Admin, der das Projekt erstellt
   * @param adminEmail zur Sicherheit, muss zur ID übereinstimmen
   * @param projectName der Name des neuen Projekts (Projekte dürfen nicht gleich heißen wie ein bestehendes Projekt)
   * @returns ProjektID und die SessionID, falls das Projekt nicht erstellt werden konnte beides -1
   */
  async createProject(requestData: { userID: number, adminEmail: string, projectName: string; }): Promise<{ projectID: number, sessionID: number; }> {
    const result: { projectID: number, sessionID: number; } = await this.sendRequest("create_project", requestData);
    return result;
  }

  /**
   * Erzeugt einen leeren Datensatz in der Datenbank
   * @param sessionID die SessionID des Projekts (Implizit die AdminID)
   * @param projektID zur Sicherheit, muss zur SessionID übereinstimmen
   * @param userID die UserID, der Daten anlegen möchte
   * @param dataSetName der Name des Datensatzes
   * @param dataRow die zu erzeugenden Datenreihen, die sensorID muss schon existieren
   * @returns dataSetID (dataRowID ist implizit, da es die ID der Position im Array von dataRow ist (beginnend mit 0))
   *          bei fehler, -1
   */
  async createDataSet(requestData: { sessionID: number, projectID: number, userID: number, dataSetName: string, dataRow: { sensorID: number, datarowName?: string; }[]; }): Promise<number> {
    const dataSetID: number = (await this.sendRequest("create_data_set", requestData)).dataSetID;
    return dataSetID;
  }

  /**
   * Sendet den Datenpunkt mit den übergebenen Parametern
   * @param sessionID die Session ID
   * @param userID zur Sicherheit, muss zur SessionID und zur DatensatzID übereinstimmen
   * @param datSetID 
   * @param dataRowID 
   * @param datapoint 
   */
  async sendDataPoint(requestData: { sessionID: number, userID: number, dataSetID: number, dataRowID: number, datapoint: { value: number[], relativeTime: number; }; }): Promise<boolean> {
    const result: boolean = await this.sendRequest("send_data_point", requestData);
    return result;
  }

  /**
   * Sendet die Datenpunkte mit den übergebenen Parametern, falls die Verbindung abgebrochen ist um alle Datenpunkte auf einmal zu senden
   * @param sessionID die Session ID
   * @param userID zur Sicherheit, muss zur SessionID und zur DatensatzID übereinstimmen
   * @param datSetID 
   * @param dataRowID 
   * @param datapoints alle zu sendenden Datenpunkten 
   */
  async sendDataPointsAgain(requestData: { sessionID: number, userID: number, dataSetID: number, dataRowID: number, datapoints: { value: number[], relativeTime: number; }[]; }): Promise<boolean> {
    const result: boolean = await this.sendRequest("send_data_points_again", requestData);
    return result;
  }

  /**
   * Lädt das Projekt mit der ensprechenden userID und ProjektID.
   * @param userID 
   * @param adminEmail zur Sicherheit, muss zur UserID übereinstimmen
   * @param projectID 
   * @returns Gibt die Daten zurück, als Fehler werden alle IDs auf -1 gesetzt
   */
  async loadProject(requestData: { userID: number, adminEmail: string, projectID: number; }): Promise<{
    projectID: number, sessionID: number, projectName: string, projectData?: {
      aiModelID?: number[],
      dataSet: {
        dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number,
        dataRows: {
          dataRowID: number, recordingStart: number,
          dataRow: { value: number[], relativeTime: number; }[];
        }[],
        label: { name: string, labelID: number, start: number, end: number; }[];
      }[];
    };
  }> {
    const result: {
      projectID: number, sessionID: number, projectName: string, projectData?: {
        aiModelID?: number[],
        dataSet: {
          dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number,
          dataRows: {
            dataRowID: number, recordingStart: number,
            dataRow: { value: number[], relativeTime: number; }[];
          }[],
          label: { name: string, labelID: number, start: number, end: number; }[];
        }[];
      };
    } = await this.sendRequest("load_project", requestData);
    return result;
  }

  //Gibt von allen Projekten des angemeldeten Ad-mins, mit der Email adminEmail, die Projekt ID und den Projekt Namen zurück
  /**
   * Gibt von allen Projekten des Admins
   * @param userID
   * @param adminEmail zur Sicherheit, muss zur UserID übereinstimmen
   */
  async getProjectMetas(requestData: { userID: number, adminEmail: string; }): Promise<{ projectID: number, projectName: string, AIModelID: number[]; }[]> {
    const result: { projectID: number, projectName: string, AIModelID: number[]; }[] = await this.sendRequest("get_project_metas", requestData);
    return result;
  }

  /**
   * Löscht den Datensatz im Projekt welcher die angegebene ID besitzt
   * @param userID
   * @param adminEmail zur Sicherheit, muss zur UserID übereinstimmen
   * @param projectID 
   * @param dataSetID 
   * @returns ob der Datenset erfolgreich gelöscht wurde
   */
  async deleteDataSet(requestData: { userID: number, adminEmail: string, projectID: number, dataSetID: number; }): Promise<boolean> {
    const result: boolean = await this.sendRequest("delete_data_set", requestData);
    return result;
  }

  //Der Parameter adminName bestimmt den Namen des Projektleiters, email bestimmt die E-Mail des Projektleiters und password bestimmt das Passwort des Projektleiters.
  /**
   * Registriert einen neuen Projektleiter. 
   * @param adminName 
   * @param adminEmail 
   * @param password 
   * @param device 
   * @returns Gibt die Daten zurück, als Fehler werden alle IDs auf -1 gesetzt
   */
  async registerAdmin(requestData: { adminName: string, adminEmail: string, password: string, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }): Promise<{ adminID: number, device: { deviceID: number, sensorID: number[]; }; }> {
    const result: { adminID: number, device: { deviceID: number, sensorID: number[]; }; } = await this.sendRequest("register_admin", requestData);
    return result;
  }

  /**
   * Registriert einen Datenerfasser.
   * @param dataminerName 
   * @param sessionID die SessionID, mit der der Datenerfasser verknüpft ist, diese bestimmt in welchem Projekt die Daten abgelegt werden
   * @param device 
   * @returns Gibt die Daten zurück, als Fehler werden alle IDs auf -1 gesetzt
   */
  async registerDataminer(requestData: { dataminerName: string, sessionID: number, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }): Promise<{ dataminerID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: number; }; }> {
    const result: { dataminerID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: number; }; } = await this.sendRequest("register_dataminer", requestData);
    return result;
  }

  /**
   * Registriert einen KI-Anwender
   * @param aiModelUserName 
   * @param modelID 
   * @param device 
   * @returns Gibt die Daten zurück, als Fehler werden alle IDs auf -1 gesetzt
   */
  async registerAIModelUser(requestData: { aiModelUserName: string, modelID: number, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }): Promise<{ aiModelUserID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: -1; }; }> {
    const result: { aiModelUserID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: -1; }; } = await this.sendRequest("register_ai_model_user", requestData);
    return result;
  }

  /**
   * Meldet den Admin an. 
   * @param email 
   * @param password 
   */
  async loginAdmin(requestData: { adminEmail: string, password: string; }): Promise<{ admin: { adminID: number, deviceID: number, adminName: string, email: string, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }; }> {
    const result: { admin: { adminID: number, deviceID: number, adminName: string, email: string, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }; } = await this.sendRequest("login_admin", requestData);
    return result;
  }

  /**
   * Erstellt ein Label
   * @param sessionID 
   * @param userID 
   * @param datasetID 
   * @param label 
   * @returns labelID
   */
  async createLabel(requestData: { sessionID: number, userID: number, datasetID: number, label: { span: { start: number, end: number; }, labelName: string; }; }): Promise<number> {
    const result: number = (await this.sendRequest("create_label", requestData)).labelID;
    return result;
  }

  /**
   * Setzt dem bestehenden Label neue Werte
   * @param sessionID 
   * @param userID 
   * @param datasetID 
   * @param label 
   */
  async setLabel(requestData: { sessionID: number, userID: number, datasetID: number, label: { labelID: number, span: { start?: number, end?: number; }, labelName?: string; }; }): Promise<boolean> {
    const result: boolean = await this.sendRequest("set_label", requestData);
    return result;
  }

  /**
   * Löscht das Label
   * @param sessionID 
   * @param userID 
   * @param datasetID 
   * @param labelID 
   */
  async deleteLabel(requestData: { sessionID: number, userID: number, dataSetID: number, labelID: number; }): Promise<boolean> {
    const result: boolean = await this.sendRequest("delete_label", requestData);
    return result;
  }

  private async sendRequest(action: string, requestData?: object): Promise<any> {
    const headers = { 'Content-Type': 'application/json' };
    var obj;
    await fetch(DatabaseConnector.databasePHPURL + "?action=" + action, { method: 'POST', headers, body: JSON.stringify(requestData) }).then(response => response.json()).then(data => { obj = data; }).catch(function () {
      obj = false;
    });
    return obj;
  }
}