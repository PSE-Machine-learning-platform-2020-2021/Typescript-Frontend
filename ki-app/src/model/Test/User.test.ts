
import { DeviceData, Smartphone } from "../DeviceData";
import { AccelerometerData, GyroscopeData, SensorData } from "../SensorData";
import { Admin, AIModelUser, Dataminer, User } from "../User";

//1. Projekt (ohne extra Daten)
var projectID1: number;
var sessionID1: number;
var projectName1: string;
//new Project(projectID1, sessionID1, projectName1);

//2. Projekt (mit Datensatz ohne AIModelID)
var projectID2: number;
var sessionID2: number;
var projectName2: string;
var sensor: AccelerometerData | GyroscopeData;
var dataRowSensors1: (AccelerometerData | GyroscopeData)[];
var dataSetID1: number;
var dataSetName1: string;
var generateDate1: number;
var dataRow1: { value: number[], relativeTime: number; }[][];
var dataRows1: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[];
var labels1: { name: string, labelID: number, start: number, end: number; }[];
var sensor2: AccelerometerData | GyroscopeData;
var dataRowSensors2: (AccelerometerData | GyroscopeData)[];
var dataSetID2: number;
var dataSetName2: string;
var generateDate2: number;
var dataRow2: { value: number[], relativeTime: number; }[][];
var dataRows2: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[];
var labels2: { name: string, labelID: number, start: number, end: number; }[];
var projectData1: { dataSet: { dataRowSensors: (AccelerometerData | GyroscopeData)[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]; }[]; };
//new Project(projectID2, sessionID2, projectName2, projectData1);

//3. Projekt (mit Datensatz mit AIModelID)
var projectData2: { aiModelID: number[], dataSet: { dataRowSensors: (AccelerometerData | GyroscopeData)[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]; }[]; };
var projectID3: number;
var sessionID3: number;
var projectName3: string;
//new Project(projectID3, sessionID3, projectName3, projectData2);

var projectData: { aiModelID?: number[], dataSet: { dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate?: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label?: { name: string, labelID: number, start: number, end: number; }[]; }[]; };


var device = { deviceID: 7, deviceName: "SamsungS5", deviceType: "Smartphone", firmware: "Lollipop", generation: "7.3", MACADRESS: "abcdefg", sensorInformation: [] };
//ohne Projektdaten
var project1: { projectID: number, sessionID: number, projectName: string; projectData?: { aiModelID?: number[], dataSet: { dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]; }[]; }; };
//Ohne Ki Modelle
var project2: { projectID: number, sessionID: number, projectName: string, projectData: { dataSet: { dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]; }[]; }; };
//Mit Projektdaten
var project3: { projectID: number, sessionID: number, projectName: string, projectData: { aiModelID: number[], dataSet: { dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]; }[]; }; };

/**
 * Sollte vor jedem Test mit Projekt ausgeführt werden, es lädt die erwarteten Daten.
 */
