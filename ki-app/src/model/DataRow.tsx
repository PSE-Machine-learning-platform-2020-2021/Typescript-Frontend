//import { relative } from "node:path";
//import { useDebugValue } from "react";
import { DataPoint } from "./DataPoint";
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
  constructor ( sensor: AccelerometerData | GyroscopeData, dataRowID: number );

  /**
   * Eine bereits existierende Datenreihe kann wie folgt in das Model geladen werden.
   * @param sensor der Sensor von dem die Daten gelesen wurden
   * @param dataRowID die ID, welche die Datenreihe bei der ersten Erstellung zugeteilt bekommen hat
   * @param dataRow die aufgenommenen Daten
   * @param dataRow.value der Sensor Messwert
   * @param dataRow.relativeTime die relative Zeit zum Aufnahmestart
   */
  constructor ( sensor: AccelerometerData | GyroscopeData, dataRowID: number, dataRow: { value: number[], relativeTime: number; }[] );
  constructor ( sensor: AccelerometerData | GyroscopeData, dataRowID: number, dataRow?: { value: number[], relativeTime: number; }[] ) {
    this.sensor = sensor;
    this.id = dataRowID;
    if ( dataRow != null ) {
      for ( let i = 0; i < dataRow.length; i++ ) {
        this.datapoint.push( new DataPoint( dataRow[ i ].value, dataRow[ i ].relativeTime ) );
      }
    }
  }

  /**
   * Gibt die DataRow ID zurück.
   */
  public getID (): number {
    return this.id;
  }

  /**
   * Fügt den Datenpunkt der Datenreihe hinzu
   * 
   */

  /**
   * Fügt den Datenpunkt der Datenreihe hinzu
   * @param datapoint der Datenpunkt
   * @returns false, falls datapoint.value leer ist oder datapoint.relativeTime < 0
   */
  public addDatapoint ( datapoint: { value: number[], relativeTime: number; } ): boolean {
    for ( let i = 0; i < this.datapoint.length; i++ ) {
      if ( this.datapoint[ i ].getValue().length !== datapoint.value.length || this.datapoint[ i ].getRelativeTime() === datapoint.relativeTime ) {
        return false;
      }
    }
    if ( datapoint.value.length === 0 || datapoint.relativeTime < 0 ) {
      return false;
    } else {
      this.datapoint.push( new DataPoint( datapoint.value, datapoint.relativeTime ) );
      return true;
    }

  }



  /**
   * Gibt die Datenreihe zurück.
   * @returns value ist der Messwert und relativeTime die relative Zeit in Millisekunden zum Aufnahmestart.
   */
  public getDataRow (): { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; } {
    var dataRow: { sensorType: number, datapoint: { value: number[], relativeTime: number; }[]; };
    var datapoint: { value: number[], relativeTime: number; }[] = [];
    for ( let i = 0; i < this.datapoint.length; i++ ) {
      datapoint[ i ] = { value: this.datapoint[ i ].getValue(), relativeTime: this.datapoint[ i ].getRelativeTime() };
    }
    var sensorType: number = this.sensor.SensorTypeID;
    dataRow = { sensorType, datapoint };
    return dataRow;
  }
}