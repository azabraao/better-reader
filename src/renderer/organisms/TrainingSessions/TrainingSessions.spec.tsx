import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TrainingSessions from './index';

const queryClient = new QueryClient();

describe('TrainingSessions', () => {
  it('should render', () => {
    expect(
      render(
        <QueryClientProvider client={queryClient}>
          <TrainingSessions />
        </QueryClientProvider>
      )
    ).toBeTruthy();
  });
});