function clearProjectStart() {
    //1. Projekt (ohne extra Daten)
    projectID1 = 93;
    sessionID1 = 234;
    projectName1 = "Das Örtliche";
    //new Project(projectID1, sessionID1, projectName1);

    //2. Projekt (mit Datensatz ohne AIModelID)
    projectID2 = 931;
    sessionID2 = 233;
    projectName2 = "Bingo";
    sensor = new AccelerometerData(12, "abc", "Bernd");
    dataRowSensors1 = [sensor, sensor];
    dataSetID1 = 42;
    dataSetName1 = "Renn!";
    generateDate1 = 1234567;
    dataRow1 = [[{ value: [234, 1234, 5463], relativeTime: 165 }, { value: [2345, 12, 4], relativeTime: 166 }], [{ value: [24, 124, 563], relativeTime: 1625 }, { value: [23425, 122, 224], relativeTime: 1626 }]];
    dataRows1 = [{ dataRowID: 0, dataRow: dataRow1[0] }, { dataRowID: 1, dataRow: dataRow1[1] }];
    labels1 = [{ name: "er Rennt", labelID: 26, start: 15, end: 22 }, { name: "er Rennt wieder", labelID: 27, start: 26, end: 44 }];
    sensor2 = new GyroscopeData(13, "cdf", "Greta");
    dataRowSensors2 = [sensor, sensor2];
    dataSetID2 = 43;
    dataSetName2 = "RUN!";
    generateDate2 = 13337;
    dataRow2 = [[{ value: [7, 6, 5], relativeTime: 14 }, { value: [22, 33, 44], relativeTime: 236 }], [{ value: [24, 25, 26], relativeTime: 165 }, { value: [25, 24, 23], relativeTime: 22 }]];
    dataRows2 = [{ dataRowID: 0, dataRow: dataRow2[0] }, { dataRowID: 1, dataRow: dataRow2[1] }];
    labels2 = [{ name: "er lauft", labelID: 28, start: 150, end: 220 }, { name: "er lauft wieder", labelID: 29, start: 260, end: 440 }];
    projectData1 = { dataSet: [{ dataRowSensors: dataRowSensors1, dataSetID: dataSetID1, dataSetName: dataSetName1, generateDate: generateDate1, dataRows: dataRows1, label: labels1 }, { dataRowSensors: dataRowSensors2, dataSetID: dataSetID2, dataSetName: dataSetName2, generateDate: generateDate2, dataRows: dataRows2, label: labels2 }] };
    //new Project(projectID2, sessionID2, projectName2, projectData1);
    projectID3 = 9322;
    sessionID3 = 23;
    projectName3 = "Bingo!";
    //3. Projekt (mit Datensatz mit AIModelID)
    projectData2 = { aiModelID: [18, 122, 8293], dataSet: [{ dataRowSensors: dataRowSensors1, dataSetID: dataSetID1, dataSetName: dataSetName1, generateDate: generateDate1, dataRows: dataRows1, label: labels1 }, { dataRowSensors: dataRowSensors2, dataSetID: dataSetID2, dataSetName: dataSetName2, generateDate: generateDate2, dataRows: dataRows2, label: labels2 }] };
    //new Project(projectID2, sessionID2, projectName2, projectData2);

    project1 = { projectID: projectID1, projectName: projectName1, sessionID: sessionID1 };
    project2 = { projectID: projectID2, projectName: projectName2, sessionID: sessionID2, projectData: projectData1 };
    project3 = { projectID: projectID3, projectName: projectName3, sessionID: sessionID3, projectData: projectData2 };
}

/**
 * Prüft die einfache Nutzung als Admin
 */
test("create and getter Admin", () => {
    //Ohne device
    var admin = new Admin(1, 2, "Rudi", "rudi@g.d");
    expect(admin.getID()).toBe(1);
    expect(admin.getDevice().device?.getID()).toBe(2);
    expect(admin.getName()).toBe("Rudi");
    expect(admin.getEmail()).toBe("rudi@g.d");
    getterEmpty(admin);

    //Mit device
    var admin = new Admin(1, 2, "Rudi", "rudi@g.d", device);
    expect(admin.getID()).toBe(1);
    expect(admin.getDevice().device?.getID()).toBe(2);
    expect(admin.getName()).toBe("Rudi");
    expect(admin.getEmail()).toBe("rudi@g.d");
    getterEmpty(admin);
    //Negative ID
    var admin = new Admin(-233, 2, "Rudi", "rudi@g.d", device);
    expect(admin.getID()).toBe(-1);
    expect(admin.getDevice().device?.getID()).toBe(2);
    expect(admin.getName()).toBe("Rudi");
    expect(admin.getEmail()).toBe("rudi@g.d");
    getterEmpty(admin);
});

/**
 * Prüft die einfache Nutzung als Dataminer
 */
