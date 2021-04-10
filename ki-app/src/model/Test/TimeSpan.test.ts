import { TimeSpan } from "../TimeSpan";

/**
 * Prüft die einfache Nutzung
 */
test("creat and getter", () => {
    var timeSpan = new TimeSpan({ start: 12.1234, end: 88 });
    expect(timeSpan.getStart()).toBe(12.1234);
    expect(timeSpan.getEnd()).toBe(88);
    timeSpan = new TimeSpan({ start: -17.34, end: 22 });
    expect(timeSpan.getStart()).toBe(0);
    expect(timeSpan.getEnd()).toBe(22);
    timeSpan = new TimeSpan({ start: 17.34, end: 17 });
    expect(timeSpan.getStart()).toBe(17.34);
    expect(timeSpan.getEnd()).toBe(17.34);
});

/**
 * Prüft "setTimeSpan" an kritischen Stellen
 */
test("setTimeSpan", () => {
    const timeSpan = new TimeSpan({ start: 27, end: 58 });
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