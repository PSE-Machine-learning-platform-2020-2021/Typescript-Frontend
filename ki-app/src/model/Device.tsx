abstract class Device {
  private id: number;
  private const MACADDRESS: string;
  private name: string;
  private firmware: string;
  private generation: string;

  constructor(deviceID: number) { }
  constructor(deviceID: number, MACADRESS: string, deviceName: string, firmware: string, generation: string);
  getName(): string { }
  getMACADDRESS(): string { }
  getFirmware(): string { }
  getGeneration(): string { }
  getSensors(): Sensor[] { }
  getSensor(id: number): Sensor { }
  protected abstract searchSensor(): void;

} export { Device };

class Smartphone extends Device {
  constructor(deviceID: number) {
    super(deviceID);
  }
  protected searchSensor(): void { }
} export { Smartphone };

class Desktop extends Device {
  constructor(deviceID: number) {
    super(deviceID);
  }
  protected searchSensor(): void { }
} export { Desktop };