test("create and getter Dataminer", () => {
    //Mit Name
    var dataminer = new Dataminer(3, 4, "Rudolf");
    expect(dataminer.getID()).toBe(3);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("Rudolf");
    getterEmpty(dataminer);
    //Ohne Name
    var dataminer = new Dataminer(3, 4);
    expect(dataminer.getID()).toBe(3);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("");
    getterEmpty(dataminer);
    //Negative ID mit Name
    var dataminer = new Dataminer(-20, 4, "Rudolf");
    expect(dataminer.getID()).toBe(-1);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("Rudolf");
    getterEmpty(dataminer);
    //Negative ID ohne Name
    var dataminer = new Dataminer(-20, 4);
    expect(dataminer.getID()).toBe(-1);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("");
    getterEmpty(dataminer);
});

/**
 * Prüft die einfache Nutzung als AIModelUser
 */
test("create and getter AIModelUser", () => {
    //Mit Name
    var aiModelUser = new AIModelUser(5, 6, "Rüdiger");
    expect(aiModelUser.getID()).toBe(5);
    expect(aiModelUser.getDevice().device?.getID()).toBe(6);
    expect(aiModelUser.getName()).toBe("Rüdiger");
    getterEmpty(aiModelUser);
    //Ohne Name
    var aiModelUser = new AIModelUser(5, 6);
    expect(aiModelUser.getID()).toBe(5);
    expect(aiModelUser.getDevice().device?.getID()).toBe(6);
    expect(aiModelUser.getName()).toBe("");
    getterEmpty(aiModelUser);
    //Negative ID mit Name
    var aiModelUser = new AIModelUser(-234, 6, "Rüdiger");
    expect(aiModelUser.getID()).toBe(-1);
    expect(aiModelUser.getDevice().device?.getID()).toBe(6);
    expect(aiModelUser.getName()).toBe("Rüdiger");
    getterEmpty(aiModelUser);
    //Negative ID ohne Name
    var aiModelUser = new AIModelUser(-2341, 6);
    expect(aiModelUser.getID()).toBe(-1);
    expect(aiModelUser.getDevice().device?.getID()).toBe(6);
    expect(aiModelUser.getName()).toBe("");
    getterEmpty(aiModelUser);
});

/**
 * Prüft die einfache Nutzung als User
 * @param user neu erstellter User
 */
function getterEmpty(user: User) {
    expect(user.getCurrentProjectID()).toBe(-1);
    expect(user.getCurrentDataSetID()).toBe(-1);
    expect(user.getSessionID()).toBe(-1);
    expect(user.getDataRows(12).dataRows).toStrictEqual([]);
    expect(user.getCurrentDataRows().dataRows).toStrictEqual([]);
    expect(user.getLabels().labels).toStrictEqual([]);
    expect(user.getDataSetMetas()).toStrictEqual([]);
}

/**
 * Prüft, ob loadProject als Admin fehlerfrei läuft
 */
test("loadProject Admin", () => {
    clearProjectStart();
    var admin = new Admin(12, 2, "Rudi", "rudi@g.d", device);
    expect(admin.loadProject(project1)).toBeTruthy();
    checkProject(admin, project1);
    expect(admin.loadProject(project2)).toBeTruthy();
    checkProject(admin, project2);
    expect(admin.loadProject(project3)).toBeTruthy();
    checkProject(admin, project3);
    expect(admin.loadProject(project2)).toBeTruthy();
    checkProject(admin, project2);
});

/**
 * Prüft, ob loadProject als Dataminer fehlerfrei läuft
 */
test("loadProject Dataminer", () => {
    clearProjectStart();
    var dataminer = new Dataminer(3, 4, "Rudolf");
    expect(dataminer.loadProject(project1)).toBeTruthy();
    checkProject(dataminer, project1);
    expect(dataminer.loadProject(project2)).toBeTruthy();
    checkProject(dataminer, project2);
    expect(dataminer.loadProject(project3)).toBeTruthy();
    checkProject(dataminer, project3);
});

/**
 * Prüft, ob loadProject als AiBuilder fehlerfrei läuft
 */
