/**
 * Diese Klasse repräsentiert ein Zeitfenster.
 * Mit start als Anfang und end als Ende des Zeitfensters.
 */
export class TimeSpan {
  private start: number; //Startpunkt des Zeitfensters in Millisekunden.
  private end: number; //Enpunkt des Zeitfensters in Millisekunden.

  /**
   * Erstellt ein Zeitfenster.
   * @param start Startpunkt in Millisekunden (start >= 0)
   * @param end Endpunkt in Millisekunden (end >= start)
   */
  public constructor(start: number, end: number) {
    if (start >= 0) {
      this.start = start;
    } else {
      this.start = 0;
    }
    if (end >= this.start) {
      this.end = end;
    } else {
      this.end = this.start;
    }
    console.log("ist das in MilliSekunden?: " + this.start + " kommentar Test");
  }

  /**
   * Setzt den übergebenen Startpunkt als Startpunkt, wenn dieser ein positiver Wert ist.
   * @param start start: Startpunkt in Millisekunden (0 <= start <= end)
   */
  public setStart(start: number): boolean {
    if (start >= 0 && start <= this.end) {
      this.start = start;
      return true;
    }
    return false;
  }

  /**
   * Setzt den übergebenen Endpunkt als Endpunkt, wenn dieser ein positiver Wert ist.
   * @param end Endpunkt in Millisekunden (0 <= start <= end)
   */
  public setEnd(end: number): boolean {
    if (end >= this.start) {
      this.end = end;
      return true;
    }
    return false;
  }

  /**
   * Gibt den Startpunkt in Millisekunden zurück.
   */
  public getStart(): number {
    return this.start;
  }

  /**
   * Gibt den Enpunkt in Millisekunden zurück.
   */
  public getEnd(): number {
    return this.end;
  }
}