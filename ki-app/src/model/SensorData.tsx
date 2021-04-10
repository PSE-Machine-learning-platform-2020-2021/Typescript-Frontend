//Die abstrakte Klasse Sensor liefert den Bauplan und die gemeinsame Funktionalität aller Sensoren.
export interface SensorData {
  id?: number; //Dieses Feld enthält die laufende Nummer des Sensors, diese ist in Device eindeutig und ist Konstant.
  SensorTypeID: number; //Dies ist die global eindeutige ID für die Sensorart
  MACADDRESS?: string; //Ist die MAC-adresse des Gerätes um es später wieder zuweisen zu können
  deviceName?: string; //Der Name vom Erfassungsgerät

  /*getSensorData(): { id: number, SensorTypeID: number, MACADDRESS: string, deviceName: string; } {
    return { id: this.id, SensorTypeID: this.SensorTypeID, MACADDRESS: this.MACADDRESS, deviceName: this.deviceName };
  }*/
}