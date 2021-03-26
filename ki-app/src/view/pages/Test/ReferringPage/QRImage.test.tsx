import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import QRImage from '../../../components/ReferringComponents/QRImage'

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let qr = ''
    const wrapper = shallow<QRImage>(<QRImage qr={qr} />)

});
