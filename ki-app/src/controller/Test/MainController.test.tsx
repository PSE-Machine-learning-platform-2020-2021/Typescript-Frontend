import { MainController } from "../MainController";

let controller: MainController;

test( 'start test', () => {
    let controller1 = jest.mock( "../ReferringController" );
    let controller2 = jest.mock( "../StartController" );
    MainController.getInstance();
} );