import { MainController } from "../MainController";

test( 'Singleton test', () => {
    let ins1 = MainController.getInstance();
    let ins2 = MainController.getInstance();
    ins1.setLanguage( "ru-ru" );
    expect( ins2.getLanguageCode() ).toStrictEqual( "ru-ru" );
} );
