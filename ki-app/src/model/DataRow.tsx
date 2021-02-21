import { DataPoint } from "./DataPoint";
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
   * @param recordingStart der Aufnahmezeitpunkt in Millisekunden
   * @param dataRow die aufgenommenen Daten
   * @param dataRow.value der Sensor Messwert
   * @param dataRow.relativeTime die relative Zeit zum Aufnahmestart
   */
  constructor(sensor: SensorData, dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]);
  constructor(sensor: SensorData, dataRowID: number, dataRow?: { value: number[], relativeTime: number; }[]) {
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
   */
  public addDatapoint(datapoint: { value: number[], relativeTime: number; }): boolean {
    this.datapoint.push(new DataPoint(datapoint.value, datapoint.relativeTime));
    return true;
  }



  /**
   * Gibt die Datenreihe zurück.
   * @returns value ist der Messwert und relativeTime die relative Zeit in Millisekunden zum Aufnahmestart.
   */
  public getDataRow(): { value: number[], relativeTime: number; }[] {
    var dataRow: { value: number[], relativeTime: number; }[] = [];
    for (let i = 0; i < this.datapoint.length; i++) {
      dataRow[i] = { value: this.datapoint[i].getValue(), relativeTime: this.datapoint[i].getRelativeTime() };
    }
    return dataRow;
  }
}