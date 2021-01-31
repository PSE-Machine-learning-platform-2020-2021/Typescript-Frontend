abstract class Device {
    private const MACADDRESS:string
    private name:string
    private firmware:string
    private generation:string
  
    constructor(firmware:string, generation:string) {}
    //constructor(device:object) {}
    getName():string {}
    getMACADDRESS():string {}
    getFirmware():string {}
    getGeneration():string {}
    getSensors():Sensor[] {}
    getSensor(id:number):Sensor {}
    private searchSensor():void {}
  
  } export {Device}

  class Smartphone extends Device{
    constructor(deviceID:number) {}
    private searchSensor():void {}
  } export {Smartphone}
  
  class Desktop extends Device {
    constructor(deviceID:number) {}
    private searchSensor():void {}
  } export {Desktop}