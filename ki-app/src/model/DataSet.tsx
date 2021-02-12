import { DataRow } from "./DataRow";
import { Label } from "./Label";
import { Sensor } from "./Sensor";

/**
 * Die Klasse fasst Datenreihen, welche Sensorwerte und deren relative Zeit besitzen, zu einem Datensatz zusammen.
 */
export class DataSet {
  private generateDate: number; //Dies ist die Erstellungszeit dieses Datensatzes in Millisekunden.
  private id: number; //Dies ist die Datensatz ID.
  private name: string; //Dies ist der Name des Datensatzes.
  private dataRow: DataRow[] = new Array(); //Dies sind die Datenreihen, welche zu dem Datensatz gehören.
  private label: Label[] = new Array(); //Dies sind die existierenden Labels für den Datensatz.


  /**
   * Erstellt einen neuen Datensatz.
   * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden
   * @param dataSetID die eindeutige Datensatz ID
   * @param dataSetName der Datensatznamen
   * @param generateDate die Erstellungszeit von dem Datensatz
   */
  constructor(dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate?: number);

  /**
   * Eine bereits existierende Datensatz kann wie folgt in das Model geladen werden.
   * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden, 
   * die Anzahl muss mit der Anzahl der Datenreihen übereinstimmen. Und der i´te Sensor wird zur i´ten Datenreihe hinzugefügt.
   * @param dataSetID die eindeutige Datensatz ID
   * @param dataSetName der Datensatznamen
   * @param generateDate die Erstellungszeit von dem Datensatz
   * @param dataRows die schon existierenden Datenreihen
   * @param label die schon existierenden Labels
   */
  constructor(dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, recordingStart: number, dataRow: { value: number, relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]);
  constructor(dataRowSensors: Sensor[], dataSetID: number, dataSetName: string, generateDate?: number, dataRows?: { dataRowID: number, recordingStart: number, dataRow: { value: number, relativeTime: number; }[]; }[], label?: { name: string, labelID: number, start: number, end: number; }[]) {
    if (dataRows != null) {
      for (let i = 0; i < dataRows.length && i < dataRowSensors.length; i++) {
        this.dataRow.push(new DataRow(dataRowSensors[i], dataRows[i].dataRowID, dataRows[i].recordingStart, dataRows[i].dataRow));
      }
    } else {
      for (let i = 0; i < dataRowSensors.length; i++) {
        this.dataRow.push(new DataRow(dataRowSensors[i], i));
      }
    }
    if (label != null) {
      for (let i = 0; i < label.length; i++) {
        this.label.push(new Label(label[i].name, label[i].labelID, label[i].start, label[i].end));
      }
    }
    if (generateDate != null) {
      this.generateDate = generateDate;
    } else {
      this.generateDate = new Date().getTime();
    }
    this.id = dataSetID;
    this.name = dataSetName;
  }

  /**
   * Gibt die Datensatz ID zurück.
   */
  public getID(): number {
    return this.id;
  }

  /**
   * Gibt den Datensatz Namen zurück.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Liest einen neuen Datenpunkt, speichert diesen und gibt ihn zurück.
   * @param dataRowID Datenreihe ID, von der die Daten ausgelesen werden sollen.
   * @returns die gelesenen Daten von der Datenreihe. Falls die Datenreihe nicht existiert oder kein aktueller Datensatz existiert, sind die Daten leer.
   */
  public readDataPoint(dataRowID: number): { dataPoint?: { value: number, relativeTime: number; }; } {
    for (let i = 0; i < this.dataRow.length; i++) {
      if (this.dataRow[i].getID() == dataRowID) {
        return { dataPoint: this.dataRow[i].createCurrentDataPoint() };
      }
    }
    return {};
  }

  /**
   * Gibt alle Datenreihen zurück.
   * @returns Ein zwei Dimensionales Array, die Erste Dimension wählt die Datenreihe und die zweite Dimension den Datenpunkt.
   */
  public getDataRows(): { value: number, relativeTime: number; }[][] {
    var dataRows: { value: number, relativeTime: number; }[][] = new Array();
    for (let i = 0; i < this.dataRow.length; i++) {
      dataRows.push(this.dataRow[i].getDataRow());
    }
    return dataRows;
  }

  /**
   * Erstellt ein Label
   * @param labelID die eindeutige Label ID
   * @param name der Labelname
   * @param start die Startzeit des Zeitfensters in Millisekunden
   * @param end die Endzeit des Zeitfensters in Millisekunden
   * @returns falls das Label mit der ID schon existiert wird false zurück gegeben
   */
  public createLabel(name: string, labelID: number, start: number, end: number): boolean {
    for (let i = 0; i < this.label.length; i++) {
      if (this.label[i].getID() == labelID) {
        return false;
      }
    }
    this.label.push(new Label(name, labelID, start, end));
    return true;
  }

  /**
   * Setzt dem Label mit der übergebenen ID neue Werte.
   * @param span ist die Start- und Endzeit in Millisekunden.
   * @param labelID Die Label ID, welche überarbeitet werden soll.
   * @param labelName Ist bei Angabe der neue Name des Labels.
   * @returns falls das Label nicht existiert wird false zurück gegeben
   */
  public setLabel(labelID: number, span?: { start: number, end: number; }, labelName?: string): boolean {
    for (let i = 0; i < this.label.length; i++) {
      if (this.label[i].getID() == labelID) {
        this.label[i].setLabel(span, labelName);
        return true;
      }
    }
    return false;
  }

  /**
   * Löscht das Label mit der übergebenen LabelID.
   * @param labelID die LabelID
   */
  public deleteLabel(labelID: number): boolean {
    for (let i = 0; i < this.label.length; i++) {
      if (this.label[i].getID() == labelID) {
        delete this.label[i];
        return true;
      }
    }
    return false;
  }

  /**
   * Gibt alle Daten von allen Labeln zurück.
   */
  public getLabels(): { name: string, id: number, start: number, end: number; }[] {
    var labelList: { name: string, id: number, start: number, end: number; }[] = new Array;
    for (let i = 0; i < this.label.length; i++) {
      labelList.push(this.label[i].getLabel());
    }
    return labelList;
  }
}