test("loadProject AiBuilder", () => {
    clearProjectStart();
    var aiModelUser = new AIModelUser(3, 4, "Rudolf");
    expect(aiModelUser.loadProject(project1)).toBeTruthy();
    checkProject(aiModelUser, project1);
    expect(aiModelUser.loadProject(project2)).toBeTruthy();
    checkProject(aiModelUser, project2);
    expect(aiModelUser.loadProject(project3)).toBeTruthy();
    checkProject(aiModelUser, project3);
});

/**
 * Prüft, ob createProject als Admin fehlerfrei läuft
 */
test("createProject Admin", () => {
    clearProjectStart();
    var admin = new Admin(12, 2, "Rudi", "rudi@g.d", device);
    var project1 = { projectID: 55, sessionID: 56, projectName: "Neu" };
    expect(admin.getCurrentProjectID()).toBe(-1);
    expect(admin.createProject(project1.projectID, project1.sessionID, project1.projectName)).toBeTruthy();
    checkProject(admin, project1);
    var project2 = { projectID: 70, sessionID: 30, projectName: "Neuer" };
    expect(admin.createProject(project2.projectID, project2.sessionID, project2.projectName)).toBeTruthy();
    checkProject(admin, project2);
    expect(admin.createProject(project1.projectID, project1.sessionID, project1.projectName)).toBeFalsy();
    checkProject(admin, project2);
});

/**
 * Prüft, ob addDatapoint fehlerfrei läuft
 */
