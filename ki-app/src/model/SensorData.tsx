//Die abstrakte Klasse Sensor liefert den Bauplan und die gemeinsame Funktionalität aller Sensoren.
export abstract class SensorData {
  id: number; //Dieses Feld enthält die laufende Nummer des Sensors, diese ist in Device eindeutig und ist Konstant.
  abstract SensorTypeID: number; //Dies ist die global eindeutige ID für die Sensorart
  MACADDRESS: string; //Ist die MAC-adresse des Gerätes um es später wieder zuweisen zu können
  deviceName: string; //Der Name vom Erfassungsgerät
  //abstract sensor: Sensor;

  constructor(id: number, MACADDRESS: string, deviceName: string) {
    this.id = id;
    this.MACADDRESS = MACADDRESS;
    this.deviceName = deviceName;
  }

  getSensorData(): { id: number, SensorTypeID: number, MACADDRESS: string, deviceName: string; } {
    return { id: this.id, SensorTypeID: this.SensorTypeID, MACADDRESS: this.MACADDRESS, deviceName: this.deviceName };
  }

  getSensorTypeID(): number {
    return this.SensorTypeID;
  }
}
//Diese Klasse ist eine Unterklasse von der abstrakten Klasse SensorData und ist für die Sensoren der Kategorie Beschleunigungssensor bestimmt
export class AccelerometerData extends SensorData {
  SensorTypeID: number = 2;

  //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
  constructor(id: number, macaddress: string, deviceName: string) {
    super(id, macaddress, deviceName);
  }
}

//Diese Klasse ist eine Unterklasse von der abstrakten Klasse SensorData und ist für die Sensoren der Kategorie Kreiselinstrument bestimmt.
export class GyroscopeData extends SensorData {
  SensorTypeID: number = 3;

  //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
  constructor(id: number, macaddress: string, deviceName: string) {
    super(id, macaddress, deviceName);
  }
}

export class MagnetometerData extends SensorData {
  SensorTypeID: number = 4;

  //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
  constructor(id: number, macaddress: string, deviceName: string) {
    super(id, macaddress, deviceName);
  }
}