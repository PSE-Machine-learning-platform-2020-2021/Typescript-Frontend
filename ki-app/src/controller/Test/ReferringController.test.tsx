import {RefferingController} from "../ReferringController"

import { ReferringPage } from "../../view/pages/ReferringPage/index";

import {MainController} from "../MainController"
import { State } from "./testState";
import { States } from "../../view/pages/State";
import { SensorManager } from "../SensorManager"

jest.mock('../MainController')
jest.mock('../../view/pages/ReferringPage/index')

let state = new State()
let controller: RefferingController

const setState = jest.fn()
const Facade = {
  registerDataminer : jest.fn(),
  registerAIModelUser : jest.fn(),
  loginAdmin : jest.fn((() => Promise.resolve({ value: true }))),
}
const Main = {
  setLanguage : jest.fn().mockReturnValue("TEST") , // mockReturnValue funktioniert hier nicht?
  getMessage : jest.fn().mockReturnValue([{ text: "TEST", id: 5 }]), // mockReturnValue funktioniert hier nicht?
  getFacade : jest.fn().mockReturnValue(Facade)
}

beforeEach(() => {
  state = new State()
  ReferringPage.prototype.getState = jest.fn().mockReturnValue(state)
  ReferringPage.prototype.setState = setState

  const getInstance = jest.fn().mockReturnValue(Main)
  MainController.getInstance = getInstance
  Main.setLanguage.mockResolvedValue("Test")
  Main.getMessage.mockReturnValue([{ text: "TEST", id: 5 }])
  Main.getFacade.mockReturnValue(Facade)

  let sensorManager = new SensorManager()
  });

test('NeedMessage test', () => {
  controller = new RefferingController()
  expect(setState.mock.calls[0][0].messages).toStrictEqual([{ text: "TEST", id: 5 }]);
});

test('Login test', () => {
  state.currentState = States.Login
  state.adminData = { name: "string", email: "string", password: "string" }
  controller = new RefferingController()

});