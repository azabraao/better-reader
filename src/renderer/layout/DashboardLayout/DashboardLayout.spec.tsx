import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Evolution, Practices, Ranking } from 'renderer/organisms';
import DashboardLayout from './index';

describe('DashboardLayout', () => {
  it('should render', () => {
    expect(
      render(
        <DashboardLayout
          ranking={<Ranking />}
          evolution={<Evolution />}
          practices={<Practices />}
        />
      )
    ).toBeTruthy();
  });
});
