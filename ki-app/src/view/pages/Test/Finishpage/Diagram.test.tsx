import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Diagram from '../../../components/FinishComponents/Diagram';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let dataRows = [{ sensorType: 1, datapoint: [{ value: [5], relativeTime: 5 }] },
    { sensorType: 2, datapoint: [{ value: [5], relativeTime: 5 }] }];
    const wrapper = shallow<Diagram>(<Diagram dataRows={dataRows} />);
});

test('AndereSensoren', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let dataRows = [{ sensorType: 3, datapoint: [{ value: [5], relativeTime: 5 }] },
    { sensorType: 4, datapoint: [{ value: [5], relativeTime: 5 }] }];
    const wrapper = shallow<Diagram>(<Diagram dataRows={dataRows} />);
});