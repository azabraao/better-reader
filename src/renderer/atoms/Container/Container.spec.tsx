import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Container from './index';

describe('Container component', () => {
  it('should render', () => {
    expect(
      render(
        <Container>
          <h1>test</h1>
        </Container>
      )
    ).toBeTruthy();
  });
});