test("addDatapoint", () => {
    clearProjectStart();
    var admin = new Admin(12, 2, "Rudi", "rudi@g.d", device);
    expect(admin.addDatapoint(1, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors1, 2, "asd")).toBeFalsy();
    expect(admin.deleteDataSet(2)).toBeFalsy();
    expect(admin.createLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(admin.deleteLabel(2)).toBeFalsy();
    expect(admin.setLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(admin.loadProject(project1)).toBeTruthy();
    addDataPointTest(admin, project1);
    clearProjectStart();
    var dataminer = new Dataminer(12, 2, "Rudi");
    expect(dataminer.addDatapoint(1, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(dataminer.createDataSet(dataRowSensors1, 2, "asd")).toBeFalsy();
    expect(dataminer.deleteDataSet(2)).toBeFalsy();
    expect(dataminer.createLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(dataminer.deleteLabel(2)).toBeFalsy();
    expect(dataminer.setLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(dataminer.loadProject(project1)).toBeTruthy();
    addDataPointTest(dataminer, project1);
    clearProjectStart();
    var aiModelUser = new AIModelUser(12, 2, "Rudi");
    expect(aiModelUser.createDataSet(dataRowSensors1, 2, "asd")).toBeFalsy();
    expect(aiModelUser.deleteDataSet(2)).toBeFalsy();
    expect(aiModelUser.createLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(aiModelUser.deleteLabel(2)).toBeFalsy();
    expect(aiModelUser.setLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(aiModelUser.loadProject(project1)).toBeTruthy();
    addDataPointTest(aiModelUser, project1);
});

/**
 * Prüft allgemein einen User, ob bei diesem addDataPoint fehlerfrei läuft
 * Funktioniert nur bei keinem geladenen projekt??
 */
function addDataPointTest(user: User, projectPar: any) {
    var project = projectPar;
    var dataSetID = dataSetID1;
    var dataSetName = "Alter Schwede";
    //Normale Benutzung
    if (project.projectData == null) {
        expect(user.createDataSet(dataRowSensors2, dataSetID, dataSetName)).toBeTruthy();
        project.projectData = { dataSet: [{ dataRowSensors: dataRowSensors2, dataSetID, dataSetName: dataSetName, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }] }] };
    } else {
        user.getDataRows(dataSetID1);
    }
    expect(user.addDatapoint(0, { value: [1, 2, 3], relativeTime: 12 })).toBeTruthy();
    project.projectData.dataSet[0].dataRows[0].dataRow.push({ value: [1, 2, 3], relativeTime: 12 });
    expect(user.addDatapoint(1, { value: [7, 8, 9], relativeTime: 14 })).toBeTruthy();
    project.projectData.dataSet[0].dataRows[1].dataRow.push({ value: [7, 8, 9], relativeTime: 14 });
    checkProject(user, project);
    //Mehrfache Anwendung
    for (let i = 0; i < 20; i++) {
        expect(user.addDatapoint(0, { value: [4 + i, 5 + 2 * i, 6 + 3 * i], relativeTime: 1 + i + i })).toBeTruthy();
        project.projectData.dataSet[0].dataRows[0].dataRow.push({ value: [4 + i, 5 + 2 * i, 6 + 3 * i], relativeTime: 1 + i + i });
    }
    checkProject(user, project);
    //Datensatz kann nicht erstellt werden
    expect(user.addDatapoint(-1, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(user.addDatapoint(3, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(user.addDatapoint(0, { value: [], relativeTime: 12 })).toBeFalsy();
    expect(user.addDatapoint(0, { value: [1], relativeTime: 12 })).toBeFalsy();
    expect(user.addDatapoint(0, { value: [1, 2], relativeTime: 12 })).toBeFalsy();
    expect(user.addDatapoint(0, { value: [1, 2, 3, 3], relativeTime: 2 })).toBeFalsy();
    expect(user.addDatapoint(0, { value: [1, 2, 3], relativeTime: 12 })).toBeFalsy();
    expect(user.addDatapoint(0, { value: [1, 2, 3], relativeTime: -1 })).toBeFalsy();
    //Ohne aktuellen Datensatz
    expect(user.deleteDataSet(dataSetID)).toBeTruthy();
    project.projectData.dataSet.pop();
    expect(user.addDatapoint(0, { value: [1, 2, 3], relativeTime: 13 })).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    checkProject(user, project);
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * Prüft, ob deleteDataSet fehlerfrei läuft
 */
test("deleteDataSet", () => {
    clearProjectStart();
    var admin = new Admin(12, 2, "Rudi", "rudi@g.d", device);
    expect(admin.loadProject(project3)).toBeTruthy();
    var dataSet = projectData2.dataSet;
    //Normale Benutzung
    expect(admin.getDataSetMetas().length).toBe(2);
    expect(admin.deleteDataSet(dataSet[0].dataSetID)).toBeTruthy();
    expect(admin.getDataSetMetas().length).toBe(1);
    //DatensatzID existiert nicht
    expect(admin.deleteDataSet(dataSet[0].dataSetID)).toBeFalsy();
    expect(admin.deleteDataSet(-1)).toBeFalsy();
    expect(admin.deleteDataSet(512)).toBeFalsy();
    expect(admin.getDataSetMetas().length).toBe(1);
    //Neu erstellten Datensatz löschen
    expect(admin.createDataSet(dataRowSensors2, 712, "Schwedisch")).toBeTruthy();
    expect(admin.deleteDataSet(712)).toBeTruthy();
    expect(admin.getDataSetMetas().length).toBe(1);
    //Kein Datensatz geladen
    expect(admin.deleteDataSet(dataSet[1].dataSetID)).toBeTruthy();
    expect(admin.getDataSetMetas().length).toBe(0);
    expect(admin.deleteDataSet(-1)).toBeFalsy();
    expect(admin.deleteDataSet(512)).toBeFalsy();
    expect(admin.getDataSetMetas().length).toBe(0);
    //Test, dass keine falschen Änderungen aufkamen
    project3.projectData.dataSet = [];
    checkProject(admin, project3);
});

/**
 * Prüft, ob createDataSet ohne geladenem Datensatz fehlerfrei läuft
 */
test("createDataSet without loaded Datasets", () => {
    clearProjectStart();
    var admin = new Admin(12, 2, "Rudi", "rudi@g.d", device);
    admin.loadProject(project1);
    var dataSetID = 219;
    var dataSetName = "Alter Schwede";
    //Normale Benutzung
    expect(admin.createDataSet(dataRowSensors2, dataSetID, dataSetName)).toBeTruthy();
    project1.projectData = { dataSet: [{ dataRowSensors: dataRowSensors2, dataSetID, dataSetName: dataSetName, generateDate: 19, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] }], };
    checkProject(admin, project1);
    //Mehrfache Anwendung
    var dataSetIDArr = [36, 37, 38, 39];
    var dataSetNameArr = ["Hi", "Mein", "Name", "ist"];
    for (let i = 0; i < dataSetIDArr.length; i++) {
        expect(admin.createDataSet(dataRowSensors2, dataSetIDArr[i], dataSetNameArr[i])).toBeTruthy();
        project1.projectData!.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID: dataSetIDArr[i], dataSetName: dataSetNameArr[i], generateDate: 19, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] });
    }
    checkProject(admin, project1);
    //Datensatz kann nicht erstellt werden
    expect(admin.createDataSet([], 21, "Alter Schwede")).toBeFalsy();
    expect(admin.createDataSet([], 21, "Alter Schwede", 187222)).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, dataSetID, "Alter Schwede")).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, dataSetID, "Alter Schwede", 187222)).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, -1, "Alter Schwede")).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, -1, "Alter Schwede", 187222)).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, 21, "")).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, 21, "", 187222)).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, 21, "Alter Schwede", -1)).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    checkProject(admin, project1);
});

