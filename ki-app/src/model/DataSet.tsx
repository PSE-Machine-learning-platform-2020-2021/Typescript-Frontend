import { DataRow } from "./DataRow";
import { Label } from "./Label";
import { SensorData } from "./SensorData";

/**
 * Die Klasse fasst Datenreihen, welche Sensorwerte und deren relative Zeit besitzen, zu einem Datensatz zusammen.
 */
export class DataSet {
  private generateDate: number; //Dies ist die Erstellungszeit dieses Datensatzes in Millisekunden.
  private id: number; //Dies ist die Datensatz ID.
  private name: string; //Dies ist der Name des Datensatzes.
  private dataRow: DataRow[] = []; //Dies sind die Datenreihen, welche zu dem Datensatz gehören.
  private label: Label[] = []; //Dies sind die existierenden Labels für den Datensatz.


  /**
   * Erstellt einen neuen Datensatz.
   * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden
   * @param dataSetID die eindeutige Datensatz ID
   * @param dataSetName der Datensatznamen
   * @param generateDate die Erstellungszeit von dem Datensatz
   */
  constructor(dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate?: number);

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
  constructor(dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]);
  constructor(dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate?: number, dataRows?: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label?: { name: string, labelID: number, start: number, end: number; }[]) {
    if (dataRows != null) {
      for (let i = 0; i < dataRows.length && i < dataRowSensors.length; i++) {
        this.dataRow.push(new DataRow(dataRowSensors[i], dataRows[i].dataRowID, dataRows[i].dataRow));
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

  addDatapoint(dataRowID: number, datapoint: { value: number[], relativeTime: number; }): boolean {
    for (let i = 0; i < this.dataRow.length; i++) {
      if (this.dataRow[i].getID() === dataRowID) {
        return this.dataRow[i].addDatapoint(datapoint);
      }
    }
    return false;
  }

  /**
   * Gibt alle Datenreihen zurück.
   * @returns Ein zwei Dimensionales Array, die Erste Dimension wählt die Datenreihe und die zweite Dimension den Datenpunkt.
   */
  public getDataRows(): { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[] {
    var dataRows: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; }[] = [];
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
  public createLabel(labelID: number, span: { start: number, end: number; }, labelName: string): boolean {
    if (labelID < 0 || span.start < 0 || span.end < span.start) {
      return false;
    }
    for (let i = 0; i < this.label.length; i++) {
      if (this.label[i].getID() === labelID) {
        return false;
      }
    }
    this.label.push(new Label(labelName, labelID, span.start, span.end));
    return true;
  }

  /**
   * Setzt dem Label mit der übergebenen ID neue Werte.
   * @param span ist die Start- und Endzeit in Millisekunden.
   * @param labelID Die Label ID, welche überarbeitet werden soll.
   * @param labelName Ist bei Angabe der neue Name des Labels.
   * @returns falls das Label nicht existiert wird false zurück gegeben
   */
  public setLabel(labelID: number, span: { start: number, end: number; }, labelName?: string): boolean {
    for (let i = 0; i < this.label.length; i++) {
      if (this.label[i].getID() === labelID) {
        return this.label[i].setLabel(span, labelName);
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
      if (this.label[i].getID() == labelID) { //keine absolute gleichheit!
        this.label.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  /**
   * Gibt alle Daten von allen Labeln zurück.
   */
  public getLabels(): { name: string, labelID: number, start: number, end: number; }[] {
    var labelList: { name: string, labelID: number, start: number, end: number; }[] = [];
    for (let i = 0; i < this.label.length; i++) {
      labelList.push(this.label[i].getLabel());
    }
    return labelList;
  }
}