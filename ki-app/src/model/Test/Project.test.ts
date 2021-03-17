import { DataRow } from "../DataRow";
import { Project } from "../Project";
import { AccelerometerData } from "../SensorData";

test("create and setter", () => {
    //Einfache Erstellung ohne Daten
    var projectID = 93;
    var sessionID = 234;
    var projectName = "Ganz großes Kino!";
    var project = new Project(projectID, sessionID, projectName);
    expect(project.getID()).toBe(projectID);
    expect(project.getSessionID()).toBe(sessionID);
    expect(project.getName()).toBe(projectName);
    expect(project.getCurrentDataRows().dataRows.length).toBe(0);
    expect(project.getCurrentDataSetID()).toBe(-1);
    expect(project.getDataSetMetas().length).toBe(0);
    expect(project.getLabels().labels.length).toBe(0);
    //Erstellung mit Datensatz ohne AIModelID
    var projectID = 931;
    var sessionID = 233;
    var projectName = "Bingo";
    const sensor = new AccelerometerData(12, "abc", "Bernd");
    const dataRowSensors = [sensor, sensor];
    const dataSetID = 42;
    const dataSetName = "Renn!";
    const generateDate = 1234567;
    const dataRow = [[{ value: [234, 1234, 5463], relativeTime: 165 }, { value: [2345, 12, 4], relativeTime: 166 }], [{ value: [24, 124, 563], relativeTime: 1625 }, { value: [23425, 122, 224], relativeTime: 1626 }]];
    const dataRows = [{ dataRowID: 12, recordingStart: 1234, dataRow: dataRow[0] }, { dataRowID: 77, recordingStart: 9, dataRow: dataRow[1] }];
    const labels = [{ name: "er Rennt", labelID: 26, start: 15, end: 22 }, { name: "er Rennt wieder", labelID: 26, start: 26, end: 44 }];
    const projectData1 = { dataSet: [{ dataRowSensors, dataSetID, dataSetName, generateDate, dataRows, label: labels }] };
    var project = new Project(projectID, sessionID, projectName, projectData1);
    expect(project.getID()).toBe(projectID);
    expect(project.getSessionID()).toBe(sessionID);
    expect(project.getName()).toBe(projectName);
    expect(project.getCurrentDataRows().dataRows.length).toBe(0);
    var loadedDataRows = project.getDataRows(dataSetID);
    expect(loadedDataRows.dataRows.length).toBe(dataRow.length);
    for (let i = 0; i < dataRow.length; i++) {
        for (let j = 0; j < dataRow[i].length; j++) {
            for (let k = 0; k < dataRow[i][j].value.length; k++) {
                expect(loadedDataRows.dataRows[i].datapoint[j].value[k]).toBe(dataRow[i][j].value[k]);
            }
            expect(loadedDataRows.dataRows[i].datapoint[j].relativeTime).toBe(dataRow[i][j].relativeTime);
        }
    }
    expect(project.getCurrentDataSetID()).toBe(dataSetID);
    expect(project.getDataSetMetas().length).toBe(1);
    expect(project.getDataSetMetas()[0].dataSetID).toBe(dataSetID);
    expect(project.getDataSetMetas()[0].dataSetName).toBe(dataSetName);
    var loadedLabels = project.getLabels().labels;
    expect(loadedLabels.length).toBe(2);
    for (let i = 0; i < labels.length; i++) {
        expect(loadedLabels[i].name).toBe(labels[i].name);
        expect(loadedLabels[i].id).toBe(labels[i].labelID);
        expect(loadedLabels[i].start).toBe(labels[i].start);
        expect(loadedLabels[i].end).toBe(labels[i].end);
    }
    //Erstellung mit Datensatz mit AIModelID
    const projectData2 = { aiModelID: [18, 122, 8293], dataSet: [{ dataRowSensors, dataSetID, dataSetName, generateDate, dataRows, label: labels }] };
    project = new Project(projectID, sessionID, projectName, projectData2);
    expect(project.getID()).toBe(projectID);
    expect(project.getSessionID()).toBe(sessionID);
    expect(project.getName()).toBe(projectName);
    expect(project.getCurrentDataRows().dataRows.length).toBe(0);
    var loadedDataRows = project.getDataRows(dataSetID);
    expect(loadedDataRows.dataRows.length).toBe(dataRow.length);
    for (let i = 0; i < dataRow.length; i++) {
        for (let j = 0; j < dataRow[i].length; j++) {
            for (let k = 0; k < dataRow[i][j].value.length; k++) {
                expect(loadedDataRows.dataRows[i].datapoint[j].value[k]).toBe(dataRow[i][j].value[k]);
            }
            expect(loadedDataRows.dataRows[i].datapoint[j].relativeTime).toBe(dataRow[i][j].relativeTime);
        }
    }
    expect(project.getCurrentDataSetID()).toBe(dataSetID);
    expect(project.getDataSetMetas().length).toBe(1);
    expect(project.getDataSetMetas()[0].dataSetID).toBe(dataSetID);
    expect(project.getDataSetMetas()[0].dataSetName).toBe(dataSetName);
    var loadedLabels = project.getLabels().labels;
    expect(loadedLabels.length).toBe(2);
    for (let i = 0; i < labels.length; i++) {
        expect(loadedLabels[i].name).toBe(labels[i].name);
        expect(loadedLabels[i].id).toBe(labels[i].labelID);
        expect(loadedLabels[i].start).toBe(labels[i].start);
        expect(loadedLabels[i].end).toBe(labels[i].end);
    }
    //ToDo Es wird nicht getestet ob die AIModel ID geladen wurde
});

test("deleteDataSet", () => {

});

test("createDataSet", () => {

});

test("addDatapoint", () => {

});

test("createLabel", () => {

});

test("setLabel", () => {

});

test("deleteLabel", () => {

});
