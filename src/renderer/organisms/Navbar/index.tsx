import { memo } from 'react';
import { Container, Logo } from 'renderer/atoms';

const Navbar = () => {
  return (
    <div className="py-4 mb-4">
      <Container>
        <Logo />
      </Container>
    </div>
  );
};

export default memo(Navbar);
