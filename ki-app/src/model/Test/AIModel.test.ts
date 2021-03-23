import { AIModel } from "../AIModel";

/**
 * Prüft die einfache Nutzung, erstellen und prüfen ob der getter dies wieder zurück gibt
 */
test("creat and getter", () => {
    var aiModel = new AIModel(17);
    expect(aiModel.getID()).toBe(17);
    var aiModel = new AIModel(29);
    expect(aiModel.getID()).toBe(29);
});