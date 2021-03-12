import { DeviceData } from "./DeviceData";
import { Project } from "./Project";
import { SensorData } from "./SensorData";

/**
 * Die Vorlage für alle existierenden Benutzer
 */
export abstract class User {
  protected id: number; //Die eindeutige User ID
  protected name: string; //Der Name des Users
  protected device: DeviceData; //Das Benutzergerät des Benutzers
  protected currentProject?: Project;

  /**
   * Erstellt einen Benutzer
   * @param id eindeutige Benutzer ID
   * @param name Name des Benutzer
   */
  constructor(id: number, device: DeviceData, name?: string) {
    this.id = id;
    this.device = device;
    if (name != null) {
      this.name = name;
    } else {
      this.name = this.device.getName();
    }
  }

  /**
   * Gibt vom aktuellen Projekt die aktuelle Datensatz ID zurück, falls diese nicht existiert wird -1 zurück gegeben.
   */
  getCurrentDataSetID(): number {
    if (this.currentProject != null) {
      return this.currentProject.getCurrentDataSetID();
    } else {
      return -1;
    }
  }

  getCurrentProjectID(): number {
    if (this.currentProject != null) {
      return this.currentProject.getID();
    }
    return -1;
  }

  addDatapoint(dataRowID: number, datapoint: { value: number[], relativeTime: number; }): boolean {
    if (this.currentProject != null) {
      return this.currentProject.addDatapoint(dataRowID, datapoint);
    }
    return false;

  }

  /**
   * Gibt vom aktuellen Projekt die Datenreihen der Datensatz ID zurück und setzt diesen Datensatz als aktuellen Datensatz
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getDataRows(dataSetID: number): { dataRows?: { sensorType: number, value: number[], relativeTime: number; }[][]; } {
    if (this.currentProject != null) {
      return this.currentProject.getDataRows(dataSetID);
    } else {
      return {};
    }
  }

  /**
   * Gibt vom aktuellen Projekt die Datenreihen des aktuellen Datensatzes zurück
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getCurrentDataRows(): { dataRows?: { sensorType: number, value: number[], relativeTime: number; }[][]; } {
    if (this.currentProject != null) {
      return this.currentProject.getCurrentDataRows();
    } else {
      return {};
    }
  }

  /**
   * Gibt die Session ID des aktuellen Projekts zurück, -1 falls kein aktuelles Projekt existiert
   */
  getSessionID(): number {
    if (this.currentProject != null) {
      return this.currentProject.getSessionID();
    } else {
      return -1;
    }
  }

