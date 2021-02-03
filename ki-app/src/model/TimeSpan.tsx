/**
 * Diese Klasse repräsentiert ein Zeitfenster.
 * Mit start als Anfang und end als Ende des Zeitfensters.
 */
class TimeSpan {
  private start:number //Startpunkt des Zeitfensters in Millisekunden.
  private end:number //Enpunkt des Zeitfensters in Millisekunden.

  /**
   * Erstellt ein Zeitfenster.
   * @param start Startpunkt in Millisekunden 
   * @param end Endpunkt in Millisekunden
   */
  public constructor(start:number, end:number) {
    this.start = start;
    this.end = end;
  }

  /**
   * Setzt den übergebenen Startpunkt als Startpunkt, wenn dieser ein positiver Wert ist.
   * @param start start: Startpunkt in Millisekunden
   */
  public setStart(start:number):Boolean {
    if (start >= 0) {
      this.start = start;
      return true;
    }
    return false;
  }

  /**
   * Setzt den übergebenen Endpunkt als Endpunkt, wenn dieser ein positiver Wert ist.
   * @param end Endpunkt in Millisekunden
   */
  public setEnd(end:number):Boolean {
    if (end >= 0) {
      this.end = end;
      return true;
    }
    return false;
  }

  /**
   * Gibt den Startpunkt in Millisekunden zurück.
   */
  public getStart():number {
    return this.start;
  }

  /**
   * Gibt den Enpunkt in Millisekunden zurück.
   */
  public getEnd():number {
    return this.end;
  }
} export {TimeSpan}