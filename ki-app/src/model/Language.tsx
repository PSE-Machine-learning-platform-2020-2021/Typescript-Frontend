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
  private languagePromise: Promise<string[]>; //Alle Nachrichten auf der geladenen Sprache

  constructor(languagePromise: Promise<string[]>) {
    this.languagePromise = languagePromise;
  }


  /**
   * Gibt den Sprachen Code zurück
   */
  protected async getLanguageCode(): Promise<string> {
    let language = await this.languagePromise;
    if (language.length > 0) {
      return language[0];
    }
    return "";
  }

  /**
   * Gibt aus der geladenen Sprache die Nachrichten die über die IDs angegeben werden.
   * @param id Array von den IDs, von denen die Nachricht geladen werden soll
   * @returns id mit der Nachricht in der gleichen Reihenfolge, wie angefordert.
   */
  protected async getMessage(id: number[]): Promise<{ messageID: number, message: string; }[]> {
    let language = await this.languagePromise;
    var messages: { messageID: number, message: string; }[] = [];
    for (let i = 0; i < id.length; i++) {
      if (language.length > id[i]) {
        messages.push({ messageID: id[i], message: language[id[i]] });
      } else {
        messages.push({ messageID: id[i], message: "" });
      }
    }
    return messages;
  }

  /**
   * Setzt eine neue Sprache
   * @param languagePromise die neue Sprache die geladen werden soll, Stelle 0 ist der Sprachencode und Stelle 1 ist der Sprachenname
   */
  protected async setLanguagePromise(languagePromise: Promise<string[]>) {
    this.languagePromise = languagePromise;
  }
}