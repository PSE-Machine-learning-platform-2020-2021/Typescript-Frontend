import { Language, LanguageMessages } from "../Language";

/**
 * Prüft die einfache Nutzung, erstellen und prüfen ob der getter dies wieder zurück gibt
 */
test("create and getter", () => {
    const languageMessage: LanguageMessages = { code: "de-de", name: "Deutsch" };
    /*[
        "de-de",
        "Deutsch",
        "Accelerometer",
        "Gyroscope",
        "Magnetometer",
        "Wilkommen"
    ];*/
    var language = new Language(languageMessage);
    const loadedLanguage = language.getMessage();
    expect(loadedLanguage).toStrictEqual(languageMessage);
    expect(language.getLanguageCode()).toBe(languageMessage.code);
});

/**
 * Prüft, ob setLanguage fehlerfrei läuft
 */
test("setLanguage", () => {
    const languageMessage: LanguageMessages = { code: "de-de", name: "Deutsch" };
    const language = new Language(languageMessage);
    //Normale Benutzung
    const languageMessage2: LanguageMessages = { code: "ru-ru", name: "русский" };
    /*   "ru-ru",
        "русский",
        "Акселерометр",
        "Гироскоп",
        "Магнитометр",
        "Добро пожаловать",
        "до свидания"
    ];*/
    expect(language.setLanguage(languageMessage2)).toBeTruthy();
    var loadedLanguage = language.getMessage();
    expect(loadedLanguage).toStrictEqual(languageMessage2);
    expect(language.getLanguageCode()).toBe(languageMessage2.code);
});