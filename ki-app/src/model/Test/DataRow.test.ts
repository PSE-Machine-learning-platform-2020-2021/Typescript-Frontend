import { DataRow } from "../DataRow";
import { AccelerometerData } from "../SensorData";

/**
 * Prüft die einfache Nutzung, erstellen und prüfen ob der getter dies wieder zurück gibt
 */
test("creat and getter", () => {
  let sensorData1 = new AccelerometerData(234, "00-14-22-01-23-45", "Hubert");
  let datarow1 = new DataRow(sensorData1, 27);
  expect(datarow1.getDataRow().datapoint.length).toBe(0);
  expect(datarow1.getID()).toBe(27);
  expect(datarow1.getDataRow().sensorType).toBe(2);

  expect(datarow1.addDatapoint({ value: [55, 28, 95], relativeTime: 0.2345 })).toBeTruthy();
  expect(datarow1.getDataRow().datapoint[0].value[0]).toBe(55);
  expect(datarow1.getDataRow().datapoint[0].value[1]).toBe(28);
  expect(datarow1.getDataRow().datapoint[0].value[2]).toBe(95);
  expect(datarow1.getDataRow().datapoint[0].relativeTime).toBe(0.2345);
  expect(datarow1.getDataRow().datapoint.length).toBe(1);

  expect(datarow1.addDatapoint({ value: [1, 27, 1], relativeTime: 0.111 })).toBeTruthy();
  expect(datarow1.getDataRow().datapoint[1].value[0]).toBe(1);
  expect(datarow1.getDataRow().datapoint[1].value[1]).toBe(27);
  expect(datarow1.getDataRow().datapoint[1].value[2]).toBe(1);
  expect(datarow1.getDataRow().datapoint[1].relativeTime).toBe(0.111);
  expect(datarow1.getDataRow().datapoint.length).toBe(2);

  expect(datarow1.getID()).toBe(27);
  expect(datarow1.getDataRow().sensorType).toBe(2);
});

/**
 * Erzeugt mehrere Datenpunkte und prüft ob diese in der richtigen Reihenfolge sind sowie auf richtige werte
 * 
 * pos1 != pos2 ...
 * pos1 < length && pos2 < length...
 */
test("addDatapoint many points", () => {
  const sensorData = new AccelerometerData(1, "00-14-22-01-23-45", "Hubert");
  const datarow = new DataRow(sensorData, 27);
  const length = 50;
  const value0 = [1, 1, 1];
  const relativeTime0 = 1;
  const value1 = [22, 34, 17];
  const relativeTime1 = 999;
  const pos1 = 24;
  const value2 = [55, 27, 21];
  const relativeTime2 = 888;
  const pos2 = 38;
  for (let i = 0; i < length; i++) {
    if (i == pos1) {
      expect(datarow.addDatapoint({ value: value1, relativeTime: relativeTime1 })).toBeTruthy();
    } else if (i == pos2) {
      expect(datarow.addDatapoint({ value: value2, relativeTime: relativeTime2 })).toBeTruthy();
    } else {
      expect(datarow.addDatapoint({ value: value0, relativeTime: relativeTime0 })).toBeTruthy();
    }
  }
  for (let i = 0; i < length; i++) {
    if (i == pos1) {
      for (let j = 0; j < value1.length; j++) {
        expect(datarow.getDataRow().datapoint[i].value[j]).toBe(value1[j]);
      }
      expect(datarow.getDataRow().datapoint[i].relativeTime).toBe(relativeTime1);
    } else if (i == pos2) {
      for (let j = 0; j < value2.length; j++) {
        expect(datarow.getDataRow().datapoint[i].value[j]).toBe(value2[j]);
      }
      expect(datarow.getDataRow().datapoint[i].relativeTime).toBe(relativeTime2);
    } else {
      for (let j = 0; j < value0.length; j++) {
        expect(datarow.getDataRow().datapoint[i].value[j]).toBe(value0[j]);
      }
      expect(datarow.getDataRow().datapoint[i].relativeTime).toBe(relativeTime0);
    }
  }
});

/**
 * Prüft, ob bei negativer relativeTime der Datenpunkt nicht hinzu gefügt wird
 * 
 * relativeTime muss < 0 sein
 * value nicht leer
 */
test("addDatapoint with negative relativeTime", () => {
  const sensorData = new AccelerometerData(1, "00-14-22-01-23-45", "Hubert");
  const datarow = new DataRow(sensorData, 27);
  const value = [1, 1, 1];
  const relativeTime = -1;
  expect(datarow.addDatapoint({ value: value, relativeTime: relativeTime })).toBeFalsy();
});

/**
 * Prüft, ob bei leerem value der Datenpunkt nicht hinzu gefügt wird
 * 
 * relativeTime muss >= 0 sein
 * value leer
 */
test("addDatapoint with empty value", () => {
  const sensorData = new AccelerometerData(1, "00-14-22-01-23-45", "Hubert");
  const datarow = new DataRow(sensorData, 27);
  const value: number[] = [];
  const relativeTime = 1;
  expect(datarow.addDatapoint({ value: value, relativeTime: relativeTime })).toBeFalsy();
});