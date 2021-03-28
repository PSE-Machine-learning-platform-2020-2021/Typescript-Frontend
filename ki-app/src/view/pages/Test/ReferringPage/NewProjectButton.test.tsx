import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NewProjectButton from '../../../components/ReferringComponents/NewProjectButton';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let pageNewProject = jest.fn()
    let pageChangeToVisu = jest.fn()
    let qr = ''
    let link = ''
    let disabled = true
    const wrapper = shallow<NewProjectButton>(<NewProjectButton disabled={disabled} qr={qr} link={link}
        pageNewProject={pageNewProject} pageChangeToVisu={pageChangeToVisu} />)
    expect(wrapper.state().click).toBe(false)
    expect(wrapper.state().projectName).toBe('')

    const projectName: any = wrapper.find("input").at(0);
    projectName.simulate('change', { target: { value: "testname" } })
    expect(wrapper.state().projectName).toBe("testname")

    expect(pageNewProject.mock.calls.length).toBe(0)
    const create: any = wrapper.find("button").at(0);
    create.simulate("click");
    expect(wrapper.state().click).toBe(true)
    expect(pageNewProject.mock.calls.length).toBe(1)
});
