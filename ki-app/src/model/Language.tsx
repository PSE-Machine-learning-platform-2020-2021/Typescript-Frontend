/**
 * In dieser Klasse wird die aktuell geladene Sprache sowie alle Nachrichten auf dieser Sprache gespeichert.
 */
export class Language {
  private language: LanguageMessages; //Alle Nachrichten auf der geladenen Sprache

  constructor(language: LanguageMessages) {
    this.language = language;
  }

  /**
   * Gibt den Sprachen Code zurück
   */
  getLanguageCode(): string {
    return this.language.code;
  }

  /**
   * Gibt die geladene Sprache zurück
   * @returns id mit der Nachricht in der gleichen Reihenfolge, wie angefordert.
   */
  getMessage(): LanguageMessages {
    return this.language;
  }

  /**
   * Setzt eine neue Sprache
   * @param languagePromise die neue Sprache die geladen werden soll
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