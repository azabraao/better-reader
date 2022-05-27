import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import Logo from './index';

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  };
});

describe('Logo component', () => {
  it('should render', () => {
    expect(render(<Logo />)).toBeTruthy();
  });

  it('should render the logo', () => {
    render(<Logo />);
    expect(screen.getByText('Better Reader')).toBeInTheDocument();
  });

  it('should navigate to / if logo clicked', () => {
    const useNavigateMocked = jest.mocked(useNavigate);
    const pushMock = jest.fn();
    useNavigateMocked.mockReturnValue(pushMock);

    render(<Logo />);

    fireEvent.click(screen.getByRole('button'));

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