  /**
     * Erstellt für das aktuelle Projekt einen neuen Datensatz und setzt diesen als aktuellen Datensatz.
     * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden
     * @param dataSetID die eindeutige Datensatz ID
     * @param dataSetName der Datensatznamen
     * @param generateDate die Erstellungszeit von dem Datensatz
     * @returns false, falls kein aktuelles Prokekt existiert
     */
  createDataSet(dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate?: number): boolean {
    if (this.currentProject != null) {
      this.currentProject.createDataSet(dataRowSensors, dataSetID, dataSetName, generateDate);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Löscht vom aktuellen Projekt den Datensatz, mit der übergebenen Datensatz ID
   * @param dataSetID die Datensatz ID
   * @returns false, falls der Datensatz mit der ID nicht existiert oder kein aktuelles Projekt existiert
   */
  deleteDataSet(dataSetID: number): number {
    if (this.currentProject != null) {
      let datasetExist: boolean = this.currentProject.deleteDataSet(dataSetID);
      if (datasetExist) {
        return this.currentProject.getID();
      }
    }
    return -1;
  }

  /**
   * Erstellt für das aktuelle Projekt und dem aktuellen Datensatz ein Label mit den übergebeben Parametern
   * @param labelID Ist die eindeutige Label ID des Labels.
   * @param start Ist die Startzeit des Labels.
   * @param end Ist die Endzeit des Labels.
   * @returns false, falls kein aktueller Datensatz existiert oder die LabelID für diesen Datensatz nicht eindeutig ist
   */
  createLabel(labelID: number, span: { start: number, end: number; }, labelName: string): boolean {
    if (this.currentProject != null) {
      return this.currentProject.createLabel(labelID, span, labelName);
    } else {
      return false;
    }
  }

  /**
   * Setzt beim aktuellen Datensatz dem Label mit der LabelID die neu übergebenen Daten
   * @param labelID 
   * @param start startzeit des Labels in Millisekunden
   * @param end endzeit des Labels in Millisekunden
   */
  setLabel(labelID: number, span: { start: number, end: number; }, labelName?: string): boolean {
    if (this.currentProject != null) {
      return this.currentProject.setLabel(labelID, span, labelName);
    }
    return false;
  }

  /**
   * Löscht von dem aktuellen Projekt und dem aktuellen Datensatz das Label mit der Label ID
   * @param labelID die Label ID
   * @returns false, falls kein aktueller Datensatz existiert oder kein Label mit der Label ID existiert
   */
  deleteLabel(labelID: number): boolean {
    if (this.currentProject != null) {
      return this.currentProject.deleteLabel(labelID);
    } else {
      return false;
    }
  }

  /**
   * Gibt alle Daten von allen Labeln vom aktuellen Datensatz zurück.
   * @returns leer, falls kein aktueller Datensatz existiert
   */
  getLabels(): { labels?: { name: string, id: number, start: number, end: number; }[]; } {
    if (this.currentProject != null) {
      return this.currentProject.getLabels();
    }
    return {};
  }

  /**
  * Lädt ein bestehendes Projekt in das Model
  * @param project die Projektdaten
  * @returns false, falls die Projekt ID schon existiert
  */
  abstract loadProject(project: {
    projectID: number, sessionID: number, projectName: string, projectData?: {
      aiModelID?: number[],
      dataSet?: {
        dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number,
        dataRows: {
          dataRowID: number, recordingStart: number,
          dataRow: { value: number[], relativeTime: number; }[];
        }[],
        label: { name: string, labelID: number, start: number, end: number; }[];
      }[];
    };
  }): boolean;

  /**
   * Gibt alle Sensoren aus, die das Benutzergerät und das Programm unterstützt
   */
  getDeviceSensors(sensorTypeID: number[]): SensorData[] {
    return this.device.getSensors(sensorTypeID);
  }

  /**
   * Gibt die SensorTypID der auswählbaren Sensoren zurück
   */
  getAvailableSensors(): number[] {
    return this.device.getAvailableSensors();
  }

  /**
   * Gibt von allen Datensätzen vom aktuellen Projekt Informationen zurück
   * @returns dataSetID ist die DatensatzID und dataSetName ist der Datensatzname
   */
  getDataSetMetas(): { dataSetID: number, dataSetName: string; }[] {
    if (this.currentProject != null) {
      return this.currentProject.getDataSetMetas();
    } else {
      return [];
    }
  }

  /**
   * Setzt einen neuen Benutzernamen
   * @param name der neue Benutzername
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Gibt den Benutzernamen zurück
   */
  getName(): string {
    return this.name;
  }

  /**
   * Setzt ein neues Benutzergerät
   * @param device das Benutzergerät
   */
  setDevice(device: DeviceData) {
    this.device = device;
  }

  /**
   * Gibt falls ein Benutzergerät verfügbar ist dieses zurück
   */
  getDevice(): { device?: DeviceData; } {
    return { device: this.device };
  }

  /**
   * Gibt die Benutzer ID zurück
   */
  getID(): number {
    return this.id;
  }
}

/**
 * Die Klasse Admin dient für einen Benutzer mit einem Account
 */
export class Admin extends User {
  private email: string; //Die eindeutige Admin Email
  private project: Project[] = []; //Alle Projekte, die zu dem Admin gehören

  /**
   * Zum erstellen eines Admins
   * @param adminID die Admin ID
   * @param deviceID die Geräte ID des Admins
   * @param adminName der Name des Admins
   * @param email die Emailadresse des Admins
   */
  constructor(adminID: number, deviceID: number, adminName: string, email: string);

  /**
   * Für die Implementierung eines Bestehenden Admins
   * @param adminID die Admin ID
   * @param deviceID die Geräte ID
   * @param adminName der Admin Name
   * @param email die Emailadresse des Admins
   * @param device das Gerät des Admins
   */
  constructor(adminID: number, deviceID: number, adminName: string, email: string,
    device: { deviceID?: number, deviceName: string, deviceType: string, firmware: string, generation: string, MACADRESS: string, sensorInformation: { sensorTypeID: number, sensorName: string, sensorUniqueID: number; }[]; });
  ////////////////////////////////////////TODO

  constructor(adminID: number, deviceID: number, adminName: string, email: string,
    device?: { MACADRESS: string, deviceName: string, firmware: string, generation: string, deviceType: string; }) {
    super(adminID, DeviceData.loadDevice(deviceID, device), adminName);
    this.email = email;
  }

  /**
   * Implementiert die abstrakte Methode von User
   */
  loadProject(project: {
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
  }): boolean {
    var id = this.existProject(project.projectID);
    var newProject: Project = new Project(project.projectID, project.sessionID, project.projectName, project.projectData);
    this.currentProject = newProject;
    if (id == -1) {
      this.project.push(newProject);
    } else {
      this.project[id] = newProject;
    }
    return true;
  }

  /**
   * Fügt ein neues Projekt mit den übergebenen Parametern hinzu und setzt dieses Projekt als aktuelles Projekt
   * @param projectID die Projekt ID, diese muss für den Admin eindeutig sein
   * @param sessionID die Session ID, diese muss global eindeutig sein
   * @param projectName der Name des Projektes
   * @returns Bei angabe einer Project ID, die schon existiert wird false zurück gegeben
   */
  createProject(projectID: number, sessionID: number, projectName: string): boolean {
    if (this.existProject(projectID) === -1) {
      var newproject: Project = new Project(projectID, sessionID, projectName);
      this.project.push(newproject);
      this.currentProject = newproject;
      return true;
    } else {
      return false;
    }
  }

  /**
   * 
   * @param projectID 
   * @returns -1 falls das Projekt nicht existiert oder die Array Position des Projekts
   */
  private existProject(projectID: number): number {
    for (let i = 0; i < this.project.length; i++) {
      if (this.project[i].getID() == projectID) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Gibt die Admin Emailadresse zurück
   */
  getEmail(): string {
    return this.email;
  }

  getProjects(): Project[] {
    return this.project;
  }
}

/**
 * Dataminer ist die Klasse, um Datensammler mit ihren Geräte Sensoren zu spreichern
 */
export class Dataminer extends User {
  /**
   * Erstellt einen Datensammler
   * @param id die Benutzer ID
   * @param name der Benutzername
   * @param deviceID die Geräte ID
   */
  constructor(id: number, deviceID: number, name?: string) {
    super(id, DeviceData.loadDevice(deviceID), name);
  }

  /**
   * Implementiert die abstrakte Methode von User
   */
  loadProject(project: {
    projectID: number, sessionID: number, projectName: string, projectData?: {
      aiModelID?: number[],
      dataSet?: {
        dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number,
        dataRows: {
          dataRowID: number, recordingStart: number,
          dataRow: { value: number[], relativeTime: number; }[];
        }[],
        label: { name: string, labelID: number, start: number, end: number; }[];
      }[];
    };
  }): boolean {

    this.currentProject = new Project(project.projectID, project.sessionID, project.projectName, project.projectData);
    return true;
  }
}

/**
 * AIModelUser ist die Klasse, um KI-Modell Benutzer zu speichern
 */
export class AIModelUser extends User {
  /**
   * Erstellt einen KI-Modell Benutzer, wenn Name "" gesetzt ist und eine Geräte ID gesetzt ist wird als Name der Geräte Name gewählt
   * @param id die eindeutige Benutzer ID
   * @param name der Benutzername
   * @param deviceID die Geräte ID
   */
  constructor(id: number, deviceID: number, name?: string) {
    super(id, DeviceData.loadDevice(deviceID), name);
  }
  /**
   * Implementiert die abstrakte Methode von User
   */
  loadProject(project: {
    projectID: number, sessionID: number, projectName: string, projectData?: {
      aiModelID?: number[],
      dataSet?: {
        dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number,
        dataRows: {
          dataRowID: number, recordingStart: number,
          dataRow: { value: number[], relativeTime: number; }[];
        }[],
        label: { name: string, labelID: number, start: number, end: number; }[];
      }[];
    };
  }): boolean {

    this.currentProject = new Project(project.projectID, project.sessionID, project.projectName, project.projectData);
    return true;
  }
}