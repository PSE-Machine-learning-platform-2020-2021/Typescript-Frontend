import { States } from '../../State';
import { VisualizationPage } from '../../VisualizationPage';

test('changetoCreation', () => {
    let page = new VisualizationPage()
    //@ts-ignore
    page.changetoCreation()
    expect(page.getState().currentState).toEqual(States.ChangeToCreation)
});
