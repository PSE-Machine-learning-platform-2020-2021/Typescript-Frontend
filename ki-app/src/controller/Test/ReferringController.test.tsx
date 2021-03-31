import { RefferingController } from "../ReferringController";

import { ReferringPage } from "../../view/pages/ReferringPage/index";

import { MainController } from "../MainController";
import { State } from "./testState";
import { States } from "../../view/pages/State";
import { SensorManager } from "../SensorManager";

let state = new State();
let controller: RefferingController;

const setState = jest.fn( ( newState ) => {
  state = newState;
} );

const Facade = {
  registerDataminer: jest.fn(),
  registerAIModelUser: jest.fn(),
  loginAdmin: jest.fn(),
  getProjectMetas: jest.fn(),
  loadProject: jest.fn(),
  registerAdmin: jest.fn(),
  createProject: jest.fn(),
  getSessionID: jest.fn()
};

const Main = {
  setLanguage: jest.fn().mockReturnValue( "TEST" ), // mockReturnValue funktioniert hier nicht?
  getMessage: jest.fn().mockReturnValue( [ { text: "TEST", id: 5 } ] ), // mockReturnValue funktioniert hier nicht?
  getFacade: jest.fn().mockReturnValue( Facade ) // mockReturnValue funktioniert hier nicht?
};

beforeEach( () => {
  state = new State();
  ReferringPage.prototype.getState = jest.fn().mockReturnValue( state );
  ReferringPage.prototype.setState = setState;

  const getInstance = jest.fn().mockReturnValue( Main );
  MainController.getInstance = getInstance;
  Main.setLanguage.mockResolvedValue( "Test" );
  Main.getMessage.mockReturnValue( [ { text: "TEST", id: 5 } ] );
  Main.getFacade.mockReturnValue( Facade );
} );

test( 'NeedMessage test', () => {
  controller = new RefferingController();
  expect( setState.mock.calls[ 0 ][ 0 ].messages ).toStrictEqual( [ { text: "TEST", id: 5 } ] );
} );

test( 'Login test', async () => {
  state.currentState = States.Login;
  state.adminData = { name: "string", email: "string", password: "string" };
  let resolve = Promise.resolve( true );
  Facade.loginAdmin = jest.fn( () => {
    return resolve;
  } );
  let resolve2 = Promise.resolve( [ { projectID: 1, projectName: "TestName", AIModelID: [ 1 ] } ] );
  Facade.getProjectMetas = jest.fn( () => {
    return Promise.resolve( resolve2 );
  } );
  controller = new RefferingController();
  await resolve;
  await resolve2;
  expect( state.islogedIn ).toBe( true );
  expect( state.projectData ).toStrictEqual( [ { projectID: 1, projectName: "TestName", AIModelID: [ 1 ] } ] );
} );

test( 'LoadProject test', async () => {
  state.currentState = States.LoadProject;
  state.currentProject = { projectID: 1, projectName: "NULL", choosenAIModelID: -1 };
  let resolve = Promise.resolve( true );
  Facade.loadProject = jest.fn( () => {
    return resolve;
  } );
  //let resolve2 = Promise.resolve( [ { projectID: 1, projectName: "TestName", AIModelID: [ 1 ] } ] );
  //Facade.getProjectMetas = jest.fn( () => {
  //  return Promise.resolve( resolve2 );
  //} );
  controller = new RefferingController();
  await resolve;
  //await resolve2;
  expect( state.currentState ).toBe( States.waitForDB );
  // expect( state.projectData ).toStrictEqual( [ { projectID: 1, projectName: "TestName", AIModelID: [ 1 ] } ] );
} );

