import { Facade } from "../Facade";
import { DatabaseConnector } from "../DatabaseConnector";
import { AccelerometerData, SensorData } from "../SensorData";
import { Admin, User } from "../User";
import { AIBuilder } from "../AIBuilder";
import { DeliveryFormat } from "../DeliveryFormat";
import { AIDistributor } from "../AIDistributor";
import { Language } from "../Language";

facade: Facade;

const loginData = {
    admin: {
        adminID: 5,
        deviceID: 1,
        adminName: "TEST",
        email: "TEST",
        device: {
            deviceID: 1,
            deviceName: "TEST",
            deviceType: "TEST",
            firmware: "TEST",
            generation: "TEST",
            MACADRESS: "TEST",
            sensorInformation: [{
                sensorTypeID: 1,
                sensorName: "TEST",
                sensorUniqueID: 1
            }]
        }
    }
};

beforeEach(() => {
    DatabaseConnector.prototype.loadProject = jest.fn(() => {
        return Promise.resolve({ projectID: 1, sessionID: 1, projectName: "TEST", projectData: undefined });
    });
    DatabaseConnector.prototype.loadLanguage = jest.fn(() => {
        return Promise.resolve({
            code: "de-de",
            name: "Deutsch"
        });
    });
    DatabaseConnector.prototype.loginAdmin = jest.fn(() => {
        return Promise.resolve(loginData);
    });
    DatabaseConnector.prototype.createDataSet = jest.fn(() => {
        return Promise.resolve(99);
    });
    Admin.prototype.getCurrentProjectID = jest.fn(() => {
        return 1;
    });
    Admin.prototype.getEmail = jest.fn(() => {
        return loginData.admin.email;
    });
    Admin.prototype.getID = jest.fn(() => {
        return loginData.admin.adminID;
    });
    Admin.prototype.createDataSet = jest.fn(() => {
        return true;
    });
    Admin.prototype.getCurrentDataSetID = jest.fn(() => {
        return 99;
    });
});

test("Login", async () => {
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
});

test("Login, Projekt laden", async () => {
    let facade = new Facade("de-de");
    let input = { userID: -1, adminEmail: "NULL", projectID: -1 };
    DatabaseConnector.prototype.loadProject = jest.fn((newInput) => {
        input = newInput;
        return Promise.resolve({ projectID: 1, sessionID: 1, projectName: "TEST", projectData: undefined });
    });
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.loadProject(1);
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
    expect(input).toStrictEqual({ userID: loginData.admin.adminID, adminEmail: "TEST", projectID: 1 });
});

