import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Backdrop from './index';

describe('Backdrop', () => {
  it('should render', () => {
    expect(render(<Backdrop isOpen onClick={() => {}} />)).toBeTruthy();
  });
});
