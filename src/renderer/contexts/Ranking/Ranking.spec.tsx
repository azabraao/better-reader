import '@testing-library/jest-dom';
import { waitFor, render, cleanup } from '@testing-library/react';
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
});
