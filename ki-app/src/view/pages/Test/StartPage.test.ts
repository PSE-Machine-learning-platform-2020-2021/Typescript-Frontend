import { StartPage } from "../StartPage/index"
import { States } from "../State";
import { StartController } from "../../../controller/StartController"

test('setState Test', () => {
  let page = new StartPage("TEST")
  let state = page.getState()
  let result = page.getState().currentState
  expect(result).toBe(States.NeedMessage);
  state.currentState = States.waitForDB
  page.setState(state)
  result = page.getState().currentState
  expect(result).toBe(States.waitForDB);
});

test('Test des Beobachter Musters', () => {
  let page = new StartPage("TEST")

  const controller = jest.mock("../../../controller/StartController") as unknown as StartController;
  const update = jest.fn();
  controller.update = update

  page.attach(controller)
  page.notify()
  expect(update.mock.calls.length).toBe(1)

  let state = page.getState()
  expect(update.mock.calls.length).toBe(1)

  page.setState(state)
  expect(update.mock.calls.length).toBe(2)

  page.detach(controller)
  page.setState(state)
  expect(update.mock.calls.length).toBe(2)
});

