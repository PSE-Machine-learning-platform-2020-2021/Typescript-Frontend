import ReactTestUtils from 'react-dom/test-utils';
import ConstantsText from '.'

describe("my info", () => {
  it('has an h1 tag', () => {
    const component = ReactTestUtils.renderIntoDocument(<ConstantsText />);
    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'h1'
    );

  });

  it('is wrapped inside a title class', () => {
    const component = ReactTestUtils.renderIntoDocument(<ConstantsText />)
    var node = ReactTestUtils.findRenderedDOMComponentWithClass(
      component, 'Explorer'
    );
  })
})