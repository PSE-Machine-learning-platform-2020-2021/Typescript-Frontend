import { FinishPage } from "../../FinishPage/index";
import { States } from "../../State";


test('AddLabel', () => {
    let page = new FinishPage();
    // @ts-ignore
    page.newLabel({ labelID: 0, start: 1, end: 3, name: 'a' });
    let state = page.getState();
    let currentLabel = state.currentLabel;
    let currentState = state.currentState;
    expect(currentLabel).toEqual({ labelID: 0, start: 1, end: 3, name: 'a' });
    expect(currentState).toBe(States.NewLabel);
});

test('DeleteLabel', () => {
    let page = new FinishPage();
    // @ts-ignore
    page.pagedeleteLabel({ labelID: 0, start: 1, end: 3, name: 'a' });
    let state = page.getState();
    let currentLabel = state.currentLabel;
    let currentState = state.currentState;
    expect(currentLabel).toEqual({ labelID: 0, start: 1, end: 3, name: 'a' });
    expect(currentState).toBe(States.DeleteLabel);
});
