import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Evolution from './index';

describe('Evolution', () => {
  it('should render', () => {
    expect(render(<Evolution />)).toBeTruthy();
  });
});
