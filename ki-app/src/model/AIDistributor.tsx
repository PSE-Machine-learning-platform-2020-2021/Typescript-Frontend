import { DeliveryFormat } from './DeliveryFormat';

/**
 * Diese Klasse verwaltet die Auslieferungsformalitäten für trainierte KI-Modelle.
 */
export class AIDistributor {
    private static readonly url: string = "../deliverance/";
    private static readonly headers = { 'ContentType': 'application/json' };
    private format: DeliveryFormat;
    private id: number;

    /**
     * Dieser Konstruktor erzeugt das Objekt in Abhängigkeit vom gewählten Auslieferungsformat. 
     * Dieses sorgt an verschiedenen Stellen im Programmablauf für unterschiedliche Vorgehensweisen.
     * @param format Das Auslieferungsformat.
     */
    constructor ( id: number, format: DeliveryFormat ) {
        this.format = format;
        this.id = id;
    }

    /**
     * Gibt in Abhängigkeit vom Auslieferungsformat entweder das fertige KI-Modell als 
     * ausführbare Datei zurück, oder sämtliche Daten, die nötig sind, um das KI-Modell 
     * später als Web-Anwendung auszuführen.
     * 
     * Der Return-Typ ist einzig aus dem Grund "any", weil sich so das Problem löst, dass
     * man von einem blanken Objekt keine spezifischen Eigenschaften erwarten kann.
     */
    getAIModel (): any {
        let data = this.sendRequest( { "id": this.id, "format": this.format, "job": "get" } );
        let success: boolean;
        try {
            success = Object.keys( data ).includes( "url" );
        }
        catch ( e ) {
            success = false;
        }
        if ( !success ) {
            throw new Error( "Connection issue: " + data.status + ": " + data.statusText );
        }
        switch ( this.format ) {
            case DeliveryFormat.EXE:
                throw new Error( "Not implemented." );
            //location.href = data.url;
            //return dataX;
            case DeliveryFormat.WEB_APP:
                return { "url": data.url };
            default:
                throw new Error( "Illegal delivery format." );
        }
    }

    /**
     * Diese Methode reicht die übergebenen E-Mail-Adressen an den Server weiter, damit dieser 
     * einen Link zum KI-Modell, dessen laufende Nummer im Objekt hinterlegt ist, 
     * an sämtliche dieser Adressen versendet.
     * 
     * @param emailList Die E-Mail-Adressen, an die der Server den Nutzungslink zum Modell versenden soll.
     * @returns True, wenn die Anfrage an den Server erfolgreich war, False andernfalls.
     */
    sendAIModel ( emailList: string[] ): boolean {
        let recipients: { "email": string; }[] = [];
        emailList.forEach( ( address ) => recipients[ recipients.length ] = { "email": address } );
        let data = this.sendRequest( { "recipients": JSON.stringify( recipients ), "id": this.id, "job": "send" } );
        let success: boolean;
        try {
            success = Object.keys( data ).includes( "result" );
        }
        catch ( e ) {
            success = false;
        }
        if ( success ) {
            return data.result;
        }
        return false;
    }

    /**
     * Diese Methode schickt die Anfrage an den Server raus.
     * 
     * @param data Die Daten, die mit der Anfrage zu versenden sind.
     */
    private sendRequest ( data: object ): any {
        return new Promise( function ( resolve, reject ) {
            let xhr = new XMLHttpRequest(); // XHR ist kurz für XmlHttpRequest
            xhr.open( "POST", AIDistributor.url, true );
            xhr.onreadystatechange = () => {
                if ( xhr.readyState === 4 ) {
                    if ( xhr.status === 200 ) {
                        resolve( JSON.parse( xhr.responseText ) );
                    }
                    reject( {
                        status: xhr.status,
                        statusText: xhr.statusText
                    } );
                }
            };
            xhr.onerror = function () {
                reject( {
                    status: this.status,
                    statusText: xhr.statusText
                } );
            };
            for ( const [ header, content ] of Object.entries( AIDistributor.headers ) ) {
                xhr.setRequestHeader( header, content );
            }
            xhr.send( JSON.stringify( data ) );
        } ).then( ( resolve ) => resolve, ( reject ) => reject );
    }

    /**
     * Diese Methode wird verwendet, um aus einem aus der Datenbank geladenen 
     * KI-Modell (Scaler und Classifier) eine gebrauchsfertige Anwendung zu erstellen.
     * 
     * Diese Methode ist sinnlos, da eine Datei auf dem Server liegen muss, um heruntergeladen werden zu können.
     */
    private buildExecutable (): boolean {
        throw new Error( "Not Implemented" );
    }
}
