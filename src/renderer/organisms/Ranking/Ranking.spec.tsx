import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import useLayoutSwitch from 'renderer/contexts/LayoutSwitch/useLayoutSwitch';
import useRanking from 'renderer/contexts/Ranking/useRanking';

import Ranking from './index';

jest.mock('renderer/contexts/LayoutSwitch/useLayoutSwitch');
jest.mock('renderer/contexts/Ranking/useRanking');

describe('Ranking', () => {
  it('should render', () => {
    const useLayoutSwitchMocked = jest.mocked(useLayoutSwitch);
    const useRankingMocked = jest.mocked(useRanking);

    useRankingMocked.mockReturnValue({
      rankingData: [],
      isLoadingRanking: false,
    });
    useLayoutSwitchMocked.mockReturnValue({ isRankingFocused: false });

    expect(render(<Ranking />)).toBeTruthy();
  });

  it('should render with no items displayed', () => {
    const useLayoutSwitchMocked = jest.mocked(useLayoutSwitch);
    const useRankingMocked = jest.mocked(useRanking);

    useRankingMocked.mockReturnValue({
      rankingData: [],
      isLoadingRanking: false,
    });
    useLayoutSwitchMocked.mockReturnValue({ isRankingFocused: false });
    render(<Ranking />);

    expect(screen.queryByText('No items to show')).toBeInTheDocument();
  });

  it('should render with items displayed', () => {
    const useLayoutSwitchMocked = jest.mocked(useLayoutSwitch);
    const useRankingMocked = jest.mocked(useRanking);

    useRankingMocked.mockReturnValue({
      rankingData: [
        {
          words: 77,
          ppm: 1103,
          date: '1/24/2022',
          comprehension: 15,
          points: 973,
          techniques: ['Sweeping', 'Writing down words', 'Cantarolando'],
        },
        {
          words: 79,
          ppm: 840,
          date: '4/9/2022',
          comprehension: 11,
          points: 840,
          techniques: ['Sweeping', 'Writing down words', 'Cantarolando'],
        },
        {
          words: 4,
          ppm: 350,
          date: '11/28/2021',
          comprehension: 30,
          points: 751,
          techniques: ['Sweeping', 'Writing down words'],
        },
      ],
      isLoadingRanking: false,
    });
    useLayoutSwitchMocked.mockReturnValue({ isRankingFocused: false });
    render(<Ranking />);

    expect(screen.queryByText('973pts')).toBeInTheDocument();
    expect(screen.queryByText('840pts')).toBeInTheDocument();
    expect(screen.queryByText('751pts')).toBeInTheDocument();
  });
});