/**
 * Prüft, ob createDataSet mit geladenem Datensatz fehlerfrei läuft
 */
test("createDataSet with loaded Datasets", () => {
    clearProjectStart();
    //Normale Benutzung
    var admin = new Admin(12, 2, "Rudi", "rudi@g.d", device);
    expect(admin.loadProject(project3)).toBeTruthy();
    var dataSetID = 29;
    var dataSetName = "Mamma mia!";
    expect(admin.createDataSet(dataRowSensors2, dataSetID, dataSetName)).toBeTruthy();
    project3.projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID, dataSetName, generateDate: 12, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] });
    checkProject(admin, project3);
    //Mehrfache Anwendung
    var dataSetIDArr = [36, 37, 38, 39];
    var dataSetNameArr = ["Hi", "Mein", "Name", "ist"];
    for (let i = 0; i < dataSetIDArr.length; i++) {
        expect(admin.createDataSet(dataRowSensors2, dataSetIDArr[i], dataSetNameArr[i])).toBeTruthy();
        project3.projectData.dataSet.push({ dataRowSensors: dataRowSensors2, dataSetID: dataSetIDArr[i], dataSetName: dataSetNameArr[i], generateDate: 12, dataRows: [{ dataRowID: 0, dataRow: [] }, { dataRowID: 1, dataRow: [] }], label: [] });
    }
    checkProject(admin, project3);
    //Datensatz kann nicht erstellt werden
    expect(admin.createDataSet([], 219, "Alter Schwede")).toBeFalsy();
    expect(admin.createDataSet([], 219, "Alter Schwede", 187222)).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, -1, "Alter Schwede")).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, -1, "Alter Schwede", 187222)).toBeFalsy();
    expect(admin.createDataSet(dataRowSensors2, 219, "")).toBeFalsy();
    //Test, dass keine falschen Änderungen aufkamen
    checkProject(admin, project3);
});

/**
 * Prüft, ob setName fehlerfrei läuft
 */
test("setName", () => {
    var admin = new Admin(-233, 2, "Rudi", "rudi@g.d", device);
    admin.setName("Berta");
    expect(admin.getName()).toBe("Berta");
    var dataminer = new Dataminer(3, 4, "Rudolf");
    dataminer.setName("Berta");
    expect(dataminer.getName()).toBe("Berta");
    var aiModelUser = new AIModelUser(5, 6, "Rüdiger");
    aiModelUser.setName("Berta");
    expect(aiModelUser.getName()).toBe("Berta");
});

/**
 * Prüft, ob setDevice fehlerfrei läuft
 */
