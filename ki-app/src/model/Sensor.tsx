import { Device } from "./Device";

//Die abstrakte Klasse Sensor liefert den Bauplan und die gemeinsame Funktionalität aller Sensoren.
export abstract class SensorData {
  id: number; //Dieses Feld enthält die laufende Nummer des Sensors, diese ist in Device eindeutig und ist Konstant.
  abstract SensorTypeID: number; //Dies ist die global eindeutige ID für die Sensorart
  MACADDRESS: string; //Ist die MAC-adresse des Gerätes um es später wieder zuweisen zu können
  deviceName: string; //Der Name vom Erfassungsgerät
  abstract sensor: Sensor;

  constructor(id: number, MACADDRESS: string, deviceName: string) {
    this.id = id;
    this.MACADDRESS = MACADDRESS;
    this.deviceName = deviceName;
  }

  getSensor(): Sensor {
    return this.sensor;
  }

  getSensorData(): { id: number, SensorTypeID: number, MACADDRESS: string, deviceName: string, sensor: Sensor; } {
    return { id: this.id, SensorTypeID: this.SensorTypeID, MACADDRESS: this.MACADDRESS, deviceName: this.deviceName, sensor: this.sensor };
  }

  //nur anti error!
  getCurrentValue(): number {
    return -1;
  }
}

//Diese Klasse ist eine Unterklasse von der abstrakten Klasse SensorData und ist für die Sensoren der Kategorie Beschleunigungssensor bestimmt
export class AccelerometerData extends SensorData {
  SensorTypeID: number = 2;
  sensor: Accelerometer;

  //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
  constructor(id: number, macaddress: string, deviceName: string) {
    super(id, macaddress, deviceName);
    this.sensor = new Accelerometer({ frequency: 1000 });
  }

  checkPermission() {
    navigator.permissions.query({ name: "accelerometer" }).then(({ state }) => {
      switch (state) {
        case "granted":
          break;
        case "prompt":
          break;
        default:
          // Don’t do anything if the permission was denied.
          break;
      }
    });
  }
}

//Diese Klasse ist eine Unterklasse von der abstrakten Klasse SensorData und ist für die Sensoren der Kategorie Kreiselinstrument bestimmt.
export class GyroscopeData extends SensorData {
  SensorTypeID: number = 3;
  sensor: Gyroscope;

  //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
  constructor(id: number, macaddress: string, deviceName: string) {
    super(id, macaddress, deviceName);
    this.sensor = new Gyroscope({ frequency: 1000 });
  }
}

export class MagnetometerData extends SensorData {
  SensorTypeID: number = 4;
  sensor: Magnetometer;

  //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
  constructor(id: number, macaddress: string, deviceName: string) {
    super(id, macaddress, deviceName);
    this.sensor = new Magnetometer({ frequency: 1000 });

  }
}
/*
export class Microphone extends SensorData {
  option: { audio: boolean, video: boolean; } = { audio: true, video: false };

  start() {
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia = function (constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
      };
    } else {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          devices.forEach(device => {
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
          });
        })
        .catch(err => {
          console.log(err.name, err.message);
        });
    }
    navigator.mediaDevices.getUserMedia(this.option)
      .then(function (mediaStreamObj) {
        //connect the media stream to the first video element
        let video = document.querySelector('video');
        if ("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        } else {
          //old version
          video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = function (ev) {
          //show in the video element what is being captured by the webcam
          video.play();
        };

        //add listeners for saving video/audio
        let start = document.getElementById('btnStart');
        let stop = document.getElementById('btnStop');
        let vidSave = document.getElementById('vid2');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

        start.addEventListener('click', (ev) => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
        });
        stop.addEventListener('click', (ev) => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
        });
        mediaRecorder.ondataavailable = function (ev) {
          chunks.push(ev.data);
        };
        mediaRecorder.onstop = (ev) => {
          let blob = new Blob(chunks, { 'type': 'video/mp4;' });
          chunks = [];
          let videoURL = window.URL.createObjectURL(blob);
          vidSave.src = videoURL;
        };
      })
      .catch(function (err) {
        console.log(err.name, err.message);
      });
  }
}

*/
//ToDo microphone + permisssion + Licences

//https://www.youtube.com/watch?v=K6L38xk2rkk video für microphone/ erklärung für getUserMedia und MediaRecorder (damit kann man mikrofon und Kamera aufnehmen)
//https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element


/*
"accelerometer",
"gyroscope",
"magnetometer",
"camera",
"microphone",
*/