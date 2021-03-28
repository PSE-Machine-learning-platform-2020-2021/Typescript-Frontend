import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DownloadButton from '../../../components/DeliveryComponents/DownloadButton';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() })

    let download = jest.fn()
    const wrapper = shallow<DownloadButton>(<DownloadButton download={download} />)

    expect(download.mock.calls.length).toBe(0)
    const downloadbtn: any = wrapper.find("button").at(0);
    downloadbtn.simulate("click");
    expect(download.mock.calls.length).toBe(1)

});
