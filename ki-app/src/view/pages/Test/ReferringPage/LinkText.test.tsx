import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LinkText from '../../../components/ReferringComponents/LinkText';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let link = 'https://www.test.com/';
    const wrapper = shallow<LinkText>(<LinkText link={link} />);
    expect(wrapper.text()).toBe('Bitte scannen Sie den QR-Code oder folgen Sie dem Link, um Daten zu erfassenhttps://www.test.com/');
});
