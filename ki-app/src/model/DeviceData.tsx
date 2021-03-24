import { AccelerometerData, SensorData } from "./SensorData";

export abstract class DeviceData {
  private id: number;
  private MACADDRESS: string;
  private name: string;
  private firmware: string;
  private generation: string;
  protected abstract deviceType: string;
  //private availableSensors: SensorData[] = [];

  protected constructor(deviceID: number, MACADRESS: string, deviceName: string, firmware: string, generation: string) {
    if (deviceID < 0) {
      this.id = -1;
    } else {
      this.id = deviceID;
    }
    this.MACADDRESS = MACADRESS;
    this.name = deviceName;
    this.firmware = firmware;
    this.generation = generation;
  }

  /**
   * Setzt nur die DeviceID falls beim erstellen des Gerätes die ID -1 übergeben wurde
   * @param deviceID 
   */
  setDeviceID(deviceID: number): boolean {

    if (this.id == -1 && deviceID >= 0) {
      this.id = deviceID;
      return true;
    }
    return false;
  }

  getID(): number {
    return this.id;
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

  /*getSensors(sensorTypeID: number[]): SensorData[] {
    return [];
  }
  getSensor(id: number): SensorData {
    return new AccelerometerData(this.id, this.MACADDRESS, this.name);
  }*/

  /**
   * Gibt alle Sensoren aus, die das Benutzergerät und das Programm unterstützt
   *
  getAvailableSensors(): number[] {
    return [];
  }*/

  /**
   * Prüft welches Gerät aktuell benutzt wird
   */
  static loadDevice(deviceID: number, device?: { MACADRESS: string, deviceName: string, firmware: string, generation: string, deviceType: string; }): DeviceData {
    ////////////////////////////////////////////////////
    //Noch herrausfinden Smartphone oder anderes Gerät//
    ////////////////////////////////////////////////////
    if (device != null) {
      if (device.deviceType == "Smartphone") {
        return new Smartphone(deviceID, device.MACADRESS, device.deviceName, device.firmware, device.generation);
      } else if (device.deviceType == "Desktop") {
        return new Desktop(deviceID, device.MACADRESS, device.deviceName, device.firmware, device.generation);
      } else {
        return new Smartphone(deviceID, device.MACADRESS, device.deviceName, device.firmware, device.generation);
      }
    } else {
      //NUR DUMMY MUSS NOCH GEFÜLLT WERDEN
      return new Smartphone(deviceID, "", "", "", "");
    }
  }
  //protected abstract searchSensor(): void;
}

export class Smartphone extends DeviceData {
  protected deviceType: string = "Smartphone";
  //protected searchSensor(): void { }
}

export class Desktop extends DeviceData {
  protected deviceType: string = "Desktop";
  //protected searchSensor(): void { }
}