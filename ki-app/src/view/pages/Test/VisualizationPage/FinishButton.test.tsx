import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FinishButton from '../../../components/VisualizationComponents/FinishButton';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() })

    let pageChangeToCreation = jest.fn()
    const wrapper = shallow<FinishButton>(<FinishButton pageChangeToCreation={pageChangeToCreation} />)

    expect(pageChangeToCreation.mock.calls.length).toBe(0)
    const finish: any = wrapper.find("button").at(0);
    finish.simulate("click");
    expect(pageChangeToCreation.mock.calls.length).toBe(1)

});
