import { isExternalModuleReference } from 'typescript';
import { DeliveryFormat } from './DeliveryFormat';

/**
 * Diese Klasse verwaltet die Auslieferungsformalitäten für trainierte KI-Modelle.
 */
export class AIDistributor {
    private static readonly url: string = "python/deliverance.php";
    private format: DeliveryFormat;
    private id: number;

    /**
     * Dieser Konstruktor erzeugt das Objekt in Abhängigkeit vom gewählten Auslieferungsformat. 
     * Dieses sorgt an verschiedenen Stellen im Programmablauf für unterschiedliche Vorgehensweisen.
     * @param format Das Auslieferungsformat.
     */
    constructor(id: number, format: DeliveryFormat) {
        this.format = format;
        this.id = id;
    }

    /**
     * Gibt in Abhängigkeit vom Auslieferungsformat entweder das fertige KI-Modell als 
     * ausführbare Datei zurück, oder sämtliche Daten, die nötig sind, um das KI-Modell 
     * später als Web-Anwendung auszuführen.
     */
    getAIModel(): object {
        let xhr = new XMLHttpRequest(); // XHR ist kurz für XmlHttpRequest
        let data = {};
        xhr.open("POST", AIDistributor.url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                }
                else {
                    console.log("Connection to server failed. Please try again.");
                }
            }
        };
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ "id": this.id, "format": this.format }));

        switch (this.format) {
            case DeliveryFormat.WEB_APP:
                return data;
            case DeliveryFormat.EXE:
                //location.href = data["exe"];//////////////////////erzeugt fehler!!!
                break;
            default:
                throw new Error("Illegal delivery format.");
        }
        return {};
    }

    /**
     * Diese Methode wird verwendet, um aus einem aus der Datenbank geladenen 
     * KI-Modell (Scaler und Classifier) eine gebrauchsfertige Anwendung zu erstellen.
     * 
     * Diese Methode ist sinnlos, da eine Datei auf dem Server liegen muss, um heruntergeladen werden zu können.
     */
    private buildExecutable(): boolean {
        throw new Error("Not Implemented");
    }
}
