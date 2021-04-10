import { IDataPoint } from "../DataPoint";
import { IDataRowRID } from "../DataRow";
import { ILabel } from "../Label";
import { IProjectData, Project } from "../Project";
import { SensorData } from "../SensorData";
import { IProject } from "../User";

//1. Projekt (ohne extra Daten)
var projectID1: number;
var sessionID1: number;
var projectName1: string;
//new Project(projectID1, sessionID1, projectName1);

//2. Projekt (mit Datensatz ohne AIModelID)
var projectID2: number;
var sessionID2: number;
var projectName2: string;
var sensor: SensorData;
var dataRowSensors1: SensorData[];
var dataSetID1: number;
var dataSetName1: string;
var generateDate1: number;
var dataRow1: IDataPoint[][];
var dataRows1: IDataRowRID[];
var labels1: ILabel[];
var sensor2: SensorData;
var dataRowSensors2: SensorData[];
var dataSetID2: number;
var dataSetName2: string;
var generateDate2: number;
var dataRow2: IDataPoint[][];
var dataRows2: IDataRowRID[];
var labels2: ILabel[];
var projectData1: IProjectData;
//new Project(projectID2, sessionID2, projectName2, projectData1);

//3. Projekt (mit Datensatz mit AIModelID)
var projectData2: IProjectData;
//new Project(projectID2, sessionID2, projectName2, projectData2);

var projectData: IProjectData;

/**
 * Sollte vor jedem Test ausgeführt werden, es lädt die erwarteten Daten.
 */
function clearStart() {
    //1. Projekt (ohne extra Daten)
    projectID1 = 93;
    sessionID1 = 234;
    projectName1 = "Das Örtliche";
    //new Project(projectID1, sessionID1, projectName1);

    //2. Projekt (mit Datensatz ohne AIModelID)
    projectID2 = 931;
    sessionID2 = 233;
    projectName2 = "Bingo";
    sensor = { id: 12, SensorTypeID: 2, MACADDRESS: "abc", deviceName: "Bernd" };
    dataRowSensors1 = [sensor, sensor];
    dataSetID1 = 42;
    dataSetName1 = "Renn!";
    generateDate1 = 1234567;
    dataRow1 = [[{ value: [234, 1234, 5463], relativeTime: 165 }, { value: [2345, 12, 4], relativeTime: 166 }], [{ value: [24, 124, 563], relativeTime: 1625 }, { value: [23425, 122, 224], relativeTime: 1626 }]];
    dataRows1 = [{ dataRowID: 12, dataRow: dataRow1[0] }, { dataRowID: 77, dataRow: dataRow1[1] }];
    labels1 = [{ name: "er Rennt", labelID: 26, span: { start: 15, end: 22 } }, { name: "er Rennt wieder", labelID: 27, span: { start: 26, end: 44 } }];
    sensor2 = { id: 13, SensorTypeID: 3, MACADDRESS: "cdf", deviceName: "Greta" };
    dataRowSensors2 = [sensor, sensor2];
    dataSetID2 = 43;
    dataSetName2 = "RUN!";
    generateDate2 = 13337;
    dataRow2 = [[{ value: [7, 6, 5], relativeTime: 14 }, { value: [22, 33, 44], relativeTime: 236 }], [{ value: [24, 25, 26], relativeTime: 165 }, { value: [25, 24, 23], relativeTime: 22 }]];
    dataRows2 = [{ dataRowID: 1, dataRow: dataRow2[0] }, { dataRowID: 777, dataRow: dataRow2[1] }];
    labels2 = [{ name: "er lauft", labelID: 28, span: { start: 150, end: 220 } }, { name: "er lauft wieder", labelID: 29, span: { start: 260, end: 440 } }];
    projectData1 = { dataSet: [{ dataRowSensors: dataRowSensors1, dataSetID: dataSetID1, dataSetName: dataSetName1, generateDate: generateDate1, dataRows: dataRows1, label: labels1 }, { dataRowSensors: dataRowSensors2, dataSetID: dataSetID2, dataSetName: dataSetName2, generateDate: generateDate2, dataRows: dataRows2, label: labels2 }] };
    //new Project(projectID2, sessionID2, projectName2, projectData1);

    //3. Projekt (mit Datensatz mit AIModelID)
    projectData2 = { aiModelID: [18, 122, 8293], dataSet: [{ dataRowSensors: dataRowSensors1, dataSetID: dataSetID1, dataSetName: dataSetName1, generateDate: generateDate1, dataRows: dataRows1, label: labels1 }, { dataRowSensors: dataRowSensors2, dataSetID: dataSetID2, dataSetName: dataSetName2, generateDate: generateDate2, dataRows: dataRows2, label: labels2 }] };
    //new Project(projectID2, sessionID2, projectName2, projectData2);
}


