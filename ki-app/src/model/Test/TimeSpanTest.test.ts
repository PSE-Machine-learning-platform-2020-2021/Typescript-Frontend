import { TimeSpan } from "../TimeSpan";

/**
 * Prüft die einfache Nutzung
 */
test("creat and getter", () => {
    const timeSpan = new TimeSpan(12, 88);
    expect(timeSpan.getStart()).toBe(12);
    expect(timeSpan.getEnd()).toBe(88);
});

/**
 * Prüft "setStart" an kritischen Stellen
 */
test("setStart", () => {
    const timeSpan = new TimeSpan(27, 58);
    expect(timeSpan.getStart()).toBe(27);
    //Normale Benutzung
    expect(timeSpan.setStart(37)).toBeTruthy();
    expect(timeSpan.getStart()).toBe(37);
    //Negativer Startwert
    expect(timeSpan.setStart(-5)).toBeFalsy();
    expect(timeSpan.getStart()).toBe(37);
    //Startwert ist größer als Endwert
    expect(timeSpan.setStart(100)).toBeFalsy();
    expect(timeSpan.getStart()).toBe(37);
});

/**
 * Prüft "setEnd" an kritischen Stellen
 */
test("setEnd", () => {
    const timeSpan = new TimeSpan(27, 58);
    expect(timeSpan.getEnd()).toBe(58);
    //Normale Benutzung
    expect(timeSpan.setEnd(99)).toBeTruthy();
    expect(timeSpan.getEnd()).toBe(99);
    //Startwert ist größer als Endwert
    expect(timeSpan.setEnd(22)).toBeFalsy();
    expect(timeSpan.getEnd()).toBe(99);
});