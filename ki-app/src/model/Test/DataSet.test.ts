import { IDataRowSTRID } from "../DataRow";
import { DataSet } from "../DataSet";
import { ILabel } from "../Label";
import { SensorData } from "../SensorData";

/**
 * Prüft die einfache Nutzung
 */
test("creat and getter", () => {
    //Konstruktor ohne zusätze
    var dataSet = new DataSet(17, "Die tolle Aufnahme", 255, [{ sensorType: 2, dataRow: [], dataRowID: 0 }]);
    expect(dataSet.getID()).toBe(17);
    expect(dataSet.getLabels().length).toBe(0);
    var dataRow = dataSet.getDataRows()[0];
    expect(dataRow.sensorType).toBe(2);
    expect(dataRow.datapoint.length).toBe(0);
    expect(dataSet.getName()).toBe("Die tolle Aufnahme");
    //Konstruktor mit generateDate, dataRows
    const dataRows: IDataRowSTRID[] = [
        {
            sensorType: 2, dataRowID: 0, dataRow: [
                { value: [24, 12, 33.15], relativeTime: 2.12 },
                { value: [26, 7, 3.15], relativeTime: 259 }]
        },
        {
            sensorType: 2, dataRowID: 1, dataRow: [
                { value: [1, 2, 321.15], relativeTime: 2.122 },
                { value: [56, 0, 3.165], relativeTime: 270 }]
        }];
    const labels: ILabel[] = [
        { name: "abgehoben", labelID: 17, span: { start: 2.351, end: 3.1415 } },
        { name: "unterhoben", labelID: 18, span: { start: 2, end: 2.7 } }];
    var dataSet = new DataSet(33, "Die wundervolle Aufnahme", 132948239, dataRows, labels);
    expect(dataSet.getID()).toBe(33);
    for (let i = 0; i < dataRows.length; i++) {
        var datarow = dataSet.getDataRows()[i];
        expect(datarow.sensorType).toBe(2);
        for (let j = 0; j < dataRows[i].dataRow.length; j++) {
            for (let k = 0; k < dataRows[i].dataRow[j].value.length; k++) {
                expect(datarow.datapoint[j].value[k]).toBe(dataRows[i].dataRow[j].value[k]);
            }
            expect(datarow.datapoint[j].relativeTime).toBe(dataRows[i].dataRow[j].relativeTime);
        }
    }
    for (let i = 0; i < labels.length; i++) {
        expect(dataSet.getLabels()[i].name).toBe(labels[i].name);
        expect(dataSet.getLabels()[i].labelID).toBe(labels[i].labelID);
        expect(dataSet.getLabels()[i].span.start).toBe(labels[i].span.start);
        expect(dataSet.getLabels()[i].span.end).toBe(labels[i].span.end);
    }
    expect(dataSet.getName()).toBe("Die wundervolle Aufnahme");
});

/**
 * Prüft, ob addDatapoint ohne geladenen Datenreihen fehlerfrei läuft
 */