test("create and getter", () => {
    clearStart();
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

    //getDataRows von einem nicht existierenden Datensatz
    expect(project.getDataRows(219).dataRows.length).toBe(0);
});

/**
 * Prüft, ob addDatapoint ohne geladenem Datensatz fehlerfrei läuft
 */
test("addDatapoint without loaded Datasets", () => {
    clearStart();
    var project = new Project(projectID1, sessionID1, projectName1);
    var projectID = projectID1;
    var sessionID = sessionID1;
    var projectName = projectName1;
    var dataSetID = 219;
    var dataSetName = "Alter Schwede";
    //Normale Benutzung
    expect(project.createDataSet(dataRowSensors2, dataSetID, dataSetName)).toBeTruthy();
    projectData = { dataSet: [{ dataRowSensors: dataRowSensors2, dataSetID, dataSetName: dataSetName, generateDate: 12, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] }] };
    var currentDataRows = dataRowSensors2.length; //Da die Sensoren leere Datenreihen anlegen
    expect(project.addDatapoint(0, { value: [1, 2, 3], relativeTime: 12 })).toBeTruthy();
    projectData.dataSet[0].dataRows[0].dataRow.push({ value: [1, 2, 3], relativeTime: 12 });
    expect(project.addDatapoint(1, { value: [7, 8, 9], relativeTime: 14 })).toBeTruthy();
    projectData.dataSet[0].dataRows[1].dataRow.push({ value: [7, 8, 9], relativeTime: 14 });
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Mehrfache Anwendung
    for (let i = 0; i < 20; i++) {
        expect(project.addDatapoint(0, { value: [4 + i, 5 + 2 * i, 6 + 3 * i], relativeTime: 1 + i + i })).toBeTruthy();
        projectData.dataSet[0].dataRows[0].dataRow.push({ value: [4 + i, 5 + 2 * i, 6 + 3 * i], relativeTime: 1 + i + i });
    }
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Datensatz kann nicht erstellt werden
    expect(project.addDatapoint(-1, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(3, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2, 3, 3], relativeTime: 2 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2, 3], relativeTime: -1 })).toBeFalsy();
    //Ohne aktuellen Datensatz
    expect(project.deleteDataSet(dataSetID)).toBeTruthy();
    projectData.dataSet.pop();
    currentDataRows = 0; //Da gelöscht
    expect(project.addDatapoint(0, { value: [1, 2, 3], relativeTime: 13 })).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft, ob addDatapoint mit geladenem Datensatz fehlerfrei läuft
 */
