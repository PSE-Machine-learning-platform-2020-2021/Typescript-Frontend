import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ConstantsText from '../../../components/ReferringComponents/ConstantsText'

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });

    const wrapper = shallow<ConstantsText>(<ConstantsText />)
    expect(wrapper.text()).toBe('Explorer')
});