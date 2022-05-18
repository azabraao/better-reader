import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Dropdown from './index';

/*
  Dropdown business rules
  - Dropdown should be closed by default
  - Dropdown should be closed when clicking outside of it
  - Dropdown should be closed when clicking on the dropdown button
  - Dropdown should render a list of items hidden by default
  - Dropdown should render a list of items visible when clicking on the dropdown button
*/

const element = shallow(<Dropdown items={['item1', 'item2', 'item3']} />);

describe('<Dropdown/> molecule', () => {
  const hiddenElementClass = 'top-0 opacity-0 pointer-events-none';

  it('should render', () => {
    expect(element).toBeTruthy();
  });

  it('should render a list of items hidden by default', () => {
    expect(element.find('ul').hasClass(hiddenElementClass)).toBeTruthy();
  });

  it('should render a list of items visible when clicking on the dropdown button', () => {
    element.find('button').simulate('click');
    expect(element.find('ul').hasClass(hiddenElementClass)).toBeTruthy();
  });

  it('should render a list of items hidden when clicking outside of it', () => {
    // click outside of the dropdown
    window.document.body.dispatchEvent(new Event('click'));
    expect(element.find('ul').hasClass(hiddenElementClass)).toBeTruthy();
  });

  it('should be closed by default', () => {
    expect(element.find('ul').hasClass(hiddenElementClass)).toBeTruthy();
  });

  it('should be closed when clicking on the dropdown button', () => {
    element.find('button').simulate('click');
    expect(element.find('ul').hasClass(hiddenElementClass)).toBeTruthy();
    element.find('button').simulate('click');
    // wait for the transition to finish

    setTimeout(() => {
      expect(element.find('ul').hasClass(hiddenElementClass)).toBeFalsy();
    }, 200);
  });
});
