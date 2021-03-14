import ReactTestUtils from 'react-dom/test-utils';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VisualizationPage from '.';
import eximage1 from '../../images/exImage1.svg';

configure({ adapter: new Adapter() });

describe("test", () => {
  it('is wrapped inside a visualizationpage class', () => {
    const component = ReactTestUtils.renderIntoDocument(<VisualizationPage />);
    ReactTestUtils.findRenderedDOMComponentWithClass(
      component, 'visualizationpage'
    );
  });

  it('is wrapped inside a showImage class', () => {
    const component = ReactTestUtils.renderIntoDocument(<VisualizationPage />);
    ReactTestUtils.findRenderedDOMComponentWithClass(
      component, 'showImage'
    );
  });
  it('state test', () => {
    const wrapper = shallow(<VisualizationPage />);
    expect(wrapper.state('imageSrc')).toEqual(eximage1);
  });

});