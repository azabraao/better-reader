import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Section from './index';

describe('Section', () => {
  it('should render', () => {
    expect(render(<Section />)).toBeTruthy();
  });
});
