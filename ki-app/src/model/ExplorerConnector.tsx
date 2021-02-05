//Diese Klasse ist die Schnittstelle zu “Explorer”.
class ExplorerConnector {
  /*Hier wird in die Datenbank ein neues Gerät hinzugefügt, hierfür wird die Firmware, die Generation sowie die unterstützten Sensoren in einer Liste.
   *Zurückgegeben wird die eindeutige Device ID aus der Datenbank.
   */
  registerDevice(firmware: string, generation: string, sensorNamelist: string[]): number { }

  //Gibt Name und Code jeder verfügbaren Sprache zurück
  getLanguageMetas(): object[] { }

  //Lade die Sprache mit dem gegebenen Code.
  loadLanguage(languageCode: string): string[] { }

  //Erzeugt ein neues Projekt und setzt dieses als das momentan benutzte Projekt. Der Parameter projectName beinhaltet den Namen des neuen Projektes.
  createProject(adminEmail: string, projectName: string): object { }

  //Erzeugt einen Datensatz mit übergebenen Parametern
  createDataSet(sessionID: number, sensorTypes: string, dataminerName: string, dataSetName: string): number { }

  //Sendet den Datenpunkt mit den übergebenen Parametern
  sendDataPoint(sessionID: number, datSetID: number, dataRowID: number, value: number, relativeTime: number): boolean { }

  //Lädt das Projekt mit der ensprechenden Email und ProjektID.
  loadProject(adminEmail: string, projectID: number): object { }

  //Gibt von allen Projekten des angemeldeten Ad-mins, mit der Email adminEmail, die Projekt ID und den Projekt Namen zurück
  getProjectMetas(adminEmail: string): string { }

  //Löscht den Datensatz im Projekt welcher die angegebene ID besitzt. Der Datensatz wird im Programm und auf der Explorer-Datenbank gelöscht.
  deleteDataSet(email: string, projectID: number, dataSetID: number): boolean { }

  //Registriert einen neuen Projektleiter. 
  //Der Parameter adminName bestimmt den Namen des Projektleiters, email bestimmt die E-Mail des Projektleiters und password bestimmt das Passwort des Projektleiters.
  registerAdmin(adminName: string, email: string, password: string): number { }

  //Registriert einen Datenerfasser.
  //Der Parameter dataminerName bestimmt den Namen des Datenerfassers und die sessionID die Session mit der der Datenerfasser verknüpft ist, diese bestimmt in welchem Projekt die Daten abgelegt werden.
  registerDataminer(dataminerName: string, sessionID: number): object { }

  //Registriert und erstellt einen KI-Anwender dabei stellt der Parameter aiModelUserName den Namen des KI-Anwender da.
  registerAIModelUser(aiModelUserName: string): number[] { }

  //Meldet den Admin an. 
  //Der Parameter emailenthält die E-Mail des Admins und der Parameter password enthält das Passwort welches zu demBenutzerkonto des Projektleiters passt. 
  //Zurück werden Admin Daten gegeben sowie die User ID desAdmins
  loginAdmin(email: string, password: string): object { }

  //Meldet den momentan angemeldeten Admin ab
  logoutAdmin(): boolean { }

  //Sendet das Label label an die Datenbank mit den Parametern. 
  sendLabel(sessionID: number, datasetID: number, label: object): boolean { }
} export { ExplorerConnector };