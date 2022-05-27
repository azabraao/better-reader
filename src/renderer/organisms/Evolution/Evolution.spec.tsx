import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Evolution from './index';

jest.mock('renderer/contexts/Ranking/useRanking', () => {
  return function useRanking() {
    return {
      rankingData: [],
      isLoadingRanking: false,
    };
  };
});

describe('Evolution', () => {
  it('should render', () => {
    expect(render(<Evolution />)).toBeTruthy();
  });
});