test("addDatapoint with loaded Datasets", () => {
    clearStart();
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    projectData = projectData2;
    //Normale Benutzung
    project.getDataRows(dataSetID1);//Läd richtigen Datensatz als aktuellen Datensatz
    var currentDataRows = dataRowSensors2.length; //Da die Sensoren leere Datenreihen anlegen
    expect(project.addDatapoint(12, { value: [1, 2, 3], relativeTime: 12 })).toBeTruthy();
    projectData.dataSet[0].dataRows[0].dataRow.push({ value: [1, 2, 3], relativeTime: 12 });
    expect(project.addDatapoint(77, { value: [7, 8, 9], relativeTime: 14 })).toBeTruthy();
    projectData.dataSet[0].dataRows[1].dataRow.push({ value: [7, 8, 9], relativeTime: 14 });
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Mehrfache Anwendung
    project.getDataRows(dataSetID1);//Läd richtigen Datensatz als aktuellen Datensatz
    for (let i = 0; i < 20; i++) {
        expect(project.addDatapoint(12, { value: [4 + i, 5 + 2 * i, 6 + 3 * i], relativeTime: 1 + i + i })).toBeTruthy();
        projectData.dataSet[0].dataRows[0].dataRow.push({ value: [4 + i, 5 + 2 * i, 6 + 3 * i], relativeTime: 1 + i + i });
    }
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Datensatz kann nicht erstellt werden
    expect(project.addDatapoint(-1, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(3, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2, 3, 3], relativeTime: 2 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(project.addDatapoint(0, { value: [1, 2, 3], relativeTime: -1 })).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft, ob deleteDataSet fehlerfrei läuft
 */
test("deleteDataSet", () => {
    clearStart();
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
    //Neu erstellten Datensatz löschen
    expect(project.createDataSet(dataRowSensors2, 712, "Schwedisch")).toBeTruthy();
    expect(project.deleteDataSet(712)).toBeTruthy();
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
    var projectData = projectData2;
    projectData.dataSet = []; //Löschen der Datensätze 
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft, ob createDataSet ohne geladenem Datensatz fehlerfrei läuft
 */
test("createDataSet without loaded Datasets", () => {
    clearStart();
    var project = new Project(projectID1, sessionID1, projectName1);
    var projectID = projectID1;
    var sessionID = sessionID1;
    var projectName = projectName1;
    var dataSetID = 219;
    var dataSetName = "Alter Schwede";
    //Normale Benutzung
    expect(project.createDataSet(dataRowSensors2, dataSetID, dataSetName)).toBeTruthy();
    var projectData: IProjectData = { dataSet: [{ dataRowSensors: dataRowSensors2, dataSetID, dataSetName: dataSetName, generateDate: 123, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] }] };
    var currentDataRows = dataRowSensors2.length; //Da die Sensoren leere Datenreihen anlegen
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Mehrfache Anwendung
    var dataSetIDArr = [36, 37, 38, 39];
    var dataSetNameArr = ["Hi", "Mein", "Name", "ist"];
    for (let i = 0; i < dataSetIDArr.length; i++) {
        expect(project.createDataSet(dataRowSensors2, dataSetIDArr[i], dataSetNameArr[i])).toBeTruthy();
        projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID: dataSetIDArr[i], dataSetName: dataSetNameArr[i], generateDate: 1234, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] });
    }
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Datensatz kann nicht erstellt werden
    expect(project.createDataSet([], 21, "Alter Schwede")).toBeFalsy();
    expect(project.createDataSet([], 21, "Alter Schwede", 187222)).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, dataSetID, "Alter Schwede")).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, dataSetID, "Alter Schwede", 187222)).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, -1, "Alter Schwede")).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, -1, "Alter Schwede", 187222)).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, 21, "")).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, 21, "", 187222)).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, 21, "Alter Schwede", -1)).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft, ob createDataSet mit geladenem Datensatz fehlerfrei läuft
 */
test("createDataSet with loaded Datasets", () => {
    clearStart();
    //Normale Benutzung
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    var dataSetID = 29;
    var dataSetName = "Mamma mia!";
    expect(project.createDataSet(dataRowSensors2, dataSetID, dataSetName)).toBeTruthy();
    projectData = projectData2;
    projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID, dataSetName, generateDate: 42, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] });
    var currentDataRows = dataRowSensors2.length; //Da die Sensoren leere Datenreihen anlegen
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Mehrfache Anwendung
    var dataSetIDArr = [36, 37, 38, 39];
    var dataSetNameArr = ["Hi", "Mein", "Name", "ist"];
    for (let i = 0; i < dataSetIDArr.length; i++) {
        expect(project.createDataSet(dataRowSensors2, dataSetIDArr[i], dataSetNameArr[i])).toBeTruthy();
        projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID: dataSetIDArr[i], dataSetName: dataSetNameArr[i], generateDate: 2341, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] });
    }
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Datensatz kann nicht erstellt werden
    expect(project.createDataSet([], 219, "Alter Schwede")).toBeFalsy();
    expect(project.createDataSet([], 219, "Alter Schwede", 187222)).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, -1, "Alter Schwede")).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, -1, "Alter Schwede", 187222)).toBeFalsy();
    expect(project.createDataSet(dataRowSensors2, 219, "")).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft, ob createLabel fehlerfrei läuft
 */
