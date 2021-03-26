import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ChangeToVisuBtn from '../../../components/ReferringComponents/ChangeToVisuBtn'

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let pageChangeToVisu = jest.fn()
    const wrapper = shallow<ChangeToVisuBtn>(<ChangeToVisuBtn pageChangeToVisu={pageChangeToVisu} />)

    expect(pageChangeToVisu.mock.calls.length).toBe(0)
    const pageChange: any = wrapper.find("button").at(0);
    pageChange.simulate("click");
    expect(pageChangeToVisu.mock.calls.length).toBe(1)
});