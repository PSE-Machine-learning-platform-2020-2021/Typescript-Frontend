//import { runInThisContext } from "node:vm";

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
  public constructor ( start: number, end: number ) {
    if ( start >= 0 ) {
      this.start = start;
    } else {
      this.start = 0;
    }
    if ( end >= this.start ) {
      this.end = end;
    } else {
      this.end = this.start;
    }
  }

  /**
   * Setzt das übergebene Zeitfenster als Zeitfenster, wenn dies den Anforderungen entspricht. (0 <= start <= end)
   * @returns false, falls das Zeitfenster nicht gesetzt wurde
   */
  public setTimeSpan ( span: { start: number, end: number; } ): boolean {
    if ( span.end >= span.start && span.start >= 0 ) {
      this.start = span.start;
      this.end = span.end;
      return true;
    }
    return false;
  }

  /**
   * Gibt den Startpunkt in Sekunden zurück.
   */
  public getStart (): number {
    return this.start;
  }

  /**
   * Gibt den Enpunkt in Sekunden zurück.
   */
  public getEnd (): number {
    return this.end;
  }
}