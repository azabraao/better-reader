import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DashboardLayout from './index';

describe('DashboardLayout', () => {
  it('should render', () => {
    expect(render(<DashboardLayout />)).toBeTruthy();
  });
});
