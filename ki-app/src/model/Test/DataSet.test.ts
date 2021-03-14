import { DataSet } from "../DataSet";
import { AccelerometerData } from "../SensorData";

/**
 * Prüft die einfache Nutzung
 */
test("creat and getter", () => {
    //Konstruktor ohne zusätze
    var sensor = new AccelerometerData(111, "oben", "Samsung");
    var dataSet = new DataSet([sensor], 17, "Die tolle Aufnahme",);
    expect(dataSet.getID()).toBe(17);
    expect(dataSet.getLabels().length).toBe(0);
    expect(dataSet.getDataRows()[0].sensorType).toBe(2);
    expect(dataSet.getDataRows()[0].datapoint.length).toBe(0);
    expect(dataSet.getName()).toBe("Die tolle Aufnahme");
    //Konstruktor mit generateDate, dataRows
    const dataRows = [
        {
            dataRowID: 0, dataRow: [
                { value: [24, 12, 33.15], relativeTime: 2.12 },
                { value: [26, 7, 3.15], relativeTime: 259 }]
        },
        {
            dataRowID: 1, dataRow: [
                { value: [1, 2, 321.15], relativeTime: 2.122 },
                { value: [56, 0, 3.165], relativeTime: 270 }]
        }];
    const labels = [
        { name: "abgehoben", labelID: 17, start: 2.351, end: 3.1415 },
        { name: "unterhoben", labelID: 18, start: 2, end: 2.7 }];
    var dataSet = new DataSet([sensor, sensor], 33, "Die wundervolle Aufnahme", 132948239, dataRows, labels);
    expect(dataSet.getID()).toBe(33);
    for (let i = 0; i < dataRows.length; i++) {
        expect(dataSet.getDataRows()[i].sensorType).toBe(2);
        for (let j = 0; j < dataRows[i].dataRow.length; j++) {
            for (let k = 0; k < dataRows[i].dataRow[j].value.length; k++) {
                expect(dataSet.getDataRows()[i].datapoint[j].value[k]).toBe(dataRows[i].dataRow[j].value[k]);
            }
            expect(dataSet.getDataRows()[i].datapoint[j].relativeTime).toBe(dataRows[i].dataRow[j].relativeTime);
        }
    }
    for (let i = 0; i < labels.length; i++) {
        expect(dataSet.getLabels()[i].name).toBe(labels[i].name);
        expect(dataSet.getLabels()[i].id).toBe(labels[i].labelID);
        expect(dataSet.getLabels()[i].start).toBe(labels[i].start);
        expect(dataSet.getLabels()[i].end).toBe(labels[i].end);
    }
    expect(dataSet.getName()).toBe("Die wundervolle Aufnahme");
});


//TODO
test("addDatapoint", () => {

});

test("createLabel", () => {

});

test("setLabel", () => {

});

test("deleteLabel", () => {

});
