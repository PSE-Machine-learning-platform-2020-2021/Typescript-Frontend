import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DiagramList from '../../../components/VisualizationComponents/DiagramList';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() })

    let currentDataSet = [{ dataSetID: 1, rows: [{ sensorType: 2, datapoint: [{ value: [1, 2, 3], relativeTime: 0 }] }] },
    { dataSetID: 2, rows: [{ sensorType: 3, datapoint: [{ value: [1, 2, 3], relativeTime: 0 }] }] },
    { dataSetID: 3, rows: [{ sensorType: 4, datapoint: [{ value: [1, 2, 3], relativeTime: 0 }] }] },
    { dataSetID: 4, rows: [{ sensorType: 0, datapoint: [{ value: [1, 2, 3], relativeTime: 0 }] }] }]
    const wrapper = shallow<DiagramList>(<DiagramList currentDataSet={currentDataSet} />)

    const create: any = wrapper.find("LineChart").at(2);
    create.simulate("click");
    expect(wrapper.state().showDiagramIndex).toBe(1)
});
