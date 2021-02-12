import { AIModel } from "./AIModel";
import { DataRow } from "./DataRow";
import { DataSet } from "./DataSet";
import { Accelerometer, Sensor } from "./Sensor";
import { Session } from "./Session";
import { Admin } from "./User";

/**
 * Diese Klasse speichert alle Informationen zu einem Projekt.
 * Ein Projekt beinhaltet aufgezeichnete Datensätze (DataSet) sowie Informationen zu den Datensätzen.
 */
class Project {
  private id: number; //Die eindeutige Projekt ID
  private name: string; //Der Name des Projektes
  private session: Session; //Die Session in dem das Projekt arbeitet
  private aiModel: AIModel[] = new Array(); //Das AIModel von dem Projekt
  private dataSet: DataSet[] = new Array(); //Die Datensätze, die zu dem Projekt gehören
  private currentDataSet?: DataSet; //Aktueller Datensatz


  /**
   * Erstellt ein neues Projekt mit den angegebenen Parametern
   * @param projectID Die Projekt ID
   * @param sessionID Die global eindeutige Session ID
   * @param projectName Der Projektnamen
   * @param admin Der Admin, dem das Projekt gehört
   */
  constructor(projectID: number, sessionID: number, projectName: string, admin: Admin);

  /**
   * Eine bereits existierendes Projekt kann wie folgt in das Model geladen werden.
   * @param projectID Die Projekt ID
   * @param sessionID Die Session ID
   * @param projectName Der Projektnamen
   * @param admin Der Besitzer dieses Projekts für die Session
   * @param aiModelID Die schon existierenden AIModel IDs
   * @param dataSet Die schon existierenden Datensätze
   */
  constructor(projectID: number, sessionID: number, projectName: string, admin: Admin, aiModelID: number[],
    dataSet: {
      dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
      dataRows: {
        dataRowID: number, recordingStart: number,
        dataRow: { value: number, relativeTime: number; }[];
      }[],
      label: { name: string, labelID: number, start: number, end: number; }[];
    }[]);

  constructor(projectID: number, sessionID: number, projectName: string, admin: Admin, aiModelID?: number[],
    dataSet?: {
      dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number,
      dataRows: {
        dataRowID: number, recordingStart: number,
        dataRow: { value: number, relativeTime: number; }[];
      }[],
      label: { name: string, labelID: number, start: number, end: number; }[];
    }[]) {
    this.id = projectID;
    this.name = projectName;
    this.session = new Session(sessionID, admin);
    if (aiModelID != null) {
      for (let i = 0; i < aiModelID.length; i++) {
        this.aiModel.push(new AIModel(aiModelID[i]));
      }
    }
    if (dataSet != null) {
      for (let i = 0; i < dataSet.length; i++) {
        this.dataSet.push(new DataSet(dataSet[i].dataRowSensors, dataSet[i].dataSetID, dataSet[i].dataSetName, dataSet[i].generateDate, dataSet[i].dataRows, dataSet[i].label));
      }
    }
  }

  /**
   * Gibt den Projektnamen zurück
   */
  getName(): string {
    return this.name;
  }

