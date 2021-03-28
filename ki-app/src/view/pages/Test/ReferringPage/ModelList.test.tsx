
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ModelList from '../../../components/ReferringComponents/ModelList'
import { NotificationManager } from 'react-notifications';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let currentProject = { projectID: -1, projectName: "null", AIModelID: [-1] }
    let pageLoadModel = jest.fn()
    const wrapper = shallow<ModelList>(<ModelList currentProject={currentProject} pageLoadModel={pageLoadModel} />)
    expect(wrapper.state().chosenmodelID).toBe(-1)

    const testNotificationManager1 = NotificationManager.info('test')
    const choose: any = wrapper.find("button").at(0);
    choose.simulate("click");
    expect(testNotificationManager1).toBe(NotificationManager.error("Sie haben noch kein Modell gewählt!", "", 3000))
});
test('change', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let currentProject = { projectID: -1, projectName: "null", AIModelID: [-1] }
    let pageLoadModel = jest.fn()
    const wrapper = shallow<ModelList>(<ModelList currentProject={currentProject} pageLoadModel={pageLoadModel} />)

    const change: any = wrapper.find("select").at(0);
    change.simulate('change', { target: { value: 1 } })
    expect(wrapper.state().chosenmodelID).toBe(1)

    expect(pageLoadModel.mock.calls.length).toBe(0)
    const choose: any = wrapper.find("button").at(0);
    choose.simulate("click");
    expect(pageLoadModel.mock.calls.length).toBe(1)
});