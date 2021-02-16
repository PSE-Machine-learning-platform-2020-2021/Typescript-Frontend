//Die Schnittstelle zur Datenbank.
export class DatabaseConnector {
  private static readonly databasePHPURL: string = "database";

  /**
   * Gibt Name und Code jeder verfügbaren Sprache zurück
   */
  async getLanguageMetas(): Promise<{ languageCode: number, languageName: string; }[]> {
    const data: string = await this.sendRequest("get_language_metas");
    try {
      const result: { languageCode: number, languageName: string; }[] = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  /**
   * Läd die Sprache mit dem gegebenen Sprachcode, falls dieser in der Datenbank verfügbar ist
   * @param languageCode Sprachcode
   * @returns die Sprache
   */
  async loadLanguage(requestData: { languageCode: string; }): Promise<string[]> {
    const data: string = await this.sendRequest("loadLanguage", requestData);
    try {
      const result: string[] = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
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
    const data: string = await this.sendRequest("createProject", requestData);
    try {
      const result: { projectID: number, sessionID: number; } = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return { projectID: -1, sessionID: -1 };
    }
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
    const data: string = await this.sendRequest("createDataSet", requestData);
    try {
      const result: number = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  /**
   * Sendet den Datenpunkt mit den übergebenen Parametern
   * @param sessionID die Session ID
   * @param userID zur Sicherheit, muss zur SessionID und zur DatensatzID übereinstimmen
   * @param datSetID 
   * @param dataRowID 
   * @param datapoint 
   */
  async sendDataPoint(requestData: { sessionID: number, userID: number, dataSetID: number, dataRowID: number, datapoint: { value: number, relativeTime: number; }; }): Promise<boolean> {
    const data: string = await this.sendRequest("sendDataPoint", requestData);
    try {
      const result: boolean = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Lädt das Projekt mit der ensprechenden userID und ProjektID.
   * @param userID 
   * @param adminEmail zur Sicherheit, muss zur UserID übereinstimmen
   * @param projectID 
   * @returns Gibt die Daten zurück, als Fehler werden alle IDs auf -1 gesetzt
   */
  async loadProject(requestData: { userID: number, adminEmail: string, projectID: number; }): Promise<{
    projectID: number, sessionID: number, projectName: string, aiModelID: number[],
    dataSet: {
      dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
      dataRows: {
        dataRowID: number, recordingStart: number,
        dataRow: { value: number, relativeTime: number; }[];
      }[],
      label: { name: string, labelID: number, start: number, end: number; }[];
    }[];
  }> {
    const data: string = await this.sendRequest("loadProject", requestData);
    try {
      const result: {
        projectID: number, sessionID: number, projectName: string, aiModelID: number[],
        dataSet: {
          dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
          dataRows: {
            dataRowID: number, recordingStart: number,
            dataRow: { value: number, relativeTime: number; }[];
          }[],
          label: { name: string, labelID: number, start: number, end: number; }[];
        }[];
      } = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return {
        projectID: -1, sessionID: -1, projectName: "", aiModelID: [],
        dataSet: []
      };
    }
  }

  //Gibt von allen Projekten des angemeldeten Ad-mins, mit der Email adminEmail, die Projekt ID und den Projekt Namen zurück
  /**
   * Gibt von allen Projekten des Admins
   * @param userID
   * @param adminEmail zur Sicherheit, muss zur UserID übereinstimmen
   */
  async getProjectMetas(requestData: { userID: number, adminEmail: string; }): Promise<{ projectID: number, projectName: string, AIModelID: number[]; }[]> {
    const data: string = await this.sendRequest("getProjectMetas", requestData);
    try {
      const result: { projectID: number, projectName: string, AIModelID: number[]; }[] = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
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
    const data: string = await this.sendRequest("deleteDataSet", requestData);
    try {
      const result: boolean = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
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
    const data: string = await this.sendRequest("registerAdmin", requestData);
    try {
      const result: { adminID: number, device: { deviceID: number, sensorID: number[]; }; } = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return { adminID: -1, device: { deviceID: -1, sensorID: [] } };
    }
  }

  /**
   * Registriert einen Datenerfasser.
   * @param dataminerName 
   * @param sessionID die SessionID, mit der der Datenerfasser verknüpft ist, diese bestimmt in welchem Projekt die Daten abgelegt werden
   * @param device 
   * @returns Gibt die Daten zurück, als Fehler werden alle IDs auf -1 gesetzt
   */
  async registerDataminer(requestData: { dataminerName: string, sessionID: number, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }): Promise<{ dataminerID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: number; }; }> {
    const data: string = await this.sendRequest("registerDataminer", requestData);
    try {
      const result: { dataminerID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: number; }; } = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return {
        dataminerID: -1, device: { deviceID: -1, sensorID: [] }, project: { projectID: -1, projectName: "", sessionID: -1 }
      };
    }
  }

  /**
   * Registriert einen KI-Anwender
   * @param aiModelUserName 
   * @param modelID 
   * @param device 
   * @returns Gibt die Daten zurück, als Fehler werden alle IDs auf -1 gesetzt
   */
  async registerAIModelUser(requestData: { aiModelUserName: string, modelID: number, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }): Promise<{ aiModelUserID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: -1; }; }> {
    const data: string = await this.sendRequest("registerAIModelUser", requestData);
    try {
      const result: { aiModelUserID: number, device: { deviceID: number, sensorID: number[]; }, project: { projectID: number, projectName: string, sessionID: -1; }; } = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return { aiModelUserID: -1, device: { deviceID: -1, sensorID: [] }, project: { projectID: -1, projectName: "", sessionID: -1 } };
    }
  }

  /**
   * Meldet den Admin an. 
   * @param email 
   * @param password 
   */
  async loginAdmin(requestData: { adminEmail: string, password: string; }): Promise<{ admin: { adminID: number, deviceID: number, adminName: string, email: string, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }; }> {
    const data: string = await this.sendRequest("loginAdmin", requestData);
    try {
      const result: { admin: { adminID: number, deviceID: number, adminName: string, email: string, device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; }; }; } = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return { admin: { adminID: -1, deviceID: -1, adminName: "", email: "", device: { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] } } };
    }
  }
  /*
    //Meldet den momentan angemeldeten Admin ab
    logoutAdmin(email: string): boolean {
      return true;
    }
  */

  /**
   * Erstellt ein Label
   * @param sessionID 
   * @param userID 
   * @param datasetID 
   * @param label 
   * @returns labelID
   */
  async createLabel(requestData: { sessionID: number, userID: number, datasetID: number, label: { span: { start: number, end: number; }, labelName: string; }; }): Promise<number> {
    const data: string = await this.sendRequest("createLabel", requestData);
    try {
      const result: number = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  /**
   * Setzt dem bestehenden Label neue Werte
   * @param sessionID 
   * @param userID 
   * @param datasetID 
   * @param label 
   */
  async setLabel(requestData: { sessionID: number, userID: number, datasetID: number, label: { labelID: number, span: { start?: number, end?: number; }, labelName?: string; }; }): Promise<boolean> {
    const data: string = await this.sendRequest("setLabel", requestData);
    try {
      const result: boolean = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Löscht das Label
   * @param sessionID 
   * @param userID 
   * @param datasetID 
   * @param labelID 
   */
  async deleteLabel(requestData: { sessionID: number, userID: number, datasetID: number, labelID: number; }): Promise<boolean> {
    const data: string = await this.sendRequest("deleteLabel", requestData);
    try {
      const result: boolean = JSON.parse(data);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }

  }

  private async sendRequest(action: string, requestData?: object): Promise<string> {
    const headers = { 'Content-Type': 'application/json' };
    const response = await fetch(DatabaseConnector.databasePHPURL + "?action=" + action, { headers, body: JSON.stringify(requestData) }); //TODO body: requestDataJSON wirft Fehler
    const data = response.json();
    return data;
  }
}


////////////////////IDs als Parameter immer auf >= 0 prüfen, da -1 eine Fehlermeldung ist. Sowie Admin Email auf inhalt prüfen, "" ist nicht angemeldet
///////////////////Wird Logout Admin benötigt?

///////////////////alle Methoden in model protected?