//Die Schnittstelle zur Datenbank.
export class DatabaseConnector {

  /**
   * Hier wird in die Datenbank ein neues Gerät hinzugefügt
   * @returns Die Eindeutige DeviceID des Gerätes
   */
  registerDevice(userID: number, deviceName: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorName: string, sensorUniqueID: number; }[]): number {

    return -1;
  }

  //Gibt Name und Code jeder verfügbaren Sprache zurück
  getLanguageMetas(): { languageCode: number, languageName: string; }[] {
    return [];
  }

  //Lade die Sprache mit dem gegebenen Code.
  loadLanguage(languageCode: string): string[] {
    return [];
  }

  //Erzeugt ein neues Projekt und setzt dieses als das momentan benutzte Projekt. Der Parameter projectName beinhaltet den Namen des neuen Projektes.
  createProject(adminEmail: string, projectName: string): { projectID: number, sessionID: number; } {
    return { projectID: -1, sessionID: -1 };
  }

  //Erzeugt einen Datensatz mit übergebenen Parametern
  createDataSet(sessionID: number, sensorTypeID: number[], dataminerName: string, dataSetName: string): number {
    return -1;
  }

  //Sendet den Datenpunkt mit den übergebenen Parametern
  sendDataPoint(sessionID: number, datSetID: number, dataRowID: number, value: number, relativeTime: number): boolean {
    return true;
  }

  //Lädt das Projekt mit der ensprechenden Email und ProjektID.
  loadProject(adminEmail: string, projectID: number): {
    projectID: number, sessionID: number, projectName: string, aiModelID: number[],
    dataSet: {
      dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
      dataRows: {
        dataRowID: number, recordingStart: number,
        dataRow: { value: number, relativeTime: number; }[];
      }[],
      label: { name: string, labelID: number, start: number, end: number; }[];
    }[];
  } {
    return {
      projectID: -1, sessionID: -1, projectName: "", aiModelID: [],
      dataSet: []
    };
  }

  //Gibt von allen Projekten des angemeldeten Ad-mins, mit der Email adminEmail, die Projekt ID und den Projekt Namen zurück
  getProjectMetas(adminEmail: string): { projectID: number, projectName: string, AIModelID: number[]; }[] {
    return [];
  }

  //Löscht den Datensatz im Projekt welcher die angegebene ID besitzt. Der Datensatz wird im Programm und auf der Explorer-Datenbank gelöscht.
  deleteDataSet(email: string, projectID: number, dataSetID: number): boolean {
    return true;
  }

  //Registriert einen neuen Projektleiter. 
  //Der Parameter adminName bestimmt den Namen des Projektleiters, email bestimmt die E-Mail des Projektleiters und password bestimmt das Passwort des Projektleiters.
  registerAdmin(adminName: string, email: string, password: string): { adminID: number, deviceID: number; } {
    return { adminID: -1, deviceID: -1 };
  }

  //Registriert einen Datenerfasser.
  //Der Parameter dataminerName bestimmt den Namen des Datenerfassers und die sessionID die Session mit der der Datenerfasser verknüpft ist, diese bestimmt in welchem Projekt die Daten abgelegt werden.
  registerDataminer(dataminerName: string, sessionID: number): { dataminerID: number, deviceID: number, project: { projectID: number, projectName: string, sessionID: number; }; } {
    return {
      dataminerID: -1, deviceID: -1, project: { projectID: -1, projectName: "", sessionID: -1 }
    };
  }

  //Registriert und erstellt einen KI-Anwender dabei stellt der Parameter aiModelUserName den Namen des KI-Anwender da.
  //SessionID -1 ???
  registerAIModelUser(aiModelUserName: string, modelID: number): {
    aiModelUserID: number, deviceID: number, project:
    { projectID: number, projectName: string, sessionID: -1; };
  } {
    return {
      aiModelUserID: -1, deviceID: -1, project:
        { projectID: -1, projectName: "", sessionID: -1 }
    };
  }

  //Meldet den Admin an. 
  //Der Parameter emailenthält die E-Mail des Admins und der Parameter password enthält das Passwort welches zu demBenutzerkonto des Projektleiters passt. 
  //Zurück werden Admin Daten gegeben sowie die User ID desAdmins
  loginAdmin(email: string, password: string): {
    admin: {
      adminID: number, deviceID: number, adminName: string, email: string,
      device: { MACADRESS: string, deviceName: string, firmware: string, generation: string, deviceType: string; };
    };
  } {
    return {
      admin: {
        adminID: -1, deviceID: -1, adminName: "", email: "",
        device: { MACADRESS: "", deviceName: "", firmware: "", generation: "", deviceType: "" }
      }
    };
  }

  //Meldet den momentan angemeldeten Admin ab
  logoutAdmin(email: string): boolean {
    return true;
  }

  //Sendet das Label label an die Datenbank mit den Parametern. 
  sendLabel(sessionID: number, datasetID: number, label: object): boolean {
    return true;
  }
}


////////////////////IDs als Parameter immer auf >= 0 prüfen, da -1 eine Fehlermeldung ist. Sowie Admin Email auf inhalt prüfen, "" ist nicht angemeldet
////////////////////Und überall prüfen, dass id < 0 nicht möglich ist