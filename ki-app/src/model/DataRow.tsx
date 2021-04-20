import { DataPoint, IDataPoint } from "./DataPoint";
import { SensorData } from "./SensorData";

/**
 * Die Klasse DataRow beschreibt eine Reihe aufgenommener Daten eines Sensors.
 */
export class DataRow {
  private id: number; //Dies ist die DataRow ID, diese ist eindeutig für Datensätze.
  private datapoint: DataPoint[] = []; //Dies ist Datenreihe, eine Reihe von Datenpunkten.
  private sensor: SensorData; //Dies ist der Sensor von dem die Daten gelesen wurden.

  /**
   * Eine neue Datenreihe erstellen.
   * @param sensor Sensor, von dem die Daten gelesen werden.
   * @param dataRowID Eine eindeutige Datenreihen ID.
   */
  constructor(sensor: SensorData, dataRowID: number);

  /**
   * Eine bereits existierende Datenreihe kann wie folgt in das Model geladen werden.
   * @param sensor der Sensor von dem die Daten gelesen wurden
   * @param dataRowID die ID, welche die Datenreihe bei der ersten Erstellung zugeteilt bekommen hat
   * @param dataRow die aufgenommenen Daten
   * @param dataRow.value der Sensor Messwert
   * @param dataRow.relativeTime die relative Zeit zum Aufnahmestart
   */
  constructor(sensor: SensorData, dataRowID: number, dataRow: IDataPoint[]);
  constructor(sensor: SensorData, dataRowID: number, dataRow?: IDataPoint[]) {
    this.sensor = sensor;
    this.id = dataRowID;
    if (dataRow != null) {
      for (let i = 0; i < dataRow.length; i++) {
        this.datapoint.push(new DataPoint(dataRow[i].value, dataRow[i].relativeTime));
      }
    }
  }

  /**
   * Gibt die DataRow ID zurück.
   */
  public getID(): number {
    return this.id;
  }

  /**
   * Fügt den Datenpunkt der Datenreihe hinzu
   * @param dataRow der Datenpunkt
   * @returns false, falls datapoint.value leer ist oder datapoint.relativeTime < 0
   */
  public addDatapoint(dataRow: IDataPoint[]): boolean {
    for (let d = 0; d < dataRow.length; d++) {
      for (let i = 0; i < this.datapoint.length; i++) {
        if (this.datapoint[i].getValue().length !== dataRow[d].value.length || this.datapoint[i].getRelativeTime() === dataRow[d].relativeTime) {
          return false;
        }
      }
      if (dataRow[d].value.length === 0 || dataRow[d].relativeTime < 0) {
        return false;
      } else {
        this.datapoint.push(new DataPoint(dataRow[d].value, dataRow[d].relativeTime));
      }
    }
    return true;
  }

  /**
   * Gibt die Datenreihe zurück.
   * @returns value ist der Messwert und relativeTime die relative Zeit in Millisekunden zum Aufnahmestart.
   */
  public getDataRow(): IDataRowST {
    var dataRowST: IDataRowST;
    var dataRow: IDataPoint[] = [];
    for (let i = 0; i < this.datapoint.length; i++) {
      dataRow.push({ value: this.datapoint[i].getValue(), relativeTime: this.datapoint[i].getRelativeTime() });
    }
    var sensorType: number = this.sensor.SensorTypeID;
    dataRowST = { sensorType, datapoint: dataRow };
    return dataRowST;
  }
}
export interface IDataRowST {
  sensorType: number,
  datapoint: IDataPoint[];
}
export interface IDataRowRID {
  dataRowID: number,
  dataRow: IDataPoint[];
}
export interface IDataRowSTRID {
  sensorType: number,
  dataRowID: number,
  dataRow: IDataPoint[];
}