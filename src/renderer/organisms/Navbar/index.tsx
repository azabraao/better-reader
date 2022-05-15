import { memo, ReactNode } from 'react';
import { Container, Logo } from 'renderer/atoms';

const Navbar: React.FC<ReactNode> = () => {
  return (
    <div className="py-4">
      <Container>
        <Logo />
      </Container>
    </div>
  );
};

export default memo(Navbar);
