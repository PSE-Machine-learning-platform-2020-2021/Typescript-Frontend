abstract class Device {
  private id: number;
  private const MACADDRESS: string;
  private name: string;
  private firmware: string;
  private generation: string;
  private deviceType: string;

  constructor(deviceID: number) { }
  constructor(deviceID: number, MACADRESS: string, deviceName: string, firmware: string, generation: string);
  getName(): string { }
  getMACADDRESS(): string { }
  getFirmware(): string { }
  getGeneration(): string { }
  getSensors(sensorTypes: string[]): Sensor[] { }
  getSensor(id: number): Sensor { }

  /**
   * Prüft das aktuelle Gerät auf
   */
  static loadDevice(deviceID: number, device?: { MACADRESS: string, deviceName: string, firmware: string, generation: string, deviceType: string; }): Device {

  }


  protected abstract searchSensor(): void;

} export { Device };

class Smartphone extends Device {
  protected constructor(deviceID: number) {
    super(deviceID);
  }
  protected searchSensor(): void { }
} export { Smartphone };

class Desktop extends Device {
  protected constructor(deviceID: number) {
    super(deviceID);
  }
  protected searchSensor(): void { }
} export { Desktop };