test("createLabel", () => {
    clearStart();
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    var dataSetID = 12;
    var dataSetName = "Gib mir Labels";
    projectData = projectData2;
    //Normale benutzung auf aktueller Datenreihe
    project.getDataRows(dataSetID2); //Datensatz mit DatensatzID 43 als aktuellen Datensatz laden
    expect(project.createLabel(279, { start: 5, end: 17 }, "Aufstehen")).toBeTruthy();
    projectData.dataSet[1].label!.push({ name: "Aufstehen", labelID: 279, span: { start: 5, end: 17 } });
    project.getDataRows(dataSetID1); //Datensatz mit DatensatzID 42 als aktuellen Datensatz laden
    expect(project.createLabel(289, { start: 18, end: 18 }, "Pennen")).toBeTruthy();
    projectData.dataSet[0].label!.push({ name: "Pennen", labelID: 289, span: { start: 18, end: 18 } });
    var currentDataRows = 2;
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Bei neu erstelltem Datensatz
    project.createDataSet(dataRowSensors2, dataSetID, dataSetName);
    projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID, dataSetName, generateDate: 2342, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] });
    expect(project.createLabel(299, { start: 19, end: 22 }, "Pennen 2.0")).toBeTruthy();
    projectData.dataSet[2].label!.push({ name: "Pennen 2.0", labelID: 299, span: { start: 19, end: 22 } });
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Bei fehlerhaften übergabe
    expect(project.createLabel(-1, { start: 19, end: 22 }, "Pennen 2.0")).toBeFalsy();
    expect(project.createLabel(299, { start: 19, end: 22 }, "Pennen 2.0")).toBeFalsy();
    expect(project.createLabel(300, { start: -1, end: 22 }, "Pennen 2.0")).toBeFalsy();
    expect(project.createLabel(300, { start: 19, end: 5 }, "Pennen 2.0")).toBeFalsy();
    //ohne currentDataSet
    expect(project.deleteDataSet(dataSetID)).toBeTruthy();
    projectData.dataSet.pop();
    expect(project.createLabel(300, { start: 19, end: 22 }, "Me llamo")).toBeFalsy();
    currentDataRows = 0; //Da currentDataSet gelöscht wurde
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft, ob setLabel fehlerfrei läuft
 */