test("addDatapoint without a loaded Datarow", () => {
    var dataSet = new DataSet(17, "Die tolle Aufnahme", 132948239, [{ sensorType: 2, dataRowID: 0, dataRow: [] }, { sensorType: 3, dataRowID: 1, dataRow: [] }]);
    //laden getestet in getter und setter test
    //Normale Nutzung Sensor 1
    expect(dataSet.addDatapoint(0, [{ value: [6, 7, 8], relativeTime: 20 }])).toBeTruthy();
    var dataRow = dataSet.getDataRows()[0];
    expect(dataRow.datapoint.length).toBe(1);
    expect(dataRow.datapoint[0].relativeTime).toBe(20);
    expect(dataRow.datapoint[0].value[0]).toBe(6);
    expect(dataRow.datapoint[0].value[1]).toBe(7);
    expect(dataRow.datapoint[0].value[2]).toBe(8);
    //Normale Nutzung Sensor 2
    expect(dataSet.addDatapoint(1, [{ value: [9, 10, 11], relativeTime: 66 }])).toBeTruthy();
    var dataRow = dataSet.getDataRows()[1];
    expect(dataRow.datapoint.length).toBe(1);
    expect(dataRow.datapoint[0].relativeTime).toBe(66);
    expect(dataRow.datapoint[0].value[0]).toBe(9);
    expect(dataRow.datapoint[0].value[1]).toBe(10);
    expect(dataRow.datapoint[0].value[2]).toBe(11);
    //DatenreihenID existiert nicht
    expect(dataSet.addDatapoint(-1, [{ value: [1, 2, 3], relativeTime: 27 }])).toBeFalsy();
    expect(dataSet.addDatapoint(20, [{ value: [1, 2, 3], relativeTime: 27 }])).toBeFalsy();
    //Value ist leer
    expect(dataSet.addDatapoint(0, [{ value: [], relativeTime: 27 }])).toBeFalsy();
    expect(dataSet.addDatapoint(1, [{ value: [], relativeTime: 27 }])).toBeFalsy();
    //relativeTime ist negativ
    expect(dataSet.addDatapoint(0, [{ value: [1, 2, 3], relativeTime: -1 }])).toBeFalsy();
    expect(dataSet.addDatapoint(1, [{ value: [1, 2, 3], relativeTime: -1 }])).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    expect(dataSet.getID()).toBe(17);
    expect(dataSet.getLabels().length).toBe(0);
    var dataRowA = dataSet.getDataRows();
    expect(dataRowA[0].sensorType).toBe(2);
    expect(dataRowA[1].sensorType).toBe(3);
    expect(dataSet.getName()).toBe("Die tolle Aufnahme");
    var dataRow = dataSet.getDataRows()[0];
    expect(dataRow.datapoint.length).toBe(1);
    expect(dataRow.datapoint[0].relativeTime).toBe(20);
    expect(dataRow.datapoint[0].value[0]).toBe(6);
    expect(dataRow.datapoint[0].value[1]).toBe(7);
    expect(dataRow.datapoint[0].value[2]).toBe(8);
    var dataRow = dataSet.getDataRows()[1];
    expect(dataRow.datapoint.length).toBe(1);
    expect(dataRow.datapoint[0].relativeTime).toBe(66);
    expect(dataRow.datapoint[0].value[0]).toBe(9);
    expect(dataRow.datapoint[0].value[1]).toBe(10);
    expect(dataRow.datapoint[0].value[2]).toBe(11);
});

/**
 * Prüft, ob addDatapoint mit geladenen Datenreihen fehlerfrei läuft
 */
