import { PageController } from "../../controller/PageController";

/**
 * Die Schnittstelle für Seiten
 */
export interface Page {

  /**
    * Durch diese Methode kann sich ein Controller als Beobachter anmelden.
    * @param oberver neuer Beobachter
    */
  attach(observer: PageController): void;

  /**
    * Durch diese Methode kann sich ein Controller als Beobachter abmelden.
    * @param oberver Beobachter der zu entfernen ist
    */
  detach(observer: PageController): void;

  /**
    * Durch diese Methode werden alle Beobachter über eine Änderung auf der Seite informiert.
    */
  notify(): void;

  /**
    * Gibt den Status der Seite zurück
    */
  getState(): any;

  /**
     * Setzt einen neuen Zustand für die Seite und aktualisiert sie
     * @param state neuer Zustand für die Seite
     */
  setState(newState: any): void;
}