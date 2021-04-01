import { Facade } from "../Facade";
import { DatabaseConnector } from "../DatabaseConnector";
import { AccelerometerData, SensorData } from "../SensorData";
import { Admin, User } from "../User";

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
            sensorInformation: [ {
                sensorTypeID: 1,
                sensorName: "TEST",
                sensorUniqueID: 1
            } ]
        }
    }
};

beforeEach( () => {
    DatabaseConnector.prototype.loadProject = jest.fn( () => {
        return Promise.resolve( { projectID: 1, sessionID: 1, projectName: "TEST", projectData: undefined } );
    } );
    DatabaseConnector.prototype.loadLanguage = jest.fn( () => {
        return Promise.resolve( [ "TEST" ] );
    } );
    DatabaseConnector.prototype.loginAdmin = jest.fn( () => {
        return Promise.resolve( loginData );
    } );
    DatabaseConnector.prototype.createDataSet = jest.fn( () => {
        return Promise.resolve( 99 );
    } );
    Admin.prototype.getCurrentProjectID = jest.fn( () => {
        return 1;
    } );
    Admin.prototype.getEmail = jest.fn( () => {
        return loginData.admin.email;
    } );
    Admin.prototype.getID = jest.fn( () => {
        return loginData.admin.adminID;
    } );
    Admin.prototype.createDataSet = jest.fn( () => {
        return true;
    } );
    Admin.prototype.getCurrentDataSetID = jest.fn( () => {
        return 99;
    } );
} );

test( "Login", async () => {
    let facade = new Facade( "de-de" );
    let promise = facade.loginAdmin( "TEST", "TEST" );
    let sucsess = await promise;
    expect( sucsess ).toBeTruthy();
} );

test( "Login, Projekt laden", async () => {
    let facade = new Facade( "de-de" );
    let input = { userID: -1, adminEmail: "NULL", projectID: -1 };
    DatabaseConnector.prototype.loadProject = jest.fn( ( newInput ) => {
        input = newInput;
        return Promise.resolve( { projectID: 1, sessionID: 1, projectName: "TEST", projectData: undefined } );
    } );
    let promise = facade.loginAdmin( "TEST", "TEST" );
    let sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    promise = facade.loadProject( 1 );
    sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    expect( input ).toStrictEqual( { userID: loginData.admin.adminID, adminEmail: "TEST", projectID: 1 } );
} );

test( "Login, load Project, createDataSet", async () => {
    let inputDB;
    let inputUser;
    DatabaseConnector.prototype.createDataSet = jest.fn( ( newInputDB ) => {
        inputDB = newInputDB;
        return Promise.resolve( 99 );
    } );
    Admin.prototype.createDataSet = jest.fn( ( sensoren, dataSetID, dataSetName ) => {
        inputUser = { sensoren, dataSetID, dataSetName };
        return true;
    } );
    let facade = new Facade( "de-de" );
    let promise = facade.loginAdmin( "TEST", "TEST" );
    let sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    promise = facade.loadProject( 1 );
    sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    promise = facade.createDataSet( [ 2 ], "TEST", [ "TEST_ROW" ] );
    sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    expect( inputDB ).toStrictEqual( { sessionID: 1, projectID: 1, userID: loginData.admin.adminID, dataSetName: "TEST", dataRow: [ { sensorID: 2, datarowName: "TEST_ROW" } ] } );
    expect( inputUser ).toStrictEqual( { sensoren: [ new AccelerometerData( -1, "", "" ) ], dataSetID: 99, dataSetName: "TEST" } );
} );

test( "login  und sendDataPoint", async () => {
    let inputUser;
    Admin.prototype.addDatapoint = jest.fn( ( dataRowID, datapoint ) => {
        inputUser = { dataRowID, datapoint };
        return true;
    } );
    let inputDB;
    DatabaseConnector.prototype.sendDataPoint = jest.fn( ( { sessionID, userID, dataSetID, dataRowID, datapoint } ) => {
        inputDB = { sessionID, userID, dataSetID, dataRowID, datapoint };
        return Promise.resolve( true );
    } );
    let facade = new Facade( "de-de" );
    let promise = facade.loginAdmin( "TEST", "TEST" );
    let sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    promise = facade.loadProject( 1 );
    sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    promise = facade.sendDataPoint( 64, { value: [ 5 ], relativeTime: 1 } );
    sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    expect( inputUser ).toStrictEqual( { dataRowID: 64, datapoint: { value: [ 5 ], relativeTime: 1 } } );
    expect( inputDB ).toStrictEqual( { sessionID: 1, userID: 5, dataSetID: 99, dataRowID: 64, datapoint: { value: [ 5 ], relativeTime: 1 } } );
} );

test( "login  und getProjectMetas", async () => {
    let inputDB;
    DatabaseConnector.prototype.getProjectMetas = jest.fn( ( { userID, adminEmail } ) => {
        inputDB = { userID, adminEmail };
        return Promise.resolve( [ { projectID: 44, projectName: "TEST", AIModelID: [ 8 ] } ] );
    } );
    let facade = new Facade( "de-de" );
    let promise = facade.loginAdmin( "TEST", "TEST" );
    let sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    let specialPromise = facade.getProjectMetas();
    let specialSucsess = await specialPromise;
    expect( specialSucsess ).toStrictEqual( [ { projectID: 44, projectName: "TEST", AIModelID: [ 8 ] } ] );
} );

test( "login, loadProject und delete DataSet", async () => {
    Admin.prototype.deleteDataSet = jest.fn( () => {
        return true;
    } );
    let facade = new Facade( "de-de" );
    let promise = facade.loginAdmin( "TEST", "TEST" );
    let sucsess = await promise;
    expect( sucsess ).toBeTruthy();
    promise = facade.loadProject( 1 );
    sucsess = await promise;
    expect( sucsess ).toBeTruthy();
} );