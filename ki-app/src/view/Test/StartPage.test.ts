import { StartPage } from "../pages/StartPage/index"
import { States } from "../pages/State";

test('setState Test', () => {
  let page = new StartPage("TEST")
  let state = page.getState()
  state.currentState = States.waitForDB
  page.setState(state)
  let result = page.getState().currentState
  expect(result).toBe(States.waitForDB);
});