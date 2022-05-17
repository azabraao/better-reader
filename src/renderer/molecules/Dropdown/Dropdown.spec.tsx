import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Dropdown from './index';

describe('Dropdown', () => {
  it('should render', () => {
    expect(render(<Dropdown />)).toBeTruthy();
  });
});
