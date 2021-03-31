import { Facade } from "../Facade";
import { DatabaseConnector } from "../DatabaseConnector";

facade: Facade;

beforeEach( () => {
    DatabaseConnector.prototype.loadLanguage = jest.fn( () => {
        return Promise.resolve( [ "TEST" ] );
    } );
} );

test( "Datensatz erzeugen", () => {
    let facade = new Facade( "de-de" );
    DatabaseConnector.prototype.createDataSet = jest.fn( () => {
        return Promise.resolve( 5 );
    } );
    facade.createDataSet( [ 1 ], "TEST", [ "1" ] );

} );