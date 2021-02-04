import { Device, Smartphone } from "./Device";
import { Sensor } from "./Sensor";

/**
 * Die Vorlage für alle existierenden Benutzer
 */
abstract class User {
  protected id: number; //Die eindeutige User ID
  protected name: string; //Der Name des Users
  abstract device?: Device; //Das Benutzergerät des Benutzers

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

  /**
   * prüft was es für ein Gerät ist und erstellt das passende
   */
  static loadDevice(deviceID: number): Device { }
} export { User };

/**
 * Die Klasse Admin dient für einen Benutzer mit einem Account
 */
class Admin extends User {
  device: Device;
  private email: string; //Die eindeutige Admin Email

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
   * @param project die Projekte des Admins
   */
  constructor(adminID: number, deviceID: number, adminName: string, email: string,
    device: { MACADRESS: string, deviceName: string, firmware: string, generation: string; },
    project?: {
      projectID: number, sessionID: number, projectName: string, admin: Admin, aiModelID: number[],
      dataSet: {
        dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
        dataRows: { dataRowID: number, recordingStart: number, dataRow: { value: number, relativeTime: number; }[]; }[],
        label: { name: string, labelID: number, start: number, end: number; }[];
      }[];
    }[]);

  constructor(adminID: number, deviceID: number, adminName: string, email: string,
    device?: { MACADRESS: string, deviceName: string, firmware: string, generation: string; },
    project?: {
      projectID: number, sessionID: number, projectName: string, admin: Admin, aiModelID: number[],
      dataSet: {
        dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
        dataRows: { dataRowID: number, recordingStart: number, dataRow: { value: number, relativeTime: number; }[]; }[],
        label: { name: string, labelID: number, start: number, end: number; }[];
      }[];
    }[]) {
    super(adminID, adminName);

  }


  //constructor(admin:object) {}
  getDataSetID(): number { }
  readDataPoint(dataRowID: number): object { }
  existProject(projectID: number): Boolean { }
  addProject(project: object): Boolean { }
  getDataSetMeta(): string[] { }
  getDataRows(dataSetID: number): number[][][] { }
  getSessionID(): number { }
  getEmail(): string { }
  deleteDataSet(dataSetID: number): Boolean { }
  createProject(projectID: number, sessionID: number, projectName: string) { }
  setLabel(labelID: number, start: number, end: number): Boolean { }
  getLabels(): object[] { }
} export { Admin };

/**
 * Dataminer ist die Klasse, um Datensammler mit ihren Geräte Sensoren zu spreichern
 */
class Dataminer extends User {
  device: Device; //Das Gerät des Datensammlers

  /**
   * Erstellt einen Datensammler
   * @param id die Benutzer ID
   * @param name der Benutzername
   * @param deviceID die Geräte ID
   */
  constructor(id: number, deviceID: number, name?: string) {
    if (name != null) {
      super(id, name);
      this.device = User.loadDevice(deviceID);
    } else {
      let dataDevice = User.loadDevice(deviceID);
      super(id, dataDevice.getName());
      this.device = dataDevice;
    }
  }

  /**
   * Gibt alle Sensoren aus, die das Benutzergerät und das Programm unterstützt
   */
  getDeviceSensors(): Sensor[] {
    return this.device.getSensors();
  }
} export { Dataminer };

/**
 * AIModelUser ist die Klasse, um KI-Modell Benutzer zu speichern
 */
class AIModelUser extends User {
  device?: Device; //Das Gerät des KI-Modell Benutzers falls es gespeichert wird

  /**
   * Erstellt einen KI-Modell Benutzer, wenn Name "" gesetzt ist und eine Geräte ID gesetzt ist wird als Name der Geräte Name gewählt
   * @param id die eindeutige Benutzer ID
   * @param name der Benutzername
   * @param deviceID die Geräte ID
   */
  constructor(id: number, name: string, deviceID?: number) {
    super(id, name);
    if (deviceID != null) {
      this.device = User.loadDevice(deviceID);
      if (name == "") {
        this.name = this.device.getName();
      }
    }
  }
} export { AIModelUser };