test("addDatapoint with a loaded Datarow and Labels", () => {
    const dataRows = [
        {
            sensorType: 2, dataRowID: 0, dataRow: [
                { value: [24, 12, 33.15], relativeTime: 2.12 },
                { value: [26, 7, 3.15], relativeTime: 259 }]
        },
        {
            sensorType: 3, dataRowID: 1, dataRow: [
                { value: [1, 2, 321.15], relativeTime: 2.122 },
                { value: [56, 0, 3.165], relativeTime: 270 }]
        }];
    const labels: ILabel[] = [
        { name: "abgehoben", labelID: 17, span: { start: 2.351, end: 3.1415 } },
        { name: "unterhoben", labelID: 18, span: { start: 2, end: 2.7 } }];
    var dataSet = new DataSet(33, "Die wundervolle Aufnahme", 132948239, dataRows, labels);
    //laden getestet in getter und setter test
    //Normale Nutzung Sensor 1
    expect(dataSet.addDatapoint(0, [{ value: [6, 7, 8], relativeTime: 20 }])).toBeTruthy();
    expect(dataSet.getDataRows()[0].datapoint.length).toBe(3);
    expect(dataSet.getDataRows()[0].datapoint[2].relativeTime).toBe(20);
    expect(dataSet.getDataRows()[0].datapoint[2].value[0]).toBe(6);
    expect(dataSet.getDataRows()[0].datapoint[2].value[1]).toBe(7);
    expect(dataSet.getDataRows()[0].datapoint[2].value[2]).toBe(8);
    //Normale Nutzung Sensor 2
    expect(dataSet.addDatapoint(1, [{ value: [9, 10, 11], relativeTime: 66 }])).toBeTruthy();
    expect(dataSet.getDataRows()[1].datapoint.length).toBe(3);
    expect(dataSet.getDataRows()[1].datapoint[2].relativeTime).toBe(66);
    expect(dataSet.getDataRows()[1].datapoint[2].value[0]).toBe(9);
    expect(dataSet.getDataRows()[1].datapoint[2].value[1]).toBe(10);
    expect(dataSet.getDataRows()[1].datapoint[2].value[2]).toBe(11);
    //DatenreihenID existiert nicht
    expect(dataSet.addDatapoint(-1, [{ value: [1, 2, 3], relativeTime: 27 }])).toBeFalsy();
    expect(dataSet.addDatapoint(20, [{ value: [1, 2, 3], relativeTime: 27 }])).toBeFalsy();
    //Value ist leer
    expect(dataSet.addDatapoint(0, [{ value: [], relativeTime: 27 }])).toBeFalsy();
    expect(dataSet.addDatapoint(1, [{ value: [], relativeTime: 27 }])).toBeFalsy();
    //relativeTime ist negativ
    expect(dataSet.addDatapoint(0, [{ value: [1, 2, 3], relativeTime: -1 }])).toBeFalsy();
    expect(dataSet.addDatapoint(1, [{ value: [1, 2, 3], relativeTime: -1 }])).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    expect(dataSet.getID()).toBe(33);
    expect(dataSet.getLabels().length).toBe(labels.length);
    for (let i = 0; i < labels.length; i++) {
        expect(dataSet.getLabels()[i].name).toBe(labels[i].name);
        expect(dataSet.getLabels()[i].labelID).toBe(labels[i].labelID);
        expect(dataSet.getLabels()[i].span.start).toBe(labels[i].span.start);
        expect(dataSet.getLabels()[i].span.end).toBe(labels[i].span.end);
    }
    expect(dataSet.getDataRows()[0].sensorType).toBe(2);
    expect(dataSet.getDataRows()[1].sensorType).toBe(3);
    expect(dataSet.getName()).toBe("Die wundervolle Aufnahme");
    expect(dataSet.getDataRows()[0].datapoint.length).toBe(3);
    expect(dataSet.getDataRows()[0].datapoint[2].relativeTime).toBe(20);
    expect(dataSet.getDataRows()[0].datapoint[2].value[0]).toBe(6);
    expect(dataSet.getDataRows()[0].datapoint[2].value[1]).toBe(7);
    expect(dataSet.getDataRows()[0].datapoint[2].value[2]).toBe(8);
    expect(dataSet.getDataRows()[1].datapoint.length).toBe(3);
    expect(dataSet.getDataRows()[1].datapoint[2].relativeTime).toBe(66);
    expect(dataSet.getDataRows()[1].datapoint[2].value[0]).toBe(9);
    expect(dataSet.getDataRows()[1].datapoint[2].value[1]).toBe(10);
    expect(dataSet.getDataRows()[1].datapoint[2].value[2]).toBe(11);
});

/**
 * Prüft, ob createLabel ohne geladenen Labels fehlerfrei läuft
 */
