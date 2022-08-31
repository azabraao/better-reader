/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
  useAppInitialization,
  useLayoutSwitch,
  useRanking,
} from 'renderer/contexts';

import Ranking from './Component';

jest.mock('renderer/contexts');
jest.mock('react-draggable-bottom-sheet', () => {
  return {
    DraggableBottomSheet: ({ children }: any) => children,
  };
});

describe('Ranking', () => {
  it('should render', () => {
    const useLayoutSwitchMocked = jest.mocked(useLayoutSwitch);
    const useRankingMocked = jest.mocked(useRanking);

    useRankingMocked.mockReturnValue({
      rankingData: [],
      isLoadingRanking: false,
    } as any);
    useLayoutSwitchMocked.mockReturnValue({
      isRankingFocused: false,
      setIsRankingFocused: jest.fn,
    } as any);

    expect(render(<Ranking />)).toBeTruthy();
  });

  it('should render with no items displayed', () => {
    const useLayoutSwitchMocked = jest.mocked(useLayoutSwitch);
    const useRankingMocked = jest.mocked(useRanking);
    const useAppInitializationMocked = jest.mocked(useAppInitialization);

    useRankingMocked.mockReturnValue({
      rankingData: [],
      isLoadingRanking: false,
      showOnlyPodium: false,
      rankingIsEmpty: false,
      reachedRankingEnd: false,
      expandPodium: jest.fn,
      minimizePodium: jest.fn,
      loadMoreRankingData: jest.fn,
    });
    useLayoutSwitchMocked.mockReturnValue({
      isRankingFocused: false,
      setIsRankingFocused: jest.fn,
      toggleRankingFocus: jest.fn,
    });
    useAppInitializationMocked.mockReturnValue({
      isAppInitialized: true,
      registerAppInitialization: jest.fn,
      setIsAppInitialized: jest.fn,
    });

    const { debug } = render(<Ranking />);

    debug();
    expect(screen.queryByText('Sem itens para mostrar')).toBeInTheDocument();
  });

  it('should render with items displayed', () => {
    const useLayoutSwitchMocked = jest.mocked(useLayoutSwitch);
    const useRankingMocked = jest.mocked(useRanking);

    useRankingMocked.mockReturnValue({
      rankingData: [
        {
          words: 77,
          ppm: 1103,
          createdAt: new Date(),
          updatedAt: new Date(),
          comprehension: 15,
          points: 973,
          techniques: ['sweeping', 'writing'],
        },
        {
          words: 79,
          ppm: 840,
          createdAt: new Date(),
          updatedAt: new Date(),
          comprehension: 11,
          points: 840,
          techniques: ['sweeping', 'writing'],
        },
        {
          words: 4,
          ppm: 350,
          createdAt: new Date(),
          updatedAt: new Date(),
          comprehension: 30,
          points: 751,
          techniques: ['sweeping', 'writing'],
        },
      ],
      isLoadingRanking: false,
      showOnlyPodium: false,
      reachedRankingEnd: false,
      rankingIsEmpty: false,
      expandPodium: jest.fn,
      minimizePodium: jest.fn,
      loadMoreRankingData: jest.fn,
    });
    useLayoutSwitchMocked.mockReturnValue({
      isRankingFocused: false,
      setIsRankingFocused: jest.fn,
    } as any);

    render(<Ranking />);

    expect(screen.queryByText('973pts')).toBeInTheDocument();
    expect(screen.queryByText('840pts')).toBeInTheDocument();
    expect(screen.queryByText('751pts')).toBeInTheDocument();
  });
});
