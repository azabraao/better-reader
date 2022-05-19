import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Practices from './index';

describe('Practices', () => {
  it('should render', () => {
    expect(render(<Practices />)).toBeTruthy();
  });
});
