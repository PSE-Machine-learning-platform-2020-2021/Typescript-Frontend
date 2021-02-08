import { findAllByPlaceholderText } from "@testing-library/react"

/**
 * Diese Klasse verwaltet die Interaktion mit dem Python-Backend und die zugehörige Kommunikation.
 * Sie ist verantwortlich für den Bau von KI-Modellen und für die Ausführung derselben.
 */
export class AIBuilder {
    private modelId: number
    private static readonly url: string = "python/"
    private static readonly buildModel: string = "buildModel.php"
    private static readonly classify: string = "classify.php"

    /**
     * Erstellt den AIBuilder und übergibt ihm die ID des zu bearbeitenden Modells.
     * @param modelId Die ID des zu erstellenden oder zu verwendenden Modells
     */
    constructor(modelId: number) {
        this.modelId = modelId
    }

    /**
     * Ruft die Python-Schnittstelle auf dem Server auf, um ein KI-Modell zu erstellen und zu trainieren.
     * @param modelData Sämtliche relevanten Daten, um das gewünschte KI-Modell erstellen zu können.
     */
    applyModel(modelData: object): void {
        this.sendRequest(JSON.stringify(modelData), AIBuilder.url + AIBuilder.buildModel, console.log)
    }

    /**
     * Diese Methode ruft die Python-Schnittstelle auf dem Server auf, um ein KI-Modell einen Datensatz klassifizieren zu lassen.
     * @param dataSetId Die ID des Datensatzes, den das KI-Modell klassifizieren soll.
     * @param callBack Eine Rückmelde-Funktion des "aufrufenden" Controllers, mit der das Ergebnis der Klassifizierung an den Controller zurückgegeben wird.
     */
    classify(dataSetId: number, callBack: <R = unknown>(prediction: string|object) => R): void {
        let requestData: string = JSON.stringify({"classifier": this.modelId, "dataSet": dataSetId})
        this.sendRequest(requestData, AIBuilder.url + AIBuilder.classify, callBack)
    }

    /**
     * Diese private Methode fässt den Versandprozess der Subanfrage an den Anwendungsserver zusammen.
     * @param requestData Die mit der Anfrage zu versendenden Daten. Hat gültiges JSON zu sein, außer plainText ist gesetzt.
     * @param url Die Adresse, an die die Anfrage gestellt wird. Am besten was auf demselben Server, ansonsten bekommt der Browser nen Kasper.
     * @param successAction Eine Funktion, die bei erfolgreicher Durchführung der Anfrage auszuführen ist.
     * @param plainText Gibt an, dass die Daten als Plaintext zu versenden sind.
     */
    private sendRequest(requestData: string, url: string, successAction: <R = unknown>(param: string|object) => R, plainText: boolean = false) {
        let xhr = new XMLHttpRequest() // XHR ist kurz für XmlHttpRequest
        xhr.open("POST", url, true)
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let responseJSON: object
                    try {
                        responseJSON = JSON.parse(xhr.responseText)
                    }
                    catch (e) {
                        responseJSON = null
                    }
                    if(responseJSON == null) {
                        successAction(xhr.responseText)
                    }
                    else {
                        successAction(responseJSON)
                    }
                }
                else {
                    xhr.send(requestData)
                }
            }
        }
        if (!plainText) {
            xhr.setRequestHeader("Content-Type","application/json")
        }
        xhr.send(requestData)
    }
}
