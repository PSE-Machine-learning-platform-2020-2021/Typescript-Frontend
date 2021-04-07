import { ReferringPage } from '../../ReferringPage';
import { States } from '../../State';

test('createNewProject', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.createNewProject("test")
    expect(page.getState().currentProject?.projectName).toEqual("test")
    expect(page.getState().currentState).toEqual(States.NewProjekt)
});

test('register', () => {
    let page = new ReferringPage()
    //@ts-ignore
    page.register('testname', 'testemail', 'testpassword')
    let loginAdmin = jest.fn(() => {
        return Promise.resolve(true);
    });
    page.getState().wait = loginAdmin()

    //@ts-ignore
    page.register('testname', 'test@gmail.com', 'testpassword')
    expect(page.getState().currentState).toEqual(States.Register)
    expect(page.getState().adminData).toEqual({ name: 'testname', email: 'test@gmail.com', password: 'testpassword' })

});

test('login', () => {
    let page = new ReferringPage()
    let loginAdmin = jest.fn(() => {
        return Promise.resolve(true);
    });
    page.getState().wait = loginAdmin()

    //@ts-ignore
    page.login('test@gmail.com', 'testpassword')
    expect(page.getState().currentState).toEqual(States.Login)
    expect(page.getState().adminData).toEqual({ name: '', email: 'test@gmail.com', password: 'testpassword' })

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
    expect(page.getState().chosenAIModel).toEqual(-10)
    expect(page.getState().currentState).toEqual(States.LoadModel)
});