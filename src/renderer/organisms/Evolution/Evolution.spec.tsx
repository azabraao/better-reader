import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Evolution from './index';

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

jest.mock('renderer/contexts', () => {
  return {
    useRanking() {
      return { isLoadingRanking: false };
    },
    usePractices() {
      return {
        practicesData: [],
      };
    },
  };
});

describe('Evolution', () => {
  it('should render', () => {
    expect(render(<Evolution />)).toBeTruthy();
  });
});
