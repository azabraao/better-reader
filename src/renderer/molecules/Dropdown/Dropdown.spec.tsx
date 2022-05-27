import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

describe('<Dropdown/> molecule', () => {
  const hiddenElementClass = 'top-0 opacity-0 pointer-events-none';
  const visibleElementClass = 'top-full opacity-100';

  it('should render', () => {
    expect(
      render(<Dropdown onSelected={jest.fn} items={techniques} />)
    ).toBeTruthy();
  });

  it('should render a list of items hidden by default', () => {
    render(<Dropdown onSelected={jest.fn} items={techniques} />);

    expect(screen.getByTestId('dropdown-list')).toHaveClass(hiddenElementClass);
  });

  it('should render a list of items visible when clicking on the dropdown button', () => {
    render(<Dropdown onSelected={jest.fn} items={techniques} />);

    const button = screen.getByTestId('dropdown-button');
    const ul = screen.getByTestId('dropdown-list');

    fireEvent.click(button);

    expect(ul).not.toHaveClass(hiddenElementClass);
  });

  it('should render a list of items hidden when clicking outside of it', () => {
    render(<Dropdown onSelected={jest.fn} items={techniques} />);

    const button = screen.getByTestId('dropdown-button');
    const ul = screen.getByTestId('dropdown-list');
    const portal = screen.getByTestId('portal');

    fireEvent.click(button);

    expect(ul).toHaveClass(visibleElementClass);

    fireEvent.click(portal);

    expect(ul).toHaveClass(hiddenElementClass);
  });

  it('should be closed when clicking on the dropdown button', () => {
    render(<Dropdown onSelected={jest.fn} items={techniques} />);

    const button = screen.getByTestId('dropdown-button');
    const ul = screen.getByTestId('dropdown-list');

    fireEvent.click(button);

    expect(ul).not.toHaveClass(hiddenElementClass);

    fireEvent.click(button);

    expect(ul).toHaveClass(hiddenElementClass);
  });
});
