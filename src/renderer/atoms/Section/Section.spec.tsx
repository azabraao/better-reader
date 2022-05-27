import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Section from './index';

describe('Section', () => {
  it('should render', () => {
    const component = render(
      <Section title="test">
        <span />
      </Section>
    );

    screen.logTestingPlaygroundURL();

    expect(component).toBeTruthy();
  });

  it('should render a given title', () => {
    render(
      <Section title="Test title">
        <span />
      </Section>
    );

    expect(screen.getByText('Test title')).toBeInTheDocument();
  });
});
