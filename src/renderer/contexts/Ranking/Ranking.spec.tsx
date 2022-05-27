import '@testing-library/jest-dom';
import { waitFor, render, cleanup } from '@testing-library/react';
import { api } from 'renderer/utils';
import { RankingProvider } from './index';

jest.mock('renderer/utils', () => {
  return {
    api: {
      get: jest.fn(() => Promise.resolve({ data: [] })),
    },
  };
});

afterEach(cleanup);

describe('RankingProvider', () => {
  it('should render', async () => {
    const { getByTestId } = render(
      <RankingProvider>
        <span data-testid="test-span" />
      </RankingProvider>
    );

    const listNode = await waitFor(() => getByTestId('test-span'));

    expect(listNode).toBeTruthy();
  });

  it('should call /ranking and load data', async () => {
    const mockedGet = jest.mocked(api.get);

    const date = new Date();

    mockedGet.mockResolvedValueOnce({
      data: [
        {
          points: 0,
          words: 0,
          ppm: 0,
          date,
          comprehension: 0,
          techniques: [],
        },
      ],
    });

    const response = await api.get('/ranking');

    expect(response.data).toEqual(
      expect.arrayContaining([
        {
          points: 0,
          words: 0,
          ppm: 0,
          date,
          comprehension: 0,
          techniques: [],
        },
      ])
    );
  });
});
