import { DataPoint } from "./DataPoint";
import { Sensor } from "./Sensor";

/**
 * Die Klasse DataRow beschreibt eine Reihe aufgenommener Daten eines Sensors.
 */
class DataRow {
  private id: number; //Dies ist die DataRow ID, diese ist eindeutig für Datensätze.
  private recordingStart: number; //Dies ist der Aufnahmestartpunkt der Datenreihe.
  private datapoint: DataPoint[] = new Array; //Dies ist Datenreihe, eine Reihe von Datenpunkten.
  private sensor: Sensor; //Dies ist der Sensor von dem die Daten gelesen wurden.

  /**
   * Eine neue Datenreihe erstellen.
   * @param sensor Sensor, von dem die Daten gelesen werden.
   * @param dataRowID Eine eindeutige Datenreihen ID.
   */
  constructor(sensor: Sensor, dataRowID: number);

  /**
   * Eine bereits existierende Datenreihe kann wie folgt in das Model geladen werden.
   * @param sensor der Sensor von dem die Daten gelesen wurden
   * @param dataRowID die ID, welche die Datenreihe bei der ersten Erstellung zugeteilt bekommen hat
   * @param recordingStart der Aufnahmezeitpunkt in Millisekunden
   * @param dataRow die aufgenommenen Daten
   * @param dataRow.value der Sensor Messwert
   * @param dataRow.relativeTime die relative Zeit zum Aufnahmestart
   */
  constructor(sensor: Sensor, dataRowID: number, recordingStart: number, dataRow: { value: number, relativeTime: number; }[]);
  constructor(sensor: Sensor, dataRowID: number, recordingStart?: number, dataRow?: { value: number, relativeTime: number; }[]) {
    this.sensor = sensor;
    this.id = dataRowID;
    if (recordingStart != null) {
      this.recordingStart = recordingStart;
    } else {
      this.recordingStart = -1;
    }
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
   * Erzeugt mit dem aktuellen Messwert einen Datenpunkt und gibt diesen zurück.
   * @returns value ist der neu gelesene Messwert und relativeTime die relative Zeit in Millisekunden zum Aufnahmestart.
   */
  public createCurrentDataPoint(): { value: number, relativeTime: number; } {
    if (this.recordingStart == -1) {
      this.recordingStart = new Date().getTime();
    }
    var relativeTime: number = new Date().getTime() - this.recordingStart;
    this.datapoint.push(new DataPoint(this.sensor.getCurrentValue(), relativeTime));
    return { value: this.sensor.getCurrentValue(), relativeTime };
  }

  /**
   * Gibt die Datenreihe zurück.
   * @returns value ist der Messwert und relativeTime die relative Zeit in Millisekunden zum Aufnahmestart.
   */
  public getDataRow(): { value: number, relativeTime: number; }[] {
    var dataRow: { value: number, relativeTime: number; }[] = new Array();
    for (let i = 0; i < this.datapoint.length; i++) {
      dataRow[i] = { value: this.datapoint[i].getValue(), relativeTime: this.datapoint[i].getRelativeTime() };
    }
    return dataRow;
  }

  /**
   * Gibt den Aufnahmestartpunkt in Millisekunden zurück. Kann "-1" sein, wenn noch keine Aufnahme gestartet wurde.
   */
  public getRecordingStart(): number {
    return this.recordingStart;
  }
} export { DataRow };