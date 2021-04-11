import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LoadModelButton from '../../../components/ReferringComponents/LoadModelButton'

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let disabled = true
    let projectData = [{ projectID: -1, projectName: "null", AIModelID: [-1] }]
    let pageSetCurrentprojekt = jest.fn()
    let pageLoadModel = jest.fn()
    let pageLoadProjekt = jest.fn()
    let pageChangeToVisu = jest.fn()
    let qr = ''
    const wrapper = shallow<LoadModelButton>(<LoadModelButton link ={"TEST"} disabled={disabled} projectData={projectData} qr={qr}
        pageSetCurrentprojekt={pageSetCurrentprojekt} pageLoadModel={pageLoadModel} pageLoadProjekt={pageLoadProjekt} pageChangeToVisu={pageChangeToVisu} />)

    const create: any = wrapper.find("button").at(0);
    expect(wrapper.state().click).toBe(false)
    create.simulate("click");
    expect(wrapper.state().click).toBe(true)
});