test("setDevice", () => {
    var admin = new Admin(-233, 2, "Rudi", "rudi@g.d", device);
    admin.setDevice(DeviceData.loadDevice(12));
    expect(admin.getDevice().device!.getID()).toBe(12);
    admin.setDevice(DeviceData.loadDevice(16));
    expect(admin.getDevice().device!.getID()).toBe(16);
    var dataminer = new Dataminer(3, 4, "Rudolf");
    dataminer.setDevice(DeviceData.loadDevice(12));
    expect(dataminer.getDevice().device!.getID()).toBe(12);
    dataminer.setDevice(DeviceData.loadDevice(13));
    expect(dataminer.getDevice().device!.getID()).toBe(13);
    var aiModelUser = new AIModelUser(5, 6, "Rüdiger");
    aiModelUser.setDevice(DeviceData.loadDevice(12));
    expect(aiModelUser.getDevice().device!.getID()).toBe(12);
    aiModelUser.setDevice(DeviceData.loadDevice(15));
    expect(aiModelUser.getDevice().device!.getID()).toBe(15);
});

/**
 * Prüft, ob createLabel, setLabel und deleteLabel fehlerfrei läuft
 */
test("Label", () => {
    clearProjectStart();
    var admin = new Admin(12, 2, "Rudi", "rudi@g.d", device);
    labelMethodCheck(admin);
    clearProjectStart();
    var dataminer = new Dataminer(12, 2, "Rudi");
    labelMethodCheck(dataminer);
    clearProjectStart();
    var aiModelUser = new AIModelUser(12, 2, "Rudi");
    labelMethodCheck(aiModelUser);


});

/**
 * Prüft alle Label Methoden der Klasse User
 * @param user neu erstellter User
 */
