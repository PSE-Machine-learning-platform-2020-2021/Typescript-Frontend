import { DataRow } from "../DataRow";
import { Project } from "../Project";
import { AccelerometerData, SensorData } from "../SensorData";

//1. Projekt (ohne extra Daten)
const projectID1: number = 93;
const sessionID1: number = 234;
const projectName1 = "Das Örtliche";
//new Project(projectID1, sessionID1, projectName1);

//2. Projekt (mit Datensatz ohne AIModelID)
const projectID2 = 931;
const sessionID2 = 233;
const projectName2 = "Bingo";
const sensor = new AccelerometerData(12, "abc", "Bernd");
const dataRowSensors1 = [sensor, sensor];
const dataSetID1 = 42;
const dataSetName1 = "Renn!";
const generateDate1 = 1234567;
const dataRow1 = [[{ value: [234, 1234, 5463], relativeTime: 165 }, { value: [2345, 12, 4], relativeTime: 166 }], [{ value: [24, 124, 563], relativeTime: 1625 }, { value: [23425, 122, 224], relativeTime: 1626 }]];
const dataRows1 = [{ dataRowID: 12, recordingStart: 1234, dataRow: dataRow1[0] }, { dataRowID: 77, recordingStart: 9, dataRow: dataRow1[1] }];
const labels1 = [{ name: "er Rennt", labelID: 26, start: 15, end: 22 }, { name: "er Rennt wieder", labelID: 27, start: 26, end: 44 }];
const dataRowSensors2 = [sensor, sensor];
const dataSetID2 = 43;
const dataSetName2 = "RUN!";
const generateDate2 = 13337;
const dataRow2 = [[{ value: [7, 6, 5], relativeTime: 14 }, { value: [22, 33, 44], relativeTime: 236 }], [{ value: [24, 25, 26], relativeTime: 165 }, { value: [25, 24, 23], relativeTime: 22 }]];
const dataRows2 = [{ dataRowID: 1, recordingStart: 12345, dataRow: dataRow2[0] }, { dataRowID: 777, recordingStart: 90, dataRow: dataRow2[1] }];
const labels2 = [{ name: "er lauft", labelID: 28, start: 150, end: 220 }, { name: "er lauft wieder", labelID: 29, start: 260, end: 440 }];
const projectData1 = { dataSet: [{ dataRowSensors: dataRowSensors1, dataSetID: dataSetID1, dataSetName: dataSetName1, generateDate: generateDate1, dataRows: dataRows1, label: labels1 }, { dataRowSensors: dataRowSensors2, dataSetID: dataSetID2, dataSetName: dataSetName2, generateDate: generateDate2, dataRows: dataRows2, label: labels2 }] };
//new Project(projectID2, sessionID2, projectName2, projectData1);

//3. Projekt (mit Datensatz mit AIModelID)
const projectData2 = { aiModelID: [18, 122, 8293], dataSet: [{ dataRowSensors: dataRowSensors1, dataSetID: dataSetID1, dataSetName: dataSetName1, generateDate: generateDate1, dataRows: dataRows1, label: labels1 }, { dataRowSensors: dataRowSensors2, dataSetID: dataSetID2, dataSetName: dataSetName2, generateDate: generateDate2, dataRows: dataRows2, label: labels2 }] };
//new Project(projectID2, sessionID2, projectName2, projectData2);

