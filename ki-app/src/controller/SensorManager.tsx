export class SensorManager {
    sensors: Sensor[]
    toggledSensors: Sensor[]
    rewindSensors() {

    }
    rewindToggleSensors() {

    }
    getSensors() {
        return Sensor[]
    }
    getNextSensor(){
    return Sensor|null
    }
    getToggledSensors() {
        return Sensor[] 
    }
    getNextToggledSensor() {
        return Sensor|null
    }
    getSensorData([sensor: Sensor = null]) {
        return string|object
    }
    startRecord(warmup: number, record: number) {

    }
    toggleSensor(sensor: Sensor, state: SensorSettings) {

    }
}