import { Language } from "../Language";

test("create and setter", () => {
    const languageMessage: string[] = [
        "de-de",
        "Deutsch",
        "Accelerometer",
        "Gyroscope",
        "Magnetometer",
        "Wilkommen"
    ];
    const language = new Language(languageMessage);
    const loadedLanguage = language.getMessage([0, 1, 2, 3, 4, 5]);
    expect(loadedLanguage.length).toBe(languageMessage.length);
    for (let i = 0; i < loadedLanguage.length; i++) {
        expect(loadedLanguage[i].message).toBe(languageMessage[i]);
        expect(loadedLanguage[i].messageID).toBe(i);
    }
    expect(language.getLanguageCode()).toBe(languageMessage[0]);
});

test("setLanguage", () => {
    const languageMessage: string[] = [
        "de-de",
        "Deutsch",
        "Accelerometer",
        "Gyroscope",
        "Magnetometer",
        "Wilkommen"
    ];
    const language = new Language(languageMessage);
    //Normale Benutzung
    const languageMessage2: string[] = [
        "ru-ru",
        "русский",
        "Акселерометр",
        "Гироскоп",
        "Магнитометр",
        "Добро пожаловать",
        "до свидания"
    ];
    expect(language.setLanguage(languageMessage2)).toBeTruthy();
    var loadedLanguage = language.getMessage([0, 1, 2, 3, 4, 5, 6]);
    expect(loadedLanguage.length).toBe(languageMessage2.length);
    for (let i = 0; i < loadedLanguage.length; i++) {
        expect(loadedLanguage[i].message).toBe(languageMessage2[i]);
        expect(loadedLanguage[i].messageID).toBe(i);
    }
    expect(language.getLanguageCode()).toBe(languageMessage2[0]);
    //Neue Sprache ist leer
    expect(language.setLanguage([])).toBeFalsy();
    //Neue Sprache hat nur 2 Wörter
    expect(language.setLanguage(["1", "2"])).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    loadedLanguage = language.getMessage([0, 1, 2, 3, 4, 5, 6]);
    expect(loadedLanguage.length).toBe(languageMessage2.length);
    for (let i = 0; i < loadedLanguage.length; i++) {
        expect(loadedLanguage[i].message).toBe(languageMessage2[i]);
        expect(loadedLanguage[i].messageID).toBe(i);
    }
    expect(language.getLanguageCode()).toBe(languageMessage2[0]);
});