test("setLabel", () => {
    clearStart();
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    var dataSetID = 12;
    var dataSetName = "Gib mir Labels";
    projectData = projectData2;
    //Normale benutzung auf aktueller Datenreihe
    project.getDataRows(dataSetID1); //Datensatz mit DatensatzID 43 als aktuellen Datensatz laden
    expect(project.setLabel(26, { start: 5, end: 17 }, "Aufstehen")).toBeTruthy();
    projectData.dataSet[0].label![0] = { name: "Aufstehen", labelID: 26, span: { start: 5, end: 17 } };
    expect(project.setLabel(27, { start: 12, end: 15 },)).toBeTruthy();
    projectData.dataSet[0].label![1] = { name: labels1[1].name, labelID: 27, span: { start: 12, end: 15 } };
    project.getDataRows(dataSetID2); //Datensatz mit DatensatzID 42 als aktuellen Datensatz laden
    expect(project.setLabel(28, { start: 17, end: 20 }, "Pennen")).toBeTruthy();
    projectData.dataSet[1].label![0] = { name: "Pennen", labelID: 28, span: { start: 17, end: 20 } };
    expect(project.setLabel(29, { start: 18, end: 130 })).toBeTruthy();
    projectData.dataSet[1].label![1] = { name: labels2[1].name, labelID: 29, span: { start: 18, end: 130 } };
    var currentDataRows = 2;
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Bei neu erstelltem Datensatz
    project.createDataSet(dataRowSensors2, dataSetID, dataSetName);
    project.createLabel(30, { start: 15, end: 22 }, "er lief");
    projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID, dataSetName, generateDate: 456, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [{ name: "er lief", labelID: 30, span: { start: 15, end: 22 } }] });
    expect(project.setLabel(30, { start: 19, end: 23 }, "Pennen 2.0")).toBeTruthy();
    projectData.dataSet[2].label![0] = { name: "Pennen 2.0", labelID: 30, span: { start: 19, end: 23 } };
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Bei fehlerhaften übergabe
    expect(project.setLabel(-1, { start: 19, end: 22 }, "Pennen 2.0")).toBeFalsy();
    expect(project.setLabel(299, { start: 19, end: 22 }, "Pennen 2.0")).toBeFalsy();
    expect(project.setLabel(300, { start: -1, end: 22 }, "Pennen 2.0")).toBeFalsy();
    expect(project.setLabel(300, { start: 19, end: 5 }, "Pennen 2.0")).toBeFalsy();
    expect(project.setLabel(-1, { start: 19, end: 22 })).toBeFalsy();
    expect(project.setLabel(299, { start: 19, end: 22 })).toBeFalsy();
    expect(project.setLabel(300, { start: -1, end: 22 })).toBeFalsy();
    expect(project.setLabel(300, { start: 19, end: 5 })).toBeFalsy();
    //ohne currentDataSet
    project.getDataRows(dataSetID);
    expect(project.deleteDataSet(dataSetID)).toBeTruthy();
    projectData.dataSet.pop();
    expect(project.setLabel(300, { start: 19, end: 5 })).toBeFalsy();
    currentDataRows = 0; //Da currentDataSet gelöscht wurde
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft, ob deleteLabel fehlerfrei läuft
 */
test("deleteLabel", () => {
    clearStart();
    var project = new Project(projectID2, sessionID2, projectName2, projectData2);
    var projectID = projectID2;
    var sessionID = sessionID2;
    var projectName = projectName2;
    var dataSetID = 12;
    var dataSetName = "Gib mir Labels";
    projectData = projectData2;
    //Normale benutzung auf aktueller Datenreihe
    project.getDataRows(dataSetID1); //Datensatz mit DatensatzID 42 als aktuellen Datensatz laden
    expect(project.deleteLabel(labels1[1].labelID)).toBeTruthy();
    expect(project.getLabels().labels.length).toBe(1);
    projectData.dataSet[0].label!.pop();
    var currentDataRows = 2;
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    project.getDataRows(dataSetID1); //Datensatz mit DatensatzID 42 als aktuellen Datensatz laden (da checkAll auch den aktuellen Datensatz ändert)
    expect(project.deleteLabel(labels1[0].labelID)).toBeTruthy();
    expect(project.getLabels().labels.length).toBe(0);
    projectData.dataSet[0].label!.pop();
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Bei neu erstelltem Datensatz
    project.createDataSet(dataRowSensors2, dataSetID, dataSetName);
    project.createLabel(30, { start: 15, end: 22 }, "er lief");
    projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID, dataSetName, generateDate: 123, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [{ name: "er lief", labelID: 30, span: { start: 15, end: 22 } }] });
    expect(project.deleteLabel(30)).toBeTruthy();
    projectData.dataSet[2].label!.pop();
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
    //Bei fehlerhaften übergabe
    expect(project.deleteLabel(30)).toBeFalsy();
    expect(project.deleteLabel(-1)).toBeFalsy();
    project.getDataRows(dataSetID1); //Datensatz mit DatensatzID 42 als aktuellen Datensatz laden
    expect(project.deleteLabel(26)).toBeFalsy();
    expect(project.deleteLabel(27)).toBeFalsy();
    expect(project.deleteLabel(28)).toBeFalsy();
    expect(project.deleteLabel(29)).toBeFalsy();
    project.getDataRows(dataSetID2); //Datensatz mit DatensatzID 43 als aktuellen Datensatz laden
    expect(project.deleteLabel(26)).toBeFalsy();
    expect(project.deleteLabel(27)).toBeFalsy();
    //ohne currentDataSet
    project.getDataRows(dataSetID);
    expect(project.deleteDataSet(dataSetID)).toBeTruthy();
    projectData.dataSet.pop();
    expect(project.deleteLabel(30)).toBeFalsy();
    currentDataRows = 0; //Da currentDataSet gelöscht wurde
    checkAll(project, projectID, sessionID, projectName, currentDataRows, projectData);
});

