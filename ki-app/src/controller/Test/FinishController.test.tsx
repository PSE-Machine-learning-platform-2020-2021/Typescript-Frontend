import { FinishController } from "../FinishController";

import { FinishPage } from "../../view/pages/FinishPage/index";

import { MainController } from "../MainController";
import { State } from "./testState";
import { States } from "../../view/pages/State";

let state = new State();
let controller: FinishController;

const setState = jest.fn( ( newState ) => {
    state = newState;
} );

const sensorPromise = Promise.resolve( [ { sensorTypID: 1, sensorType: "TEST" } ] );
const Facade = {
    setLabel: jest.fn(),
    getCurrentDataRows: jest.fn(),
    createLabel: jest.fn(),
    deleteLabel: jest.fn()
};

const Main = {
    setLanguage: jest.fn().mockReturnValue( "TEST" ), // mockReturnValue funktioniert hier nicht?
    getMessage: jest.fn().mockReturnValue( [ { text: "TEST", id: 5 } ] ), // mockReturnValue funktioniert hier nicht?
    getFacade: jest.fn().mockReturnValue( Facade ), // mockReturnValue funktioniert hier nicht?
    changeTo: jest.fn()
};

beforeEach( () => {
    state = new State();
    FinishPage.prototype.getState = jest.fn().mockReturnValue( state );
    FinishPage.prototype.setState = setState;

    const getInstance = jest.fn().mockReturnValue( Main );
    MainController.getInstance = getInstance;
    Main.setLanguage.mockResolvedValue( "Test" );
    Main.getMessage.mockReturnValue( [ { text: "TEST", id: 5 } ] );
    Main.getFacade.mockReturnValue( Facade );

} );

test( 'ChangeLabel test', async () => {
    state.currentState = States.ChangeLabel;
    state.currentLabel = { labelID: 1, start: 1, end: 2, name: "TEST" };
    let resolve = Promise.resolve( true );
    Facade.setLabel = jest.fn( () => {
        return Promise.resolve( resolve );
    } );
    Facade.getCurrentDataRows.mockReturnValue( [ {
        sensorType: 1,
        datapoint: [ {
            value: [ 1 ],
            relativeTime: 5,
        } ]
    } ] );
    new FinishController();
    await resolve;
    expect( state.currentState ).toBe( States.setLabel );
} );

test( 'NewLabel test', async () => {
    state.currentState = States.NewLabel;
    state.currentLabel = { labelID: 1, start: 1, end: 2, name: "TEST" };
    let resolve = Promise.resolve( 999 );
    Facade.createLabel = jest.fn( () => {
        return Promise.resolve( resolve );
    } );
    Facade.getCurrentDataRows.mockReturnValue( [ {
        sensorType: 1,
        datapoint: [ {
            value: [ 1 ],
            relativeTime: 5,
        } ]
    } ] );
    new FinishController();
    await resolve;
    expect( state.currentLabel.labelID ).toBe( 999 );
    expect( state.currentState ).toBe( States.setLabel );
} );

test( 'ChangeLabel test', async () => {
    state.currentState = States.DeleteLabel;
    state.currentLabel = { labelID: 1, start: 1, end: 2, name: "TEST" };
    let resolve = Promise.resolve( true );
    Facade.deleteLabel = jest.fn( () => {
        return Promise.resolve( resolve );
    } );
    Facade.getCurrentDataRows.mockReturnValue( [ {
        sensorType: 1,
        datapoint: [ {
            value: [ 1 ],
            relativeTime: 5,
        } ]
    } ] );
    new FinishController();
    await resolve;
    expect( state.currentState ).toBe( States.setLabel );
} );