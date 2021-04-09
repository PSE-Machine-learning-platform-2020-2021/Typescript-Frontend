import { DataPoint, IDataPoint } from "./DataPoint";
import { AccelerometerData, GyroscopeData } from "./SensorData";

/**
 * Die Klasse DataRow beschreibt eine Reihe aufgenommener Daten eines Sensors.
 */
export class DataRow {
  private id: number; //Dies ist die DataRow ID, diese ist eindeutig für Datensätze.
  private datapoint: DataPoint[] = []; //Dies ist Datenreihe, eine Reihe von Datenpunkten.
  private sensor: AccelerometerData | GyroscopeData; //Dies ist der Sensor von dem die Daten gelesen wurden.

  /**
   * Eine neue Datenreihe erstellen.
   * @param sensor Sensor, von dem die Daten gelesen werden.
   * @param dataRowID Eine eindeutige Datenreihen ID.
   */
  constructor(sensor: AccelerometerData | GyroscopeData, dataRowID: number);

  /**
   * Eine bereits existierende Datenreihe kann wie folgt in das Model geladen werden.
   * @param sensor der Sensor von dem die Daten gelesen wurden
   * @param dataRowID die ID, welche die Datenreihe bei der ersten Erstellung zugeteilt bekommen hat
   * @param dataRow die aufgenommenen Daten
   * @param dataRow.value der Sensor Messwert
   * @param dataRow.relativeTime die relative Zeit zum Aufnahmestart
   */
  constructor(sensor: AccelerometerData | GyroscopeData, dataRowID: number, dataRow: IDataPoint[]);
  constructor(sensor: AccelerometerData | GyroscopeData, dataRowID: number, dataRow?: IDataPoint[]) {
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
  public addDatapoint(dataRow: IDataPoint): boolean {
    for (let i = 0; i < this.datapoint.length; i++) {
      if (this.datapoint[i].getValue().length !== dataRow.value.length || this.datapoint[i].getRelativeTime() === dataRow.relativeTime) {
        return false;
      }
    }
    if (dataRow.value.length === 0 || dataRow.relativeTime < 0) {
      return false;
    } else {
      this.datapoint.push(new DataPoint(dataRow.value, dataRow.relativeTime));
      return true;
    }

  }

  /**
   * Gibt die Datenreihe zurück.
   * @returns value ist der Messwert und relativeTime die relative Zeit in Millisekunden zum Aufnahmestart.
   */
  public getDataRow(): IDataRowST {
    var dataRowST: IDataRowST;
    var dataRow: IDataPoint[] = [];
    for (let i = 0; i < this.datapoint.length; i++) {
      dataRow[i] = { value: this.datapoint[i].getValue(), relativeTime: this.datapoint[i].getRelativeTime() };
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