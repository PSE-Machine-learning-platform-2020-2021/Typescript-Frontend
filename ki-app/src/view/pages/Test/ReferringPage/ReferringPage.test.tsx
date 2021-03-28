import { ReferringPage } from '../../ReferringPage';
import { States } from '../../State';

test('createNewProject', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.createNewProject("test")
    expect(page.getState().currentProject?.projectName).toEqual("test")
    expect(page.getState().currentState).toEqual(States.NewProjekt)
});

test('ungueltig register', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.register('testname', 'testemail', 'testpassword')
});


test('loadproject', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.loadproject({ projectID: -10, projectName: 'test', choosenAIModelID: -10 })
    expect(page.getState().currentProject).toEqual({ projectID: -10, projectName: 'test', choosenAIModelID: -10 })
    expect(page.getState().currentState).toEqual(States.LoadProject)
});

test('setCurrentProjekt', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.setCurrentProjekt({ projectID: -10, projectName: 'test', choosenAIModelID: -10 })
    expect(page.getState().currentProject).toEqual({ projectID: -10, projectName: 'test', choosenAIModelID: -10 })
});

test('changetovisu', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.changetovisu()
    expect(page.getState().currentState).toEqual(States.ChangeToVisual)
});

test('loadmodel', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.loadmodel(-10)
    expect(page.getState().currentProject?.choosenAIModelID).toEqual(-10)
    expect(page.getState().currentState).toEqual(States.LoadModel)
});