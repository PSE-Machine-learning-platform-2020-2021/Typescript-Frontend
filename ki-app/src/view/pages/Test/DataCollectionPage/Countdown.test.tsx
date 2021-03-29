import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Countdown from '../../../components/DataCollectionComponents/Countdown';


test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let countdownNumber = 5;
    let chosenSensors = [0, 1];
    const wrapper = shallow<Countdown>(<Countdown countdownNumber={countdownNumber} chosenSensors={chosenSensors} />);
});

test('Gestartet', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let countdownNumber = 0;
    let chosenSensors = [0, 1];
    const wrapper = shallow<Countdown>(<Countdown countdownNumber={countdownNumber} chosenSensors={chosenSensors} />);
});