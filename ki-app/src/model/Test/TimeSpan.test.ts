import { TimeSpan } from "../TimeSpan";

/**
 * Prüft die einfache Nutzung
 */
test("creat and getter", () => {
    const timeSpan = new TimeSpan(12.1234, 88);
    expect(timeSpan.getStart()).toBe(12.1234);
    expect(timeSpan.getEnd()).toBe(88);
});

/**
 * Prüft "setTimeSpan" an kritischen Stellen
 */
test("setTimeSpan", () => {
    const timeSpan = new TimeSpan(27, 58);
    expect(timeSpan.getStart()).toBe(27);
    //Normale Benutzung
    expect(timeSpan.setTimeSpan({ start: 59, end: 87 })).toBeTruthy();
    expect(timeSpan.getStart()).toBe(59);
    expect(timeSpan.getEnd()).toBe(87);
    //Negativer Startwert
    expect(timeSpan.setTimeSpan({ start: -5, end: 58 })).toBeFalsy();
    expect(timeSpan.getStart()).toBe(59);
    expect(timeSpan.getEnd()).toBe(87);
    //Startwert ist größer als Endwert
    expect(timeSpan.setTimeSpan({ start: 100, end: 77 })).toBeFalsy();
    expect(timeSpan.getStart()).toBe(59);
    expect(timeSpan.getEnd()).toBe(87);
});