  /**
   * Löscht den Datensatz mit der DatensatzID
   * @param dataSetID die Datensatz ID
   */
  deleteDataSet(dataSetID: number): boolean {
    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].getID() == dataSetID) {
        delete this.dataSet[i];
        if (this.currentDataSet != null && this.currentDataSet.getID() == dataSetID) {
          delete this.currentDataSet;
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Gibt die Projekt ID zurück.
   */
  getID(): number {
    return this.id;
  }


  /**
   * Erstellt einen neuen Datensatz und setzt diesen als aktuellen Datensatz.
   * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden
   * @param dataSetID die eindeutige Datensatz ID
   * @param dataSetName der Datensatznamen
   * @param generateDate die Erstellungszeit von dem Datensatz
   */
  createDataSet(dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate?: number): void {
    var dataSet: DataSet = new DataSet(dataRowSensors, dataSetID, dataSetName, generateDate);
    this.dataSet.push(dataSet);
    this.currentDataSet = dataSet;
  }

  /**
   * Gibt die aktuelle Datensatz ID zurück, falls diese nicht existiert wird -1 zurück gegeben
   */
  getCurrentDataSetID(): number {
    if (this.currentDataSet != null) {
      return this.currentDataSet.getID();
    }
    return -1;

  }

  /**
   * Liest von dem aktuellen Datensatz neue Sensordaten von der Datenreihe mit der Datenreihen ID
   * @param dataRowID die Datenreihen ID, von der die Daten ausgelesen werden sollen.
   * @returns die gelesenen Daten von der Datenreihe. Falls die Datenreihe nicht existiert oder kein aktueller Datensatz existiert, sind die Daten leer.
   */
  readDataPoint(dataRowID: number): { dataPoint?: { value: number, relativeTime: number; }; } {
    if (this.currentDataSet != null) {
      return this.currentDataSet.readDataPoint(dataRowID);
    }
    return {};
  }

  /**
   * Gibt von allen Datensätzen Informationen zurück
   * @returns dataSetID ist die DatensatzID und dataSetName ist der Datensatzname
   */
  getDataSetMetas(): { dataSetID: number, dataSetName: string; }[] {
    var dataSetMetas: { dataSetID: number, dataSetName: string; }[] = new Array();
    for (let i = 0; i < this.dataSet.length; i++) {
      dataSetMetas.push({ dataSetID: this.dataSet[i].getID(), dataSetName: this.dataSet[i].getName() });
    }
    return dataSetMetas;
  }

  /**
   * Gibt die Datenreihen der Datensatz ID zurück und setzt diesen Datensatz als aktuellen Datensatz
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getDataRows(dataSetID: number): { dataRows?: { value: number, relativeTime: number; }[][]; } {
    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].getID() == dataSetID) {
        this.currentDataSet = this.dataSet[i];
        return { dataRows: this.dataSet[i].getDataRows() };
      }
    }
    return {};
  }

  /**
   * Gibt die Datenreihen der aktuellen Datenreihe zurück
   * @returns die Sensordaten von der Datenreihe
   */
  getCurrentDataRows(): { dataRows?: { value: number, relativeTime: number; }[][]; } {
    if (this.currentDataSet != null) {
      return { dataRows: this.currentDataSet.getDataRows() };
    }
    return {};
  }

  /**
   * Gibt die Session ID zurück
   */
  getSessionID(): number {
    return this.session.getId();
  }

  /**
   * Setzt dem Label mit der übergebenen ID neue Werte.
   * @param start Ist die neue Startzeit des Labels.
   * @param end Ist die neue Endzeit des Labels.
   * @param labelID Die Label ID, welche überarbeitet werden soll.
   * @param labelName Ist bei Angabe der neue Name des Labels.
   * @returns falls das Label nicht existiert oder es kein aktuellen Datensatz gibt wird false zurück gegeben
   */
  createLabel(start: number, end: number, labelID: number, labelName?: string): boolean {
    if (this.currentDataSet != null) {
      return this.currentDataSet.setLabel(labelID, { start, end }, labelName);
    }
    return false;
  }

  setLabel(labelID: number, span: { start: number, end: number; }, labelName?: string): boolean {
    if (this.currentDataSet != null) {
      return this.currentDataSet.setLabel(labelID, span, labelName);
    }
    return false;
  }

  deleteLabel(labelID: number): boolean {
    if (this.currentDataSet != null) {
      return this.currentDataSet.deleteLabel(labelID);
    } else {
      return false;
    }
  }

  /**
   * Gibt alle Daten von allen Labeln vom aktuellen Datensatz zurück.
   * @returns leer, falls kein aktueller Datensatz existiert
   */
  getLabels(): { labels?: { name: string, id: number, start: number, end: number; }[]; } {
    if (this.currentDataSet != null) {
      return { labels: this.currentDataSet.getLabels() };
    }
    return {};
  }
} export { Project };