/**
 * In dieser Klasse wird die aktuell geladene Sprache sowie alle Nachrichten auf dieser Sprache gespeichert.
 */
class Language {
  private language: string[]; //Alle Nachrichten auf der geladenen Sprache

  /**
   * 
   * @param language Alle Nachrichten auf der zu ladenden Sprache, Stelle 0 ist der Sprachencode und Stelle 1 ist der Sprachenname
   */
  constructor(language: string[]) {
    this.language = language;
  }

  /**
   * Gibt den Sprachen Code zurück
   */
  getLanguageCode(): string {
    if (this.language.length > 0) {
      return this.language[0];
    }
    return "";
  }

  /**
   * Gibt aus der geladenen Sprache die Nachrichten die über die IDs angegeben werden.
   * @param id Array von den IDs, von denen die Nachricht geladen werden soll
   * @returns id mit der Nachricht in der gleichen Reihenfolge, wie angefordert.
   */
  getMessage(id: number[]): { messageID: number, message: string; }[] {
    var messages: { messageID: number, message: string; }[] = new Array();
    for (let i = 0; i < id.length; i++) {
      if (this.language.length > id[i]) {
        messages.push({ messageID: id[i], message: this.language[id[i]] });
      } else {
        messages.push({ messageID: id[i], message: "" });
      }
    }
    return messages;
  }

  /**
   * Setzt eine neue Sprache
   * @param language die neue Sprache die geladen werden soll, Stelle 0 ist der Sprachencode und Stelle 1 ist der Sprachenname
   */
  setLanguage(language: string[]): boolean {
    if (language.length >= 2) {
      this.language = language;
      return true;
    } else {
      return false;
    }

  }
} export { Language };