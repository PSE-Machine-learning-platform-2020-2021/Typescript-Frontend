import { AccelerometerData, SensorData } from "./Sensor";

export abstract class Device {
  private id: number;
  private MACADDRESS: string;
  private name: string;
  private firmware: string;
  private generation: string;
  private deviceType: string;

  constructor(deviceID: number);
  constructor(deviceID: number, MACADRESS: string, deviceName: string, firmware: string, generation: string);


  //nicht fertig !!!!!
  constructor(deviceID: number, MACADRESS?: string, deviceName?: string, firmware?: string, generation?: string) {
    this.id = deviceID;
    this.MACADDRESS = "";
    this.name = "";
    this.firmware = "";
    this.generation = "";
    this.deviceType = "";
  }


  getName(): string {
    return this.name;
  }
  getMACADDRESS(): string {
    return this.MACADDRESS;
  }
  getFirmware(): string {
    return this.firmware;
  }
  getGeneration(): string {
    return this.generation;
  }
  getSensors(sensorTypeID: number[]): SensorData[] {
    return [];
  }
  getSensor(id: number): SensorData {
    return new AccelerometerData(this.id, this.MACADDRESS, this.name);
  }

  /**
   * Gibt alle Sensoren aus, die das Benutzergerät und das Programm unterstützt
   */
  getAvailableSensors(): number[] {
    return [];
  }

  /**
   * Prüft das aktuelle Gerät auf
   */
  static loadDevice(deviceID: number, device?: { MACADRESS: string, deviceName: string, firmware: string, generation: string, deviceType: string; }): Device {
    return new Smartphone(-1);
  }


  protected abstract searchSensor(): void;

}

export class Smartphone extends Device {
  protected searchSensor(): void { }
}

export class Desktop extends Device {
  protected searchSensor(): void { }
}