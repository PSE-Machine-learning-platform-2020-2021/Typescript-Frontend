import {DeliveryFormat} from './DeliveryFormat'

/**
 * Diese Klasse verwaltet die Auslieferungsformalitäten für trainierte KI-Modelle.
 */
export class AIDistributor {
    private format: DeliveryFormat

    /**
     * Dieser Konstruktor erzeugt das Objekt in Abhängigkeit vom gewählten Auslieferungsformat. 
     * Dieses sorgt an verschiedenen Stellen im Programmablauf für unterschiedliche Vorgehensweisen.
     * @param format Das Auslieferungsformat.
     */
    constructor(format: DeliveryFormat) {
        this.format = format
    }
    
    /**
     * Gibt in Abhängigkeit vom Auslieferungsformat entweder das fertige KI-Modell als 
     * ausführbare Datei zurück, oder sämtliche Daten, die nötig sind, um das KI-Modell 
     * später als Web-Anwendung auszuführen.
     */
    getAIModel(): object  {
        return {}
    }

    /**
     * Diese Methode wird verwendet, um aus einem aus der Datenbank geladenen 
     * KI-Modell (Scaler und Classifier) eine gebrauchsfertige Anwendung zu erstellen.
     */
    private buildExecutable(): boolean {
        return false
    }

    /**
     * Diese Methode erzeugt einen Zugang zur Datenbank.
     * Ggf. ist eine Umbenennung sinnvoll, wenn diese Methode auch das KI-Modell holen soll.
     */
    private setUpDataBaseConnection(): void {

    }
}