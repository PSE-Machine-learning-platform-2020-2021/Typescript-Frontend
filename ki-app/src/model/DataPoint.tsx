/**
 * Diese Klasse repräsentiert einen Messwert verknüpft mit einem Zeitpunkt. Der DataPoint ist das atomare Element jeglicher DataSet-Objekte.
 */
export class DataPoint {
  private value: number[]; //Dies ist der Sensormesswert, meist x,y,z.
  private relativeTime: number; //Dies ist die relative Zeit zum Start der Aufnahme in Millisekunden.

  /**
   * Erstellt einen Datenpunkt.
   * @param value Sensorwert vom Datenpunkt.
   * @param relativeTime Die relative Zeit zum Start der Aufnahme in Millisekunden.
   */
  constructor(value: number[], relativeTime: number) {
    this.value = value;
    this.relativeTime = relativeTime;
  }

  /**
   * Gibt den Sensormesswert zurück.
   */
  public getValue(): number[] {
    return this.value;
  }

  /**
   * Gibt die relative Zeit zum Start der Aufnahme in Millisekunden zurück.
   */
  public getRelativeTime(): number {
    return this.relativeTime;
  }
}