/**
 * Prüft alle Parameter, ob diese im übergebenen Projekt gespeichert sind
 * @param project zu prüfende Projekt
 * @param projectID 
 * @param sessionID 
 * @param projectName 
 * @param currentDataRows Die Anzahl vom aktuellen Datensatz an Datenreihen
 * @param projectData Alle Daten zum AiModel, Datensatz und Label
 */
function checkAll(project: Project, projectID: number, sessionID: number, projectName: string, currentDataRows?: number, projectData?: IProjectData) {
    expect(project.getID()).toBe(projectID);
    expect(project.getSessionID()).toBe(sessionID);
    expect(project.getName()).toBe(projectName);
    if (projectData != null) {
        expect(project.getCurrentDataRows().dataRows.length).toBe(currentDataRows);
        expect(project.getDataSetMetas().length).toBe(projectData.dataSet.length);
        var dataSet = projectData.dataSet;
        for (let d = 0; d < dataSet.length; d++) {
            var loadedDataRows = project.getDataRows(dataSet[d].dataSetID);
            if (dataSet[d].dataRows != null) {
                expect(loadedDataRows.dataRows.length).toBe(dataSet[d].dataRows!.length);
                for (let i = 0; i < dataSet[d].dataRows!.length; i++) {
                    for (let j = 0; j < dataSet[d].dataRows![i].dataRow.length; j++) {
                        for (let k = 0; k < dataSet[d].dataRows![i].dataRow[j].value.length; k++) {
                            expect(loadedDataRows.dataRows[i].datapoint[j].value[k]).toBe(dataSet[d].dataRows![i].dataRow[j].value[k]);
                        }
                        expect(loadedDataRows.dataRows[i].datapoint[j].relativeTime).toBe(dataSet[d].dataRows![i].dataRow[j].relativeTime);
                    }
                }
            } else {
                expect(loadedDataRows.dataRows.length).toBe(0);
            }
            expect(project.getCurrentDataSetID()).toBe(dataSet[d].dataSetID);
            expect(project.getDataSetMetas()[d].dataSetID).toBe(dataSet[d].dataSetID);
            expect(project.getDataSetMetas()[d].dataSetName).toBe(dataSet[d].dataSetName);
            var loadedLabels = project.getLabels().labels;
            if (dataSet[d].label != null) {
                expect(loadedLabels.length).toBe(projectData.dataSet[d].label!.length);
                for (let i = 0; i < dataSet[d].label!.length; i++) {
                    expect(loadedLabels[i]).toStrictEqual(dataSet[d].label![i]);
                }
            } else {
                expect(loadedLabels.length).toBe(0);
            }
        }
    } else {
        expect(project.getCurrentDataSetID()).toBe(-1);
        expect(project.getLabels().labels.length).toBe(0);
    }

    ///////////////////////////////////////////////////////////////
    //ToDo Es wird nicht getestet ob die AIModel ID geladen wurde//
    ///////////////////////////////////////////////////////////////
    // ToDo Es wird nicht getestet ob generateDate übereinstimmt //
    ///////////////////////////////////////////////////////////////
}