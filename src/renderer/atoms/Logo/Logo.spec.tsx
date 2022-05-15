import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Logo from './index';

describe('Logo component', () => {
  it('should render', () => {
    expect(render(<Logo />)).toBeTruthy();
  });
});
