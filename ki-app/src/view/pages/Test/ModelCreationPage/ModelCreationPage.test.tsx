import { ModelCreationPage } from '../../ModelCreationPage';
import { States } from '../../State';

test('train', () => {
    let page = new ModelCreationPage()
    //@ts-ignore
    page.train([1, 2], 'testimputation', 'testclassifier', 'testscaler', ['test1', 'test2'])
    expect(page.getState().currentState).toEqual(States.NeedKiTraining)
    expect(page.getState().trainingParameter!.dataSets).toEqual([1, 2])
    expect(page.getState().trainingParameter!.imputator).toEqual('testimputation')
    expect(page.getState().trainingParameter!.classifier).toEqual('testclassifier')
    expect(page.getState().trainingParameter!.scaler).toEqual('testscaler')
    expect(page.getState().trainingParameter!.features).toEqual(['test1', 'test2'])

});

test('changeToReferring', () => {
    let page = new ModelCreationPage()
    //@ts-ignore
    page.changeToReferring()
    expect(page.getState().currentState).toEqual(States.ChangeToRefferring)
});
