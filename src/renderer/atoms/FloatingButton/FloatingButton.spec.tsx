import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Icon from '../Icon';

import FloatingButton from './index';

describe('FloatingButton component', () => {
  it('should call callback function on click', () => {
    const callback = jest.fn();
    render(
      <FloatingButton onClick={callback} icon={<Icon name="exercise" />} />
    );
    fireEvent.click(screen.getByTestId('floating-button'));
    expect(callback).toHaveBeenCalled();
  });
});