function labelMethodCheck(user: User) {
    expect(user.createLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(user.deleteLabel(2)).toBeFalsy();
    expect(user.setLabel(2, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(user.loadProject(project3)).toBeTruthy();
    user.getDataRows(dataSetID1);
    //createLabel
    expect(user.createLabel(14, { start: 0, end: 18 }, "cool")).toBeTruthy();
    project3.projectData.dataSet[0].label.push({ name: "cool", labelID: 14, start: 0, end: 18 });
    checkProject(user, project3);
    user.getDataRows(dataSetID1);
    expect(user.createLabel(14, { start: 0, end: 18 }, "cool")).toBeFalsy();
    expect(user.createLabel(15, { start: 7, end: 8 }, "cola")).toBeTruthy();
    project3.projectData.dataSet[0].label.push({ name: "cola", labelID: 15, start: 7, end: 8 });
    checkProject(user, project3);
    user.getDataRows(dataSetID1);
    //createLabel bei fehlerhaften übergabe
    expect(user.createLabel(15, { start: 12, end: 18 }, "label")).toBeFalsy();
    expect(user.createLabel(2, { start: -23, end: 18 }, "label")).toBeFalsy();
    expect(user.createLabel(2, { start: 23, end: 18 }, "label")).toBeFalsy();
    expect(user.createLabel(2, { start: 1, end: -2 }, "label")).toBeFalsy();
    //setLabel
    expect(user.setLabel(labels1[0].labelID, { start: 999, end: 1000 })).toBeTruthy();
    project3.projectData.dataSet[0].label[0] = { name: labels1[0].name, labelID: labels1[0].labelID, start: 999, end: 1000 };
    checkProject(user, project3);
    user.getDataRows(dataSetID1);
    expect(user.setLabel(labels1[1].labelID, { start: 99, end: 100 }, "Banana")).toBeTruthy();
    project3.projectData.dataSet[0].label[1] = { name: "Banana", labelID: labels1[1].labelID, start: 99, end: 100 };
    checkProject(user, project3);
    user.getDataRows(dataSetID1);
    //setLabel bei fehlerhaften übergabe
    expect(user.setLabel(99, { start: 1, end: 2 }, "label")).toBeFalsy();
    expect(user.setLabel(14, { start: -1, end: 2 }, "label")).toBeFalsy();
    expect(user.setLabel(14, { start: 1, end: -1 }, "label")).toBeFalsy();
    expect(user.setLabel(99, { start: 1, end: 2 })).toBeFalsy();
    expect(user.setLabel(14, { start: -1, end: 2 })).toBeFalsy();
    expect(user.setLabel(14, { start: 1, end: -1 })).toBeFalsy();
    checkProject(user, project3);
    user.getDataRows(dataSetID1);
    //deleteLabel
    labels1[2].labelID = 14;
    for (let j = 0; j < labels1.length; j++) {
        expect(user.deleteLabel(labels1[j].labelID)).toBeTruthy();
        for (let i = 0; i < project3.projectData.dataSet[0].label.length; i++) {
            if (project3.projectData.dataSet[0].label[i].labelID === labels1[j].labelID) {
                project3.projectData.dataSet[0].label.splice(i, 1);
            }
        }
        checkProject(user, project3);
        user.getDataRows(dataSetID1);
    }
    expect(user.setLabel(14, { start: 1, end: 2 }, "label")).toBeFalsy();
    expect(user.createLabel(14, { start: 0, end: 18 }, "cool")).toBeTruthy();
    expect(user.setLabel(14, { start: 1, end: 2 }, "label")).toBeTruthy();
    expect(user.deleteLabel(14)).toBeTruthy();
    checkProject(user, project3);
    user.getDataRows(dataSetID1);
    expect(user.deleteLabel(14)).toBeFalsy();
    expect(user.deleteLabel(222)).toBeFalsy();
}

/**
 * Prüft ob der übergebene User das übergebene Projekt geladen hat
 * @param user User der überprüft werden soll
 * @param project Das zu erwartende Projekt in user
 */
function checkProject(user: User, project: { projectID: number, sessionID: number, projectName: string, projectData?: { aiModelID?: number[], dataSet: { dataRowSensors: SensorData[], dataSetID: number, dataSetName: string, generateDate: number, dataRows: { dataRowID: number, dataRow: { value: number[], relativeTime: number; }[]; }[], label: { name: string, labelID: number, start: number, end: number; }[]; }[]; }; }) {
    expect(user.getCurrentProjectID()).toBe(project.projectID);
    expect(user.getSessionID()).toBe(project.sessionID);
    ///////////////////////////////////
    //projectName wird nicht getestet//
    ///////////////////////////////////
    if (project.projectData != null) {
        if (project.projectData.aiModelID != null) {
            /////////////////////////////////
            //AIModelID wird nicht getestet//
            /////////////////////////////////
        }
        for (let d = 0; d < project.projectData.dataSet.length; d++) {
            expect(user.getDataSetMetas()[d]).toStrictEqual({ dataSetID: project.projectData.dataSet[d].dataSetID, dataSetName: project.projectData.dataSet[d].dataSetName });
            expect(user.getDataRows(project.projectData.dataSet[d].dataSetID).dataRows).toStrictEqual(user.getCurrentDataRows().dataRows);
            expect(user.getCurrentDataRows().dataRows.length).toBe(project.projectData.dataSet[d].dataRows.length);
            for (let i = 0; i < project.projectData.dataSet[d].dataRows.length; i++) {
                //expect(user.getCurrentDataSetID()).toBe(project.projectData.dataSet[d].dataSetID);
                expect(user.getCurrentDataRows().dataRows[i].datapoint.length).toBe(project.projectData.dataSet[d].dataRows[i].dataRow.length);
                expect(user.getCurrentDataRows().dataRows[i].datapoint).toStrictEqual(project.projectData.dataSet[d].dataRows[i].dataRow);

                ///////////////////////////////////
                //DataRowID wird nicht verglichen//
                ///////////////////////////////////

                //////////////////////////////////////
                //SensorTypeID wird nicht verglichen//
                //////////////////////////////////////
            }
            expect(user.getCurrentDataSetID()).toBe(project.projectData.dataSet[d].dataSetID);
            if (project.projectData.dataSet[d].label != null) {
                expect(user.getLabels().labels).toStrictEqual(project.projectData.dataSet[d].label);
            } else {
                expect(user.getLabels().labels).toStrictEqual([]);
            }

        }
    }
}