import Input from "../../../components/StartComponents/Input/index"
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let pageChangeSettings = jest.fn()
    let availableSensorTypes =  [{ sensorTypID: 5, sensorType: "1", chosen: true }]
    const wrapper = shallow<Input>(<Input pageChangeSettings={pageChangeSettings} availableSensorTypes={availableSensorTypes}/>)    
  });
  