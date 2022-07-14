import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TrainingSessions from './index';

describe('TrainingSessions', () => {
  it('should render', () => {
    expect(render(<TrainingSessions />)).toBeTruthy();
  });
});