test("create and setter", () => {
    //Einfache Erstellung ohne Daten (Projekt 1)
    var project = new Project(projectID1, sessionID1, projectName1);
    var projectID = projectID1;
    var sessionID = sessionID1;
    var projectName = projectName1;
    checkAll(project, projectID, sessionID, projectName);
    //Erstellung mit Datensatz ohne AIModelID (Projekt 2)
    var project = new Project(projectID2, sessionID2, projectName2, projectData1);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    var projectData = projectData1;
    var currentDataRows = 0; //Da nichts geladen wurde
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);

    //Erstellung mit Datensatz mit AIModelID (Projekt 3)
    project = new Project(projectID2, sessionID2, projectName2, projectData2);
    projectID = projectID2;
    sessionID = sessionID2;
    projectName = projectName2;
    projectData = projectData2;
    var currentDataRows = 0; //Da nichts geladen wurde
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

test("deleteDataSet", () => {
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var dataSet = projectData2.dataSet;
    //Normale Benutzung
    expect(project.getDataSetMetas().length).toBe(2);
    expect(project.deleteDataSet(dataSet[0].dataSetID)).toBeTruthy();
    expect(project.getDataSetMetas().length).toBe(1);
    //DatensatzID existiert nicht
    expect(project.deleteDataSet(dataSet[0].dataSetID)).toBeFalsy();
    expect(project.deleteDataSet(-1)).toBeFalsy();
    expect(project.deleteDataSet(512)).toBeFalsy();
    expect(project.getDataSetMetas().length).toBe(1);
    //Kein Datensatz geladen
    expect(project.deleteDataSet(dataSet[1].dataSetID)).toBeTruthy();
    expect(project.getDataSetMetas().length).toBe(0);
    expect(project.deleteDataSet(-1)).toBeFalsy();
    expect(project.deleteDataSet(512)).toBeFalsy();
    expect(project.getDataSetMetas().length).toBe(0);
    //Test, dass keine falschen Änderungen aufkamen
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;

    var currentDataRows = 0; //Es existiert kein Datensatz mehr
    var projectData = Object.assign({}, projectData2); //Copy
    projectData.dataSet = []; //Löschen der Datensätze 

    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    expect(projectData2.dataSet.length > 0).toBeTruthy();
});

test("createDataSet", () => {
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
});

test("addDatapoint", () => {
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    expect(project.getDataSetMetas().length).toBe(2);
});

test("createLabel", () => {
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    expect(project.getDataSetMetas().length).toBe(2);
});

test("setLabel", () => {
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    expect(project.getDataSetMetas().length).toBe(2);
});

test("deleteLabel", () => {
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    expect(project.getDataSetMetas().length).toBe(2);
});

function checkAll(project: Project, projectID: number, sessionID: number, projectName: string, currentDataRows?: number, projectData?: { aiModelID?: number[], dataSet: { dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, recordingStart: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]; }[]; }) {
    expect(project.getID()).toBe(projectID);
    expect(project.getSessionID()).toBe(sessionID);
    expect(project.getName()).toBe(projectName);
    if (projectData != null) {
        expect(project.getCurrentDataRows().dataRows.length).toBe(currentDataRows);
        expect(project.getDataSetMetas().length).toBe(projectData.dataSet.length);
        var dataSet = projectData.dataSet;
        for (let d = 0; d < dataSet.length; d++) {
            var loadedDataRows = project.getDataRows(dataSet[d].dataSetID);
            expect(loadedDataRows.dataRows.length).toBe(dataSet[d].dataRows.length);
            for (let i = 0; i < dataSet[d].dataRows.length; i++) {
                for (let j = 0; j < dataSet[d].dataRows[i].dataRow.length; j++) {
                    for (let k = 0; k < dataSet[d].dataRows[i].dataRow[j].value.length; k++) {
                        expect(loadedDataRows.dataRows[i].datapoint[j].value[k]).toBe(dataSet[d].dataRows[i].dataRow[j].value[k]);
                    }
                    expect(loadedDataRows.dataRows[i].datapoint[j].relativeTime).toBe(dataSet[d].dataRows[i].dataRow[j].relativeTime);
                }
            }
            expect(project.getCurrentDataSetID()).toBe(dataSet[d].dataSetID);
            expect(project.getDataSetMetas()[d].dataSetID).toBe(dataSet[d].dataSetID);
            expect(project.getDataSetMetas()[d].dataSetName).toBe(dataSet[d].dataSetName);
            var loadedLabels = project.getLabels().labels;
            expect(loadedLabels.length).toBe(2);//
            for (let i = 0; i < dataSet[d].label.length; i++) {
                expect(loadedLabels[i].name).toBe(dataSet[d].label[i].name);
                expect(loadedLabels[i].id).toBe(dataSet[d].label[i].labelID);
                expect(loadedLabels[i].start).toBe(dataSet[d].label[i].start);
                expect(loadedLabels[i].end).toBe(dataSet[d].label[i].end);
            }
        }
    } else {
        expect(project.getCurrentDataSetID()).toBe(-1);
        expect(project.getLabels().labels.length).toBe(0);
    }

    ///////////////////////////////////////////////////////////////
    //ToDo Es wird nicht getestet ob die AIModel ID geladen wurde//
    ///////////////////////////////////////////////////////////////
}