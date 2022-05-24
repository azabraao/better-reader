import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { techniques } from 'renderer/utils';

import Dropdown from './index';

/*
  Dropdown business rules
  - Dropdown should be closed by default
  - Dropdown should be closed when clicking outside of it
  - Dropdown should be closed when clicking on the dropdown button
  - Dropdown should render a list of items hidden by default
  - Dropdown should render a list of items visible when clicking on the dropdown button
*/

const element = render(<Dropdown onSelected={() => {}} items={techniques} />);

const ul = document.querySelector('ul.absolute');
const button = document.querySelector('button');

describe('<Dropdown/> molecule', () => {
  const hiddenElementClass = 'top-0 opacity-0 pointer-events-none';

  it('should render', () => {
    expect(element).toBeTruthy();
  });

  it('should render a list of items hidden by default', () => {
    expect(ul).toHaveClass(hiddenElementClass);
  });

  it('should render a list of items visible when clicking on the dropdown button', () => {
    button?.click();

    setTimeout(() => {
      expect(ul).not.toHaveClass(hiddenElementClass);
    }, 200);
  });

  it('should render a list of items hidden when clicking outside of it', () => {
    // click outside of the dropdown
    fireEvent.click(document.body);

    setTimeout(() => {
      expect(ul).toHaveClass(hiddenElementClass);
    }, 200);
  });

  it('should be closed when clicking on the dropdown button', () => {
    button?.click();

    setTimeout(() => {
      expect(ul).not.toHaveClass(hiddenElementClass);
    }, 200);

    button?.click();

    // wait for the transition to finish

    setTimeout(() => {
      expect(ul).toHaveClass(hiddenElementClass);
    }, 200);
  });
});
