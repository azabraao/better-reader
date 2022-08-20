import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Icon from './index';

describe('Icon', () => {
  it('should render', () => {
    expect(render(<Icon name="2_fixations" />)).toBeTruthy();
  });
});
