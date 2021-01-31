//Diese Klasse repräsentiert einen Messwert verknüpft mit einem Zeitpunkt. Der DataPoint ist das atomare Element jeglicher DataSet-Objekte.
class DataPoint {
  private value:number //Dies ist der Sensormesswert.
  private relativeTime:number //Dies ist die relative Zeit zum Start der Aufnahme in Millisekunden.
   
  //Ein Datenpunkt kann mit dem Sensormesswert und der relativen Zeit, zum Start der Aufnahme in Millisekunden, erzeugt werden.
  constructor(value:number, relativeTime:number) {
    this.value = value;
    this.relativeTime = relativeTime;
  }

  //Gibt den Sensormesswert zurück.
  public getValue():number {
    return this.value;
  }

  //Gibt die relative Zeit zum Start der Aufnahme in Millisekunden zurück.
  public getRelativeTime():number {
    return this.relativeTime;
  }
} export {DataPoint}