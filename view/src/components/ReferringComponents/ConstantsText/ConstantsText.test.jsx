import ReactTestUtils from 'react-dom/test-utils';
import ConstantsText from '.'

describe("test", () => {
  it('has an h1 tag', () => {
    const component = ReactTestUtils.renderIntoDocument(<ConstantsText />);
    ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'h1'
    );
  });

  it('is wrapped inside a title class', () => {
    const component = ReactTestUtils.renderIntoDocument(<ConstantsText />)
    ReactTestUtils.findRenderedDOMComponentWithClass(
      component, 'title'
    );
  })
})