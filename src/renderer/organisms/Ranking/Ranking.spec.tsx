import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Ranking from './index';

describe('Ranking', () => {
  it('should render', () => {
    expect(render(<Ranking />)).toBeTruthy();
  });
});
