import { connected } from "node:process";
import { LanguageService } from "typescript";

/**
 * In dieser Klasse wird die aktuell geladene Sprache sowie alle Nachrichten auf dieser Sprache gespeichert.
 */
export class Language {

  /**
   * Bedingungen an eine Sprache:
   * 0: SprachCode
   * 1: SprachName
   * x: SensorTyp von x    |x sind alle SensorTypIDs 
   */
  private language: LanguageMessages; //Alle Nachrichten auf der geladenen Sprache

  constructor(language: LanguageMessages) {
    this.language = language;
  }

  /**
   * Gibt den Sprachen Code zurück
   */
  getLanguageCode(): string {
    if (this.language !== undefined) {
      return this.language.code;
    }
    return "";
  }

  /**
   * Gibt aus der geladenen Sprache die Nachrichten die über die IDs angegeben werden.
   * @param id Array von den IDs, von denen die Nachricht geladen werden soll
   * @returns id mit der Nachricht in der gleichen Reihenfolge, wie angefordert.
   */
  getMessage(): LanguageMessages {
    return this.language;
  }

  /**
   * Setzt eine neue Sprache
   * @param languagePromise die neue Sprache die geladen werden soll, Stelle 0 ist der Sprachencode und Stelle 1 ist der Sprachenname
   */
  setLanguage(language: LanguageMessages): boolean {
    this.language = language;
    return true;
  }

}
export interface LanguageMessages {
  code: string;
  name: string;
}