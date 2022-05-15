import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Navbar from './index';

describe('Navbar component', () => {
  it('should render', () => {
    expect(render(<Navbar />)).toBeTruthy();
  });
});
