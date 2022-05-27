import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Navbar from './index';

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  };
});

describe('Navbar component', () => {
  it('should render', () => {
    expect(render(<Navbar />)).toBeTruthy();
  });
});
