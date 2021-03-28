import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Labelling from '../../../components/FinishComponents/Input/Labelling';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let newLabel = jest.fn();
    let pagedeleteLabel = jest.fn();
    const wrapper = shallow<Labelling>(<Labelling newLabel={newLabel} pagedeleteLabel={pagedeleteLabel} />);
});