test("createLabel without loaded Labels", () => {
    var dataSet = new DataSet(32, "Die wundervolle Aufnahme", 132948239, [{ sensorType: 2, dataRowID: 0, dataRow: [] }, { sensorType: 3, dataRowID: 1, dataRow: [] }]);
    //laden getestet in getter und setter test
    //Normale Nutzung
    expect(dataSet.createLabel(1, { start: 200, end: 500 }, "Treppen laufen")).toBeTruthy();
    expect(dataSet.getLabels()[0].labelID).toBe(1);
    expect(dataSet.getLabels()[0].span.start).toBe(200);
    expect(dataSet.getLabels()[0].span.end).toBe(500);
    expect(dataSet.getLabels()[0].name).toBe("Treppen laufen");
    //ID existiert schon
    expect(dataSet.createLabel(1, { start: 200, end: 500 }, "Treppen laufen")).toBeFalsy();
    //Zeitfenster falsch gewählt
    expect(dataSet.createLabel(4, { start: 200, end: 199 }, "Treppen laufen")).toBeFalsy();
    expect(dataSet.createLabel(4, { start: -1, end: 199 }, "Treppen laufen")).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    expect(dataSet.getID()).toBe(32);
    expect(dataSet.getDataRows()[0].sensorType).toBe(2);
    expect(dataSet.getDataRows()[1].sensorType).toBe(3);
    expect(dataSet.getLabels().length).toBe(1);
    expect(dataSet.getLabels()[0].labelID).toBe(1);
    expect(dataSet.getLabels()[0].span.start).toBe(200);
    expect(dataSet.getLabels()[0].span.end).toBe(500);
    expect(dataSet.getLabels()[0].name).toBe("Treppen laufen");
    expect(dataSet.getName()).toBe("Die wundervolle Aufnahme");
});

/**
 * Prüft, ob createLabel mit geladenen Labels fehlerfrei läuft
 */
test("createLabel with loaded Labels", () => {
    const dataRows = [
        {
            sensorType: 2, dataRowID: 0, dataRow: [
                { value: [24, 12, 33.15], relativeTime: 2.12 },
                { value: [26, 7, 3.15], relativeTime: 259 }]
        },
        {
            sensorType: 3, dataRowID: 1, dataRow: [
                { value: [1, 2, 321.15], relativeTime: 2.122 },
                { value: [56, 0, 3.165], relativeTime: 270 }]
        }];
    const labels: ILabel[] = [
        { name: "abgehoben", labelID: 17, span: { start: 2.351, end: 3.1415 } },
        { name: "unterhoben", labelID: 18, span: { start: 2, end: 2.7 } }];
    var dataSet = new DataSet(32, "Die wundervolle Aufnahme", 132948239, dataRows, labels);
    //laden getestet in getter und setter test
    //Normale Nutzung
    expect(dataSet.createLabel(3, { start: 200, end: 500 }, "Treppen laufen")).toBeTruthy();
    expect(dataSet.getLabels()[2].labelID).toBe(3);
    expect(dataSet.getLabels()[2].span.start).toBe(200);
    expect(dataSet.getLabels()[2].span.end).toBe(500);
    expect(dataSet.getLabels()[2].name).toBe("Treppen laufen");
    //ID existiert schon
    expect(dataSet.createLabel(3, { start: 200, end: 500 }, "Treppen laufen")).toBeFalsy();
    expect(dataSet.createLabel(17, { start: 200, end: 500 }, "Treppen laufen")).toBeFalsy();
    expect(dataSet.createLabel(18, { start: 200, end: 500 }, "Treppen laufen")).toBeFalsy();
    //Zeitfenster falsch gewählt
    expect(dataSet.createLabel(4, { start: 200, end: 199 }, "Treppen laufen")).toBeFalsy();
    expect(dataSet.createLabel(4, { start: -1, end: 199 }, "Treppen laufen")).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    expect(dataSet.getID()).toBe(32);
    for (let i = 0; i < dataRows.length; i++) {
        for (let j = 0; j < dataRows[i].dataRow.length; j++) {
            for (let k = 0; k < dataRows[i].dataRow[j].value.length; k++) {
                expect(dataSet.getDataRows()[i].datapoint[j].value[k]).toBe(dataRows[i].dataRow[j].value[k]);
            }
            expect(dataSet.getDataRows()[i].datapoint[j].relativeTime).toBe(dataRows[i].dataRow[j].relativeTime);
        }
    }
    for (let i = 0; i < labels.length; i++) {
        expect(dataSet.getLabels()[i].name).toBe(labels[i].name);
        expect(dataSet.getLabels()[i].labelID).toBe(labels[i].labelID);
        expect(dataSet.getLabels()[i].span.start).toBe(labels[i].span.start);
        expect(dataSet.getLabels()[i].span.end).toBe(labels[i].span.end);
    }
    expect(dataSet.getDataRows()[0].sensorType).toBe(2);
    expect(dataSet.getDataRows()[1].sensorType).toBe(3);
    expect(dataSet.getLabels().length).toBe(3);
    expect(dataSet.getLabels()[2].labelID).toBe(3);
    expect(dataSet.getLabels()[2].span.start).toBe(200);
    expect(dataSet.getLabels()[2].span.end).toBe(500);
    expect(dataSet.getLabels()[2].name).toBe("Treppen laufen");
    expect(dataSet.getName()).toBe("Die wundervolle Aufnahme");
});

