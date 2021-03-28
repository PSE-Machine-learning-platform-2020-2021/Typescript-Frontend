import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Diagram from '../../../components/DataCollectionComponents/Diagram';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let dataRows = [{ sensorType: 1, datapoint: [{ value: [5], relativeTime: 5 }] },
    { sensorType: 2, datapoint: [{ value: [5], relativeTime: 5 }] }];
    let pageChangeToFinish = jest.fn();
    const wrapper = shallow<Diagram>(<Diagram dataRows={dataRows} pageChangeToFinish={pageChangeToFinish} />);
    const pageChange: any = wrapper.find("button").at(0);
    pageChange.simulate("click");
    expect(pageChangeToFinish.mock.calls.length).toBe(1);
});

test('DifferentSensors', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let dataRows = [{ sensorType: 3, datapoint: [{ value: [5], relativeTime: 5 }] },
    { sensorType: 4, datapoint: [{ value: [5], relativeTime: 5 }] }];
    let pageChangeToFinish = jest.fn();
    const wrapper = shallow<Diagram>(<Diagram dataRows={dataRows} pageChangeToFinish={pageChangeToFinish} />);

});


