import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Title from '../../../components/StartComponents/Title';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });

    const wrapper = shallow<Title>(<Title />);
    expect(wrapper.text()).toBe('Datenerfassung');
});