/**
 * Prüft, ob setLabel fehlerfrei läuft
 */
test("setLabel", () => {
    const dataRows = [
        {
            sensorType: 2, dataRowID: 0, dataRow: [
                { value: [24, 12, 33.15], relativeTime: 2.12 },
                { value: [26, 7, 3.15], relativeTime: 259 }]
        },
        {
            sensorType: 3, dataRowID: 1, dataRow: [
                { value: [1, 2, 321.15], relativeTime: 2.122 },
                { value: [56, 0, 3.165], relativeTime: 270 }]
        }];
    const labels: ILabel[] = [
        { name: "abgehoben", labelID: 17, span: { start: 2.351, end: 3.1415 } },
        { name: "unterhoben", labelID: 18, span: { start: 2, end: 2.7 } }];
    var dataSet = new DataSet(32, "Die wundervolle Aufnahme", 132948239, dataRows, labels);
    //laden getestet in getter und setter test
    //Normale Nutzung mit neuem Labelnamen
    expect(dataSet.setLabel(17, { start: 200, end: 500 }, "Treppen laufen")).toBeTruthy();
    expect(dataSet.getLabels()[0].labelID).toBe(17);
    expect(dataSet.getLabels()[0].span.start).toBe(200);
    expect(dataSet.getLabels()[0].span.end).toBe(500);
    expect(dataSet.getLabels()[0].name).toBe("Treppen laufen");
    //Normale Nutzung ohne neuem Labelnamen
    expect(dataSet.setLabel(18, { start: 28, end: 55 })).toBeTruthy();
    expect(dataSet.getLabels()[1].labelID).toBe(18);
    expect(dataSet.getLabels()[1].span.start).toBe(28);
    expect(dataSet.getLabels()[1].span.end).toBe(55);
    expect(dataSet.getLabels()[1].name).toBe("unterhoben");
    //Datenreihen ID existiert nicht
    expect(dataSet.setLabel(-1, { start: 1, end: 2 }, "Fehler")).toBeFalsy();
    expect(dataSet.setLabel(1, { start: 3, end: 4 }, "Fehler")).toBeFalsy();
    expect(dataSet.setLabel(500, { start: 5, end: 6 })).toBeFalsy();
    expect(dataSet.setLabel(-1, { start: 7, end: 8 })).toBeFalsy();
    //Zeitfenster falsch gewählt
    expect(dataSet.setLabel(17, { start: 200, end: 199 }, "Fehler")).toBeFalsy();
    expect(dataSet.setLabel(18, { start: -1, end: 199 }, "Fehler")).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    expect(dataSet.getID()).toBe(32);
    for (let i = 0; i < dataRows.length; i++) {
        for (let j = 0; j < dataRows[i].dataRow.length; j++) {
            for (let k = 0; k < dataRows[i].dataRow[j].value.length; k++) {
                expect(dataSet.getDataRows()[i].datapoint[j].value[k]).toBe(dataRows[i].dataRow[j].value[k]);
            }
            expect(dataSet.getDataRows()[i].datapoint[j].relativeTime).toBe(dataRows[i].dataRow[j].relativeTime);
        }
    }
    expect(dataSet.getDataRows()[0].sensorType).toBe(2);
    expect(dataSet.getDataRows()[1].sensorType).toBe(3);
    expect(dataSet.getLabels().length).toBe(2);
    expect(dataSet.getLabels()[0].labelID).toBe(17);
    expect(dataSet.getLabels()[0].span.start).toBe(200);
    expect(dataSet.getLabels()[0].span.end).toBe(500);
    expect(dataSet.getLabels()[0].name).toBe("Treppen laufen");
    expect(dataSet.getLabels()[1].labelID).toBe(18);
    expect(dataSet.getLabels()[1].span.start).toBe(28);
    expect(dataSet.getLabels()[1].span.end).toBe(55);
    expect(dataSet.getLabels()[1].name).toBe("unterhoben");
    expect(dataSet.getName()).toBe("Die wundervolle Aufnahme");
});

