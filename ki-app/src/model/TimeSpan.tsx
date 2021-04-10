/**
 * Diese Klasse repräsentiert ein Zeitfenster.
 * Mit start als Anfang und end als Ende des Zeitfensters.
 */
export class TimeSpan {
  private start: number; //Startpunkt des Zeitfensters in Sekunden.
  private end: number; //Enpunkt des Zeitfensters in Sekunden.

  /**
   * Erstellt ein Zeitfenster.
   * @param start Startpunkt in Sekunden (start >= 0)
   * @param end Endpunkt in Sekunden (end >= start)
   */
  public constructor(span: ISpan) {
    if (span.start >= 0) {
      this.start = span.start;
    } else {
      this.start = 0;
    }
    if (span.end >= this.start) {
      this.end = span.end;
    } else {
      this.end = this.start;
    }
  }

  /**
   * Setzt das übergebene Zeitfenster als Zeitfenster, wenn dies den Anforderungen entspricht. (0 <= start <= end)
   * @returns false, falls das Zeitfenster nicht gesetzt wurde
   */
  public setTimeSpan(span: ISpan): boolean {
    if (span.end >= span.start && span.start >= 0) {
      this.start = span.start;
      this.end = span.end;
      return true;
    }
    return false;
  }

  /**
   * Gibt den Startpunkt in Sekunden zurück.
   */
  public getStart(): number {
    return this.start;
  }

  /**
   * Gibt den Enpunkt in Sekunden zurück.
   */
  public getEnd(): number {
    return this.end;
  }
}
export interface ISpan {
  start: number,
  end: number;
}