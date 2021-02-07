import { Device, Smartphone } from "./Device";
import { Project } from "./Project";
import { Sensor } from "./Sensor";

/**
 * Die Vorlage für alle existierenden Benutzer
 */
abstract class User {
  protected id: number; //Die eindeutige User ID
  protected name: string; //Der Name des Users
  protected abstract device?: Device; //Das Benutzergerät des Benutzers

  /**
   * Erstellt einen Benutzer
   * @param id eindeutige Benutzer ID
   * @param name Name des Benutzer
   */
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
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
  setDevice(device: Device) {
    this.device = device;
  }

  /**
   * Gibt falls ein Benutzergerät verfügbar ist dieses zurück
   */
  getDevice(): { device?: Device; } {
    return { device: this.device };
  }

  /**
   * Gibt die Benutzer ID zurück
   */
  getID(): number {
    return this.id;
  }
} export { User };

/**
 * Die Klasse Admin dient für einen Benutzer mit einem Account
 */
class Admin extends User {
  protected device: Device; //Das Benutzergeräts des Admins
  private email: string; //Die eindeutige Admin Email
  private project: Project[] = new Array(); //Alle Projekte, die zu dem Admin gehören
  private currentProject?: Project;

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
    device: { MACADRESS: string, deviceName: string, firmware: string, generation: string, deviceType: string; });

  constructor(adminID: number, deviceID: number, adminName: string, email: string,
    device?: { MACADRESS: string, deviceName: string, firmware: string, generation: string, deviceType: string; }) {
    super(adminID, adminName);
    this.email = email;
    this.device = Device.loadDevice(deviceID, device);
  }

  /**
   * Lädt ein bestehendes Projekt in das Model
   * @param project das Projekt des Admins
   * @returns false, falls die Projekt ID schon existiert
   */
  loadProject(project: {
    projectID: number, sessionID: number, projectName: string, aiModelID: number[],
    dataSet: {
      dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
      dataRows: {
        dataRowID: number, recordingStart: number,
        dataRow: { value: number, relativeTime: number; }[];
      }[],
      label: { name: string, labelID: number, start: number, end: number; }[];
    }[];
  }) {
    if (!this.existProject(project.projectID)) {
      this.project.push(new Project(project.projectID, project.sessionID, project.projectName, this, project.aiModelID, project.dataSet));
      return true;
    } else {
      return false;
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

  /**
   * Liest vom aktuellen Project und Datensatz die aktuellen Sensordaten von dem Sensor mit der Datenreihen ID
   * @param dataRowID die Datenreihen ID
   */
  readDataPoint(dataRowID: number): { dataPoint?: { value: number, relativeTime: number; }; } {
    if (this.currentProject != null) {
      return this.currentProject.readDataPoint(dataRowID);
    }
    return {};
  }

  /**
   * Fügt ein neues Projekt mit den übergebenen Parametern hinzu und setzt dieses Projekt als aktuelles Projekt
   * @param projectID die Projekt ID, diese muss für den Admin eindeutig sein
   * @param sessionID die Session ID, diese muss global eindeutig sein
   * @param projectName der Name des Projektes
   * @returns Bei angabe einer Project ID, die schon existiert wird false zurück gegeben
   */
  createProject(projectID: number, sessionID: number, projectName: string): boolean {
    if (!this.existProject(projectID)) {
      var newproject: Project = new Project(projectID, sessionID, projectName, this);
      this.project.push(newproject);
      this.currentProject = newproject;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Gibt von allen Datensätzen vom aktuellen Projekt Informationen zurück
   * @returns dataSetID ist die DatensatzID und dataSetName ist der Datensatzname
   */
  getDataSetMeta(): { dataSetID: number, dataSetName: string; }[] {
    if (this.currentProject != null) {
      return this.currentProject.getDataSetMeta();
    } else {
      return [];
    }
  }

  /**
   * Gibt vom aktuellen Projekt die Datenreihen der Datensatz ID zurück und setzt diesen Datensatz als aktuellen Datensatz
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getDataRows(dataSetID: number): { dataRows?: { value: number, relativeTime: number; }[][]; } {
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
  getCurrentDataRows(): { dataRows?: { value: number, relativeTime: number; }[][]; } {
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
   * Gibt die Admin Emailadresse zurück
   */
  getEmail(): string {
    return this.email;
  }

  /**
     * Erstellt für das aktuelle Projekt einen neuen Datensatz und setzt diesen als aktuellen Datensatz.
     * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden
     * @param dataSetID die eindeutige Datensatz ID
     * @param dataSetName der Datensatznamen
     * @param generateDate die Erstellungszeit von dem Datensatz
     * @returns false, falls kein aktuelles Prokekt existiert
     */
  createDataSet(dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate?: number): boolean {
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
  deleteDataSet(dataSetID: number): boolean {
    if (this.currentProject != null) {
      return this.currentProject.deleteDataSet(dataSetID);
    }
    return false;
  }

  /**
   * Erstellt für das aktuelle Projekt und dem aktuellen Datensatz ein Label mit den übergebeben Parametern
   * @param labelID Ist die eindeutige Label ID des Labels.
   * @param start Ist die Startzeit des Labels.
   * @param end Ist die Endzeit des Labels.
   * @returns false, falls kein aktueller Datensatz existiert oder die LabelID für diesen Datensatz nicht eindeutig ist
   */
  createLabel(labelID: number, start: number, end: number): boolean {
    if (this.currentProject != null) {
      return this.currentProject.createLabel(labelID, start, end);
    } else {
      return false;
    }
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

  private existProject(projectID: number): boolean {
    for (let i = 0; i < this.project.length; i++) {
      if (this.project[i].getID() == projectID) {
        return true;
      }
    }
    return false;
  }
} export { Admin };

/**
 * Dataminer ist die Klasse, um Datensammler mit ihren Geräte Sensoren zu spreichern
 */
class Dataminer extends User {
  protected device: Device; //Das Gerät des Datensammlers

  /**
   * Erstellt einen Datensammler
   * @param id die Benutzer ID
   * @param name der Benutzername
   * @param deviceID die Geräte ID
   */
  constructor(id: number, deviceID: number, name?: string) {
    if (name != null) {
      super(id, name);
      this.device = Device.loadDevice(deviceID);
    } else {
      let dataDevice = Device.loadDevice(deviceID);
      super(id, dataDevice.getName());
      this.device = dataDevice;
    }
  }

  /**
   * Gibt alle Sensoren aus, die das Benutzergerät und das Programm unterstützt
   */
  getDeviceSensors(sensorTypes: string[]): Sensor[] {
    return this.device.getSensors(sensorTypes);
  }
} export { Dataminer };

/**
 * AIModelUser ist die Klasse, um KI-Modell Benutzer zu speichern
 */
class AIModelUser extends User {
  protected device?: Device; //Das Gerät des KI-Modell Benutzers falls es gespeichert wird

  /**
   * Erstellt einen KI-Modell Benutzer, wenn Name "" gesetzt ist und eine Geräte ID gesetzt ist wird als Name der Geräte Name gewählt
   * @param id die eindeutige Benutzer ID
   * @param name der Benutzername
   * @param deviceID die Geräte ID
   */
  constructor(id: number, name: string, deviceID?: number) {
    super(id, name);
    if (deviceID != null) {
      this.device = Device.loadDevice(deviceID);
      if (name == "") {
        this.name = this.device.getName();
      }
    }
  }
} export { AIModelUser };