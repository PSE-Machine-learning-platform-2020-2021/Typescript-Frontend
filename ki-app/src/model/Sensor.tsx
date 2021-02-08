//Die abstrakte Klasse Sensor liefert den Bauplan und die gemeinsame Funktionalität aller Sensoren.
abstract class Sensor {
    private id:number //Dieses Feld enthält die laufende Nummer des Sensors, diese ist in Device eindeutig und ist Konstant.
    private MACADDRESS:string //Ist die MAC-adresse des Gerätes um es später wieder zuweisen zu können
    private deviceName:string //Der Name vom Erfassungsgerät
    
    //Dieser Konstruktor nimmt als Parameter laufende eindeutigeidentgegen und trägt sie für den Rest der Existenz des jeweiligen von Sensor abgeleiteten Objekts fest ein.
    constructor(id:number, macaddress:string, deviceName:string) {}

    //Gibt den aktuellen Messwert des jeweiligen Sensors verpacktin ein Objekt der Klasse DataPoint zurück.
    abstract getCurrentValue():number
  } export {Sensor}

  //Diese Klasse ist eine Unterklasse von der abstrakten Klasse Sensor und ist für die Sensoren der Kategorie Beschleunigungssensor bestimmt
  class Accelerometer extends Sensor {
    //Dies ist der Konstruktorund nimmt eine eindeutige Sensor-ID entgegen
    constructor(id:number, macaddress:string, deviceName:string) {}

    //Gibt den aktuellen Messwert des Accelerometers verpackt in ein Objekt der Klasse DataPoint zurück.
    getCurrentValue():number {}
  } export {Accelerometer}

  //Diese Klasse ist eine Unterklasse von der abstrakten Klasse Sensor und ist für die Sensoren der Kategorie Kreiselinstrument bestimmt.
  class Gyroscope extends Sensor {
    //Dies ist der Konstruktor undnimmt eine eindeutige Sensor-ID entgegen
    constructor(id:number, macaddress:string, deviceName:string) {}

    //Gibt den aktuellen Messwert des Gyroscopes verpackt in ein Objektder KlasseDataPointzurück
    getCurrentValue():object {}
  } export {Gyroscope}
  
  //Diese Klasse ist eine Unterklasse von der abstrakten Klasse Sensor und ist für die Sensoren der Kategorie Mikrofone bestimmt
  class Microphone extends Sensor {
    //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
    constructor(id:number, macaddress:string, deviceName:string) {}

    //Gibt den aktuellen Messwert des Microphones verpackt in ein Objekt der Klasse DataPoint zurück
    getCurrentValue():object {}
  } export {Microphone}
  
  //Diese Klasse ist eine Unterklasse von der abstrakten Klasse Sensor und ist für die Sensoren der Kategorie Drehzahlsensor bestimmt.
  class Rotation extends Sensor {
    //Dies ist der Konstruktor und nimmt eine eindeutige Sensor-ID entgegen
    constructor(id:number, macaddress:string, deviceName:string) {}
    
    //Gibt den aktuellen Messwert der Rotation verpackt in ein Objekt der Klasse DataPoint zurück
    getCurrentValue():object {}
  } export {Rotation}