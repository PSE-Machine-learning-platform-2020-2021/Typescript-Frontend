/**
 * Diese Klasse verwaltet die Interaktion mit dem Python-Backend und die zugehörige Kommunikation.
 * Sie ist verantwortlich für den Bau von KI-Modellen und für die Ausführung derselben.
 */
export class AIBuilder {
    private modelId: number
    private modelData: number

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

    }

    /**
     * Diese Methode ruft die Python-Schnittstelle auf dem Server auf, um ein KI-Modell einen Datensatz klassifizieren zu lassen.
     * @param dataSetId Die ID des Datensatzes, den das KI-Modell klassifizieren soll.
     * @param callBack Eine Rückmelde-Funktion des "aufrufenden" Controllers, mit der das Ergebnis der Klassifizierung an den Controller zurückgegeben wird.
     */
    classify(dataSetId: number, callBack: <T = unknown, R = unknown>(prediction: T) => R): void {

    }

    private setUpServerConnection(): unknown {
        return null
    }
}