import { Label } from "../Label";

/**
 * Prüft die einfache Nutzung
 */
test("creat and getter", () => {
    const label = new Label("Name", 17, 0.2345, 2.4521);
    expect(label.getID()).toBe(17);
    expect(label.getLabel().name).toBe("Name");
    expect(label.getLabel().id).toBe(17);
    expect(label.getLabel().start).toBe(0.2345);
    expect(label.getLabel().end).toBe(2.4521);
});

/**
 * Prüft "setLabel" an kritischen Stellen
 */
test("setLabel", () => {
    const label = new Label("Laufen", 28, 0, 17.456);
    //setLabel mit validem Zeitfenster
    label.setLabel({ start: 7.42, end: 19 });
    expect(label.getID()).toBe(28);
    expect(label.getLabel().name).toBe("Laufen");
    expect(label.getLabel().id).toBe(28);
    expect(label.getLabel().start).toBe(7.42);
    expect(label.getLabel().end).toBe(19);
    //setLabel mit invalidem Zeitfenster
    label.setLabel({ start: 19.25, end: 19 });
    expect(label.getID()).toBe(28);
    expect(label.getLabel().name).toBe("Laufen");
    expect(label.getLabel().id).toBe(28);
    expect(label.getLabel().start).toBe(7.42);
    expect(label.getLabel().end).toBe(19);
    //setLabel mit neuem Namen und validem Zeitfenster
    label.setLabel({ start: 19.25, end: 19.26 }, "Treppen steigen");
    expect(label.getID()).toBe(28);
    expect(label.getLabel().name).toBe("Treppen steigen");
    expect(label.getLabel().id).toBe(28);
    expect(label.getLabel().start).toBe(19.25);
    expect(label.getLabel().end).toBe(19.26);
    //setLabel mit neuem Namen und invalidem Zeitfenster
    label.setLabel({ start: 19.266, end: 19.26 }, "schlafen");
    expect(label.getID()).toBe(28);
    expect(label.getLabel().name).toBe("Treppen steigen");
    expect(label.getLabel().id).toBe(28);
    expect(label.getLabel().start).toBe(19.25);
    expect(label.getLabel().end).toBe(19.26);
});