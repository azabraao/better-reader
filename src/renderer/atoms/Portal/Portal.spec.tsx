import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Portal from './index';

describe('Portal', () => {
  it('should render', () => {
    expect(render(<Portal />)).toBeTruthy();
  });
});
