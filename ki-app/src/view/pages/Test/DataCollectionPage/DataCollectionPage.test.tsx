import { DataCollectionPage } from "../../../pages/DataCollectionPage/index";
import { States } from "../../State";

test('ChangetoFinish', () => {
    let page = new DataCollectionPage();
    let state = page.getState();
    let result = state.currentState;
    expect(result).toBe(States.NeedMessage);

    // @ts-ignore
    page.changeToFinish();
    let newState = page.getState();
    let newResult = newState.currentState;
    expect(newResult).toBe(States.ChangeToFinish);
});