/**
 * Prüft, ob deleteLabel fehlerfrei läuft
 */
test("deleteLabel", () => {
    const dataRows = [
        {
            sensorType: 2, dataRowID: 0, dataRow: [
                { value: [24, 12, 33.15], relativeTime: 2.12 },
                { value: [26, 7, 3.15], relativeTime: 259 }]
        },
        {
            sensorType: 3, dataRowID: 1, dataRow: [
                { value: [1, 2, 321.15], relativeTime: 2.122 },
                { value: [56, 0, 3.165], relativeTime: 270 }]
        }];
    const labels = [
        { name: "abgehoben", labelID: 17, span: { start: 2.351, end: 3.1415 } },
        { name: "unterhoben", labelID: 18, span: { start: 2, end: 2.7 } },
        { name: "Lufen", labelID: 19, span: { start: 5.23, end: 17 } }];
    var dataSet = new DataSet(32, "Die wundervolle Aufnahme", 132948239, dataRows, labels);
    //laden getestet in getter und setter test
    //Normale Nutzung
    expect(dataSet.getLabels().length).toBe(3);
    expect(dataSet.deleteLabel(19)).toBeTruthy();
    expect(dataSet.getLabels().length).toBe(2);
    //ID existiert nicht
    expect(dataSet.deleteLabel(-1)).toBeFalsy();
    expect(dataSet.deleteLabel(20)).toBeFalsy();
    expect(dataSet.deleteLabel(19)).toBeFalsy();
    expect(dataSet.getLabels().length).toBe(2);
    //Test, dass keine falschen Änderungen aufkamen
    expect(dataSet.getID()).toBe(32);
    for (let i = 0; i < dataRows.length; i++) {
        for (let j = 0; j < dataRows[i].dataRow.length; j++) {
            for (let k = 0; k < dataRows[i].dataRow[j].value.length; k++) {
                expect(dataSet.getDataRows()[i].datapoint[j].value[k]).toBe(dataRows[i].dataRow[j].value[k]);
            }
            expect(dataSet.getDataRows()[i].datapoint[j].relativeTime).toBe(dataRows[i].dataRow[j].relativeTime);
        }
    }
    for (let i = 0; i < labels.length - 1; i++) {
        expect(dataSet.getLabels()[i]).toStrictEqual(labels[i]);
    }
    expect(dataSet.getDataRows()[0].sensorType).toBe(2);
    expect(dataSet.getDataRows()[1].sensorType).toBe(3);
    expect(dataSet.getName()).toBe("Die wundervolle Aufnahme");
    //Nochmal normale Nutzung bis kein Label mehr verfügbar ist
    expect(dataSet.getLabels().length).toBe(2);
    expect(dataSet.deleteLabel(18)).toBeTruthy();
    expect(dataSet.getLabels().length).toBe(1);
    expect(dataSet.deleteLabel(17)).toBeTruthy();
    expect(dataSet.getLabels().length).toBe(0);
    //Normale Nutzung, ohne, dass ein Label existiert
    expect(dataSet.deleteLabel(17)).toBeFalsy();
    expect(dataSet.getLabels().length).toBe(0);
});