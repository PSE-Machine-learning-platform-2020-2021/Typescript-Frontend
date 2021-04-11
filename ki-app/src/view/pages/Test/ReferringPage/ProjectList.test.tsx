
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ProjectList from '../../../components/ReferringComponents/ProjectList'
import { NotificationManager } from 'react-notifications';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let projectData = [{ projectID: -1, projectName: "null", AIModelID: [-1] }]
    let pageSetCurrentprojekt = jest.fn()
    let pageLoadModel = jest.fn()
    let pageLoadProjekt = jest.fn()
    let pageChangeToVisu = jest.fn()
    let qr = ''
    const wrapper = shallow<ProjectList>(<ProjectList projectData={projectData} qr={qr} link={"TEST"}
        pageSetCurrentprojekt={pageSetCurrentprojekt} pageLoadModel={pageLoadModel} pageLoadProjekt={pageLoadProjekt} pageChangeToVisu={pageChangeToVisu} />)

    expect(wrapper.state().value).toBe(null)
    expect(wrapper.state().click).toBe(false)
    expect(wrapper.state().loadclick).toBe(false)
    expect(wrapper.state().currentProject).toEqual({ projectID: -1, projectName: "", AIModelID: [] })

    const testNotificationManager1 = NotificationManager.info('test')
    const choose: any = wrapper.find("button").at(0);
    choose.simulate("click");
    expect(testNotificationManager1).toBe(NotificationManager.error("Sie haben noch kein Projekt gewählt", "", 3000))

    const testNotificationManager2 = NotificationManager.info('test')
    const load: any = wrapper.find("button").at(1);
    load.simulate("click");
    expect(testNotificationManager2).toBe(NotificationManager.error("Sie haben noch kein Projekt gewählt", "", 3000))
});

test('Gültige eingabe', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let projectData = [{ projectID: -1, projectName: "null", AIModelID: [-1] }]
    let pageSetCurrentprojekt = jest.fn()
    let pageLoadModel = jest.fn()
    let pageLoadProjekt = jest.fn()
    let pageChangeToVisu = jest.fn()
    let qr = ''
    const wrapper = shallow<ProjectList>(<ProjectList projectData={projectData} qr={qr} link={"TEST"}
        pageSetCurrentprojekt={pageSetCurrentprojekt} pageLoadModel={pageLoadModel} pageLoadProjekt={pageLoadProjekt} pageChangeToVisu={pageChangeToVisu} />)

    const change = wrapper.find("select").at(0);
    change.simulate('change', { target: { value: projectData[0].projectID } });
    expect(wrapper.state().value).toBe(-1)

    const choose: any = wrapper.find("button").at(0);
    expect(wrapper.state().click).toBe(false)
    choose.simulate("click");
    expect(wrapper.state().click).toBe(true)

    expect(pageLoadProjekt.mock.calls.length).toBe(0)
    const load: any = wrapper.find("button").at(1);
    expect(wrapper.state().loadclick).toBe(false)
    load.simulate("click");
    expect(wrapper.state().loadclick).toBe(true)
    expect(pageLoadProjekt.mock.calls.length).toBe(1)
});


test('kein model', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let projectData = [{ projectID: -1, projectName: "null", AIModelID: [] }]
    let pageSetCurrentprojekt = jest.fn()
    let pageLoadModel = jest.fn()
    let pageLoadProjekt = jest.fn()
    let pageChangeToVisu = jest.fn()
    let qr = ''
    const wrapper = shallow<ProjectList>(<ProjectList projectData={projectData} qr={qr} link={"test"}
        pageSetCurrentprojekt={pageSetCurrentprojekt} pageLoadModel={pageLoadModel} pageLoadProjekt={pageLoadProjekt} pageChangeToVisu={pageChangeToVisu} />)

    const change = wrapper.find("select").at(0);
    change.simulate('change', { target: { value: projectData[0].projectID } });

    const testNotificationManager = NotificationManager.info('test')
    const choose: any = wrapper.find("button").at(0);
    choose.simulate("click");
    expect(wrapper.state().click).toBe(false)
    expect(testNotificationManager).toBe(NotificationManager.error("Es gibt keine Model in diesem Projekt!", "", 3000))

});