test( 'Register test', async () => {
  state.currentState = States.Register;
  state.adminData = { name: "string", email: "string", password: "string" };
  let resolve = Promise.resolve( true );
  Facade.registerAdmin = jest.fn( () => {
    return resolve;
  } );
  let resolve2 = Promise.resolve( [ { projectID: 2, projectName: "TestName", AIModelID: [ 1 ] } ] );
  Facade.getProjectMetas = jest.fn( () => {
    return Promise.resolve( resolve2 );
  } );
  controller = new RefferingController();
  await resolve;
  await resolve2;
  expect( state.islogedIn ).toBe( true );
  expect( state.projectData ).toStrictEqual( [ { projectID: 2, projectName: "TestName", AIModelID: [ 1 ] } ] );
} );

test( 'NewProjekt test und CreatQR test', async () => {
  state.currentState = States.NewProjekt;
  state.currentProject = { projectID: 1, projectName: "TestName", choosenAIModelID: 1 };
  let resolve = Promise.resolve( true );
  Facade.createProject = jest.fn( () => {
    return resolve;
  } );
  let resolve2 = Promise.resolve( [ { projectID: 1, projectName: "TestName", AIModelID: [ 1 ] } ] );
  Facade.getProjectMetas = jest.fn( () => {
    return Promise.resolve( resolve2 );
  } );
  Facade.getSessionID = jest.fn( () => {
    return 1;
  } );
  controller = new RefferingController();
  await resolve;
  await resolve2;
  expect( state.projectData ).toStrictEqual( [ { projectID: 1, projectName: "TestName", AIModelID: [ 1 ] } ] );
  expect( state.qr ).toBe( 'data:image/gif;base64,R0lGODdhWgBaAIAAAAAAAP///ywAAAAAWgBaAAAC/4yPqcvtD6OctNqLs968+w+G4kiW5ommHcC2rmu8QDwvLA0H97H38k/5AXUvGsOX2xmJOGErWDvWZI7k9MmLMrdSaPWak/qaCOXWrEA/kNgx0R1OCJfwIjfCrpPP2PRQ/9amBZF3tWfmNJg1l9XkJlFIJ1jmJDYkaeUV+NiQGehH6Ul1Rwg2uXYat+RouNkKqUi56hoHePhqE9upKxl6yTcrykuKmgh43IrMyghrnPzcCyxdyDyCiOtspaqSK3uXLbjtUWsHSotd3ihnKr573U6Nvq0Wj8F2O+tNHh+5cf8pzdw+dnZGWbi2x1e1f/xMedOESZEzfakqAcxXAWGuOv9qgg0DZ09LR4D/zGFUaLHZH5EsRy5L58tkRosaE25MuY7esC/4FvUh6XAdKz/VYPUc6jOiQJjnXGawdROjNok/nYaMZklqOKo1Z/IE6nGiz3dBD34Mygnk2JZlJ5B9GdET3JzpOJWKeS7uqbkoNVp1V7egrn7Kmu4sFliuUFfROP4yOg0tzoZQbWpC1pBiIqxJQxB+NrLkt6o/OXxW2u3i6LcXRrWzTJfR5tiHiW794lTsbJRm07LEyxAX56Ju944GLllrWKaQ+9YGu3jua6+0/x5VJ710a9Ksh4Nrq9M6Xbw2faslZzvk7siu2Z5UjRTKeseKFZNfK/829NDg0cniFM8bUJWpg95x0RGjwVQv+aXfVNOZ1uBkkgVn0AmFwSOcagpaAw0f/GnF2oNR4YcdfNXJQ9Nz6ZG4HG6COWcfhwOh1kWJ75FQoTC5/XagesY8BFhjoHUI4Ik5HiaMkIWZ9VV7y8lG1VIiAillRTAapxxjxSHlWHZfXXkjKlwO6eUutjm53ZjI1djeQA6qSOCLnX2o5ZFtandXnWzNh+KTBDGp55UFhrjnn9SxaaWJARZ4X3OpJakoiYx2lt9sXQYZUGQBqmQpmZj65t2U3IxKaqmmnopqqqquymqrrr4KawcFAAA7' );
} );