test("Login, load Project, createDataSet", async () => {
    let inputDB;
    let inputUser;
    DatabaseConnector.prototype.createDataSet = jest.fn((newInputDB) => {
        inputDB = newInputDB;
        return Promise.resolve(99);
    });
    Admin.prototype.createDataSet = jest.fn((sensoren, dataSetID, dataSetName) => {
        inputUser = { sensoren, dataSetID, dataSetName };
        return true;
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.loadProject(1);
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
    const promiseN = facade.createDataSet([2], "TEST", ["TEST_ROW"]);
    const success = await promiseN;
    expect(success).toBeGreaterThan(0);
    expect(inputDB).toStrictEqual({ sessionID: 1, projectID: 1, userID: loginData.admin.adminID, dataSetName: "TEST", dataRow: [{ sensorID: 2, datarowName: "TEST_ROW" }] });
    expect(inputUser).toStrictEqual({ sensoren: [new AccelerometerData(-1, "", "")], dataSetID: 99, dataSetName: "TEST" });
});

test("login und sendDataPoint", async () => {
    let inputUser;
    Admin.prototype.addDatapoint = jest.fn((dataRowID, datapoint) => {
        inputUser = { dataRowID, datapoint };
        return true;
    });
    let inputDB;
    DatabaseConnector.prototype.sendDataPoint = jest.fn(({ sessionID, userID, dataSetID, dataRowID, datapoint }) => {
        inputDB = { sessionID, userID, dataSetID, dataRowID, datapoint };
        return Promise.resolve(true);
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.loadProject(1);
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.sendDataPoint(64, { value: [5], relativeTime: 1 });
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
    expect(inputUser).toStrictEqual({ dataRowID: 64, datapoint: { value: [5], relativeTime: 1 } });
    expect(inputDB).toStrictEqual({ sessionID: 1, userID: 5, dataSetID: 99, dataRowID: 64, datapoint: { value: [5], relativeTime: 1 } });
});

test("login und getProjectMetas", async () => {
    let inputDB;
    DatabaseConnector.prototype.getProjectMetas = jest.fn(({ userID, adminEmail }) => {
        inputDB = { userID, adminEmail };
        return Promise.resolve([{ projectID: 44, projectName: "TEST", AIModelID: [8] }]);
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    let specialPromise = facade.getProjectMetas();
    let specialSucsess = await specialPromise;
    expect(specialSucsess).toStrictEqual([{ projectID: 44, projectName: "TEST", AIModelID: [8] }]);
});

test("login, loadProject und delete DataSet", async () => {
    Admin.prototype.deleteDataSet = jest.fn(() => {
        return true;
    });
    DatabaseConnector.prototype.deleteDataSet = jest.fn(() => {
        return Promise.resolve(true);
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.loadProject(1);
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.deleteDataSet(1);
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
});

test("register Admin", async () => {
    let inputDB;
    DatabaseConnector.prototype.registerAdmin = jest.fn((newInputDB) => {
        inputDB = newInputDB;
        return Promise.resolve({ adminID: 2, device: { deviceID: 2, sensorID: [2] } });
    });
    let facade = new Facade("de-de");
    let promise = facade.registerAdmin("TEST", "TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    expect(inputDB).toStrictEqual({ adminName: "TEST", adminEmail: "TEST", password: "TEST", device: { deviceID: -1, deviceName: "", deviceType: "", firmware: "", generation: "", MACADRESS: "", sensorInformation: [] } });
});

test("register Miner", async () => {
    let inputDB;
    DatabaseConnector.prototype.registerDataminer = jest.fn((newInputDB) => {
        inputDB = newInputDB;
        return Promise.resolve({ dataminerID: 5, device: { deviceID: 2, sensorID: [2] }, project: { projectID: 99, projectName: "TEST", sessionID: 5 } });
    });
    let facade = new Facade("de-de");
    let promise = facade.registerDataminer("TESTNAME", 5);
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
});

test("register Modeluser", async () => {
    let inputDB;
    DatabaseConnector.prototype.registerAIModelUser = jest.fn((newInputDB) => {
        inputDB = newInputDB;
        return Promise.resolve({ aiModelUserID: 1, device: { deviceID: 4, sensorID: [2] }, project: { projectID: 99, projectName: "TEST", sessionID: -1 } });
    });
    let facade = new Facade("de-de");
    let promise = facade.registerAIModelUser("TESTNAME", 5);
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
});

test("Projekt erstellen", async () => {
    DatabaseConnector.prototype.createProject = jest.fn(() => {
        return Promise.resolve({ projectID: 5, sessionID: 5 });
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.createProject("TEST");
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
});

test("Label erstellen", async () => {
    DatabaseConnector.prototype.createDataSet = jest.fn(() => {
        return Promise.resolve(4);
    });
    Admin.prototype.getCurrentDataSetID = jest.fn(() => {
        return 4;
    });
    Admin.prototype.createLabel = jest.fn(() => {
        return true;
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    let result = facade.createLabel({ start: 1, end: 2 }, "TEST");
    expect(result).toBeTruthy();
});

test("Label setzen", async () => {
    DatabaseConnector.prototype.setLabel = jest.fn(() => {
        return Promise.resolve(true);
    });
    Admin.prototype.getCurrentDataSetID = jest.fn(() => {
        return 4;
    });
    Admin.prototype.setLabel = jest.fn(() => {
        return true;
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    let result = facade.setLabel(5, { start: 1, end: 2 }, "TEST");
    expect(result).toBeTruthy();
});

test("Label loeschen", async () => {
    DatabaseConnector.prototype.deleteLabel = jest.fn(() => {
        return Promise.resolve(true);
    });
    Admin.prototype.getCurrentDataSetID = jest.fn(() => {
        return 4;
    });
    Admin.prototype.deleteLabel = jest.fn(() => {
        return true;
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    let result = facade.deleteLabel(5);
    expect(result).toBeTruthy();
});

test("Label erlangen", async () => {
    Admin.prototype.getLabels = jest.fn(() => {
        return {
            labels: [{
                name: "TEST",
                labelID: 5,
                start: 1,
                end: 4
            }]
        };
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    let result = facade.getLabels();
    expect(result).toBeTruthy();
});

test("klassifizieren", async () => {
    AIBuilder.prototype.classify = jest.fn(() => { });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    facade.classify(4, 2, jest.fn());
});

test("hole KI Model", async () => {
    AIDistributor.prototype.getAIModel = jest.fn(() => { });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    facade.getAIModel(4, 2);
});

test("Model Erstellen", async () => {
    AIBuilder.prototype.applyModel = jest.fn(() => { });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    facade.applyModel([5], "TEST", "TEST", "TEST", ["TEST"], 1, 0, 0);
});

test("Modell verteilen", async () => {
    AIDistributor.prototype.sendAIModel = jest.fn(() => { return true; });
    const facade = new Facade("de-de");
    const promise = facade.loginAdmin("TEST", "Test");
    const success = await promise;
    expect(success).toBeTruthy();
    expect(facade.sendAIModel(4, "test-1@example.com", "test-2@example.com")).toBeTruthy();
});

test("setze Sprache", async () => {
    DatabaseConnector.prototype.loadLanguage = jest.fn(() => {
        return Promise.resolve({
            code: "de-de",
            name: "Deutsch"
        });
    });
    Language.prototype.setLanguage = jest.fn(() => { return true; });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    promise = facade.setLanguage("ru-ru");
    sucsess = await promise;
    expect(sucsess).toBeTruthy();
});

test("hole Sprache", async () => {
    Language.prototype.getMessage = jest.fn(() => {
        return {
            code: "de-de",
            name: "Deutsch"
        }
            ;
    });
    let facade = new Facade("de-de");
    let promise = facade.loginAdmin("TEST", "TEST");
    let sucsess = await promise;
    expect(sucsess).toBeTruthy();
    let result = facade.getMessages();
    expect(result).toStrictEqual({
        code: "de-de",
        name: "Deutsch"
    });
});