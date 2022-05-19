import { memo, ReactNode } from 'react';
import { Container } from 'renderer/atoms';
import { Navbar, Ranking } from 'renderer/organisms';

const Home: React.FC<ReactNode> = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <Container>
        <Ranking />
      </Container>
    </div>
  );
};

export default memo(Home);
