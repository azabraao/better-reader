import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Evolution from './index';

const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
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

jest.mock('renderer/contexts', () => {
  return {
    useRanking() {
      return {
        rankingData: [],
        isLoadingRanking: false,
      };
    },
  };
});

describe('Evolution', () => {
  it('should render', () => {
    expect(render(<Evolution />)).toBeTruthy();
  });
});
