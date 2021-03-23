import { StartPage } from "../StartPage/index"
import { ReferringPage } from "../ReferringPage/index"
import { ModelCreationPage } from "../ModelCreationPage/index"
import { FinishPage } from "../FinishPage/index"
import { DeliveryPage } from "../DeliveryPage/index"
import { DataCollectionPage } from "../DataCollectionPage/index"
import { Page } from "../PageInterface"
import { States } from "../State";
import { StartController } from "../../../controller/StartController"

test('setState Test', () => {
  let pages = [new StartPage("TEST"), new ReferringPage(), new ModelCreationPage(), new FinishPage(), new DeliveryPage(), new DataCollectionPage()]
  let page: Page
  for (page of pages) {
    let state = page.getState()
    let result = page.getState().currentState
    expect(result).toBe(States.NeedMessage);
    state.currentState = States.waitForDB
    page.setState(state)
    result = page.getState().currentState
    expect(result).toBe(States.waitForDB);
  }
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

