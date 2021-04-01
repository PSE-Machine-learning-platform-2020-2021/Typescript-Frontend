import { DeliveryPage } from "../../view/pages/DeliveryPage";
import { DeliveryController } from "../DeliveryController";
import { MainController } from "../MainController";
import { State } from "./testState";


let state = new State();
let controller: DeliveryController;

const setState = jest.fn( ( newState ) => { state = newState; } );
const setUp = jest.fn();
const sensorPromise = Promise.resolve( [ { sensorTypID: 1, sensorType: "TEST" } ] );
const Facade = { registerDataminer: jest.fn() };
const Main = {
    setLanguage: jest.fn().mockReturnValue( "TEST" ), // mockReturnValue funktioniert hier nicht?
    getMessage: jest.fn().mockReturnValue( [ { text: "TEST", id: 5 } ] ), // mockReturnValue funktioniert hier nicht?
    getFacade: jest.fn().mockReturnValue( Facade ), // mockReturnValue funktioniert hier nicht?
    changeTo: jest.fn()
};

beforeEach( () => {
    state = new State();
    DeliveryPage.prototype.getState = jest.fn().mockReturnValue( state );
    DeliveryPage.prototype.setState = setState;
    MainController.getInstance = jest.fn().mockReturnValue( Main );
    Main.setLanguage.mockResolvedValue( "Test" );
    Main.getMessage.mockReturnValue( [ { text: "TEST", id: 5 } ] );
    Main.getFacade.mockReturnValue( Facade );
} );

test( 'Aufbau test', () => {
    controller = new DeliveryController( { projectID: 1, projectName: "TEST", choosenAIModelID: 1 } );
} );