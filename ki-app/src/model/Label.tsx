import { TimeSpan } from "./TimeSpan";

/**
 * Diese Klasse ist fürs labeln zuständig, sie besitzt ein Zeitfenster und dazu einen Namen.
 */
export class Label {
  private name: string; //Der Name des Labels.
  private labelID: number; //Die ID des Labels.
  private timeSpan: TimeSpan; //Das Zeitfenster des Labels mit Start- und Endzeit.

  /**
   * Erstellt ein Label.
   * @param name Ist der Name des Labels.
   * @param labelID Ist die eindeutige Label ID des Labels.
   * @param start Ist die Startzeit des Labels.
   * @param end Ist die Endzeit des Labels.
   */
  constructor(name: string, labelID: number, start: number, end: number) {
    this.name = name;
    this.labelID = labelID;
    this.timeSpan = new TimeSpan(start, end);
  }

  /**
   * Setzt dem Label neue Werte.
   * @param start Ist die neue Startzeit des Labels.
   * @param end Ist die neue Endzeit des Labels.
   * @param name Ist bei angabe der neue Name des Labels.
   */
  setLabel(span: { start: number, end: number; }, name?: string): void {
    if (span != null) {
      const setted: boolean = this.timeSpan.setTimeSpan(span);
      if (name != null && setted) {
        this.name = name;
      }
    }
  }

  /**
   * Gibt das Label als Objekt zurück.
   * In diesem Objekt werden die Start- und Endzeit als "start" und "end", der Label Name als "name" sowie die Label ID als "id" übergeben.
   */
  getLabel(): { name: string, id: number, start: number, end: number; } {
    var label = {
      name: this.name,
      id: this.labelID,
      start: this.timeSpan.getStart(),
      end: this.timeSpan.getEnd()
    };
    return label;
  }

  /**
   * Gibt die LabelID zurück.
   */
  getID(): number {
    return this.labelID;
  }
}