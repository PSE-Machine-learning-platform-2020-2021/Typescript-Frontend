import { StartController } from "../StartController";

import { StartPage } from "../../view/pages/StartPage/index";

import { MainController } from "../MainController";
import { State } from "./testState";
import { States } from "../../view/pages/State";
import { SensorManager } from "../SensorManager";
import { exception } from "node:console";

jest.mock( '../MainController' );
jest.mock( '../../view/pages/StartPage/index' );
jest.mock( "../SensorManager" );

let state = new State();
let controller: StartController;

const setState = jest.fn( ( newState ) => {
    state = newState;
} );

const setUp = jest.fn();
const sensorPromise = Promise.resolve( [ { sensorTypID: 1, sensorType: "TEST" } ] );
const Facade = {
    registerDataminer: jest.fn()
};

const Main = {
    setLanguage: jest.fn().mockReturnValue( "TEST" ), // mockReturnValue funktioniert hier nicht?
    getMessage: jest.fn().mockReturnValue( [ { text: "TEST", id: 5 } ] ), // mockReturnValue funktioniert hier nicht?
    getFacade: jest.fn().mockReturnValue( Facade ) // mockReturnValue funktioniert hier nicht?
};

beforeEach( () => {
    state = new State();
    StartPage.prototype.getState = jest.fn().mockReturnValue( state );
    StartPage.prototype.setState = setState;

    const getInstance = jest.fn().mockReturnValue( Main );
    MainController.getInstance = getInstance;
    Main.setLanguage.mockResolvedValue( "Test" );
    Main.getMessage.mockReturnValue( [ { text: "TEST", id: 5 } ] );
    Main.getFacade.mockReturnValue( Facade );

    SensorManager.prototype.setUpDataRead = setUp;
    SensorManager.prototype.getAvailableSensors = jest.fn( () => {
        return sensorPromise;
    } );
} );

test( 'Constructor test', async () => {
    state.currentState = States.ChangeToDataCollection;
    controller = new StartController();
    await sensorPromise;
    expect( state.recordingSettings?.availableSensorTypes ).toStrictEqual( [ { sensorTypID: 1, sensorType: "TEST", chosen: false } ] );
} );