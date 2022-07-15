import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

const { ResizeObserver } = window;

beforeEach(() => {
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
