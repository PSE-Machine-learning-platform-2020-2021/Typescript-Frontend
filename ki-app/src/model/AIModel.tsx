/**
 * Diese Klasse beinhaltet nur die ID des AI Models, die auf das Model in der Datenbank verweist.
 */
class AIModel {
    private id: number; //Die AI Model ID.

    /**
     * Die übergebene ID muss mit der AIModel ID in der Datenbank übereinstimmen.
     * @param id AIModel ID
     */
    constructor(id: number) {
        this.id = id;
    }

    /**
     * Gibt die AIModel ID zurück.
     */
    getID(): number {
        return this.id;
    }
} export { AIModel };