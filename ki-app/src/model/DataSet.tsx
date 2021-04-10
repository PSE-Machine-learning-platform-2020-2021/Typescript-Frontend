import { IDataPoint } from "./DataPoint";
import { DataRow, IDataRowRID, IDataRowST, IDataRowSTRID } from "./DataRow";
import { ILabel, Label } from "./Label";
import { SensorData } from "./SensorData";
import { ISpan } from "./TimeSpan";

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
   * Eine bereits existierende Datensatz kann wie folgt in das Model geladen werden.
   * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden, 
   * die Anzahl muss mit der Anzahl der Datenreihen übereinstimmen. Und der i´te Sensor wird zur i´ten Datenreihe hinzugefügt.
   * @param dataSetID die eindeutige Datensatz ID
   * @param dataSetName der Datensatznamen
   * @param generateDate die Erstellungszeit von dem Datensatz
   * @param dataRows die schon existierenden Datenreihen
   * @param label die schon existierenden Labels
   */
  constructor(dataSetID: number, dataSetName: string, generateDate: number, dataRows: IDataRowSTRID[], label?: ILabel[]) {
    if (dataRows != null) {
      for (let i = 0; i < dataRows.length; i++) {
        this.dataRow.push(new DataRow({ SensorTypeID: dataRows[i].sensorType }, dataRows[i].dataRowID, dataRows[i].dataRow));
      }
    }
    if (label != null) {
      for (let i = 0; i < label.length; i++) {
        if (label[i].span !== undefined) {
          this.label.push(new Label(label[i].name, label[i].labelID, label[i].span));
        } else if (label[i].start !== undefined && label[i].end !== undefined) {
          this.label.push(new Label(label[i].name, label[i].labelID, { start: label[i].start!, end: label[i].end! }));
        }
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

  addDatapoint(dataRowID: number, datapoint: IDataPoint): boolean {
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
  public getDataRows(): IDataRowST[] {
    var dataRows: IDataRowST[] = [];
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
  public createLabel(labelID: number, span: ISpan, labelName: string): boolean {
    if (labelID < 0 || span.start < 0 || span.end < span.start) {
      return false;
    }
    for (let i = 0; i < this.label.length; i++) {
      if (this.label[i].getID() === labelID) {
        return false;
      }
    }
    this.label.push(new Label(labelName, labelID, span));
    return true;
  }

  /**
   * Setzt dem Label mit der übergebenen ID neue Werte.
   * @param span ist die Start- und Endzeit in Millisekunden.
   * @param labelID Die Label ID, welche überarbeitet werden soll.
   * @param labelName Ist bei Angabe der neue Name des Labels.
   * @returns falls das Label nicht existiert wird false zurück gegeben
   */
  public setLabel(labelID: number, span: ISpan, labelName?: string): boolean {
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
      if (this.label[i].getID() === labelID) {
        this.label.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  /**
   * Gibt alle Daten von allen Labeln zurück.
   */
  public getLabels(): ILabel[] {
    var labelList: ILabel[] = [];
    for (let i = 0; i < this.label.length; i++) {
      labelList.push(this.label[i].getLabel());
    }
    return labelList;
  }
}
export interface IDataSet {
  dataSetID: number,
  dataSetName: string,
  generateDate: number,
  dataRows: IDataRowSTRID[],
  label: ILabel[];
}