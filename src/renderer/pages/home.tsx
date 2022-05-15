import { memo, ReactNode } from 'react';
import { Navbar } from 'renderer/organisms';

const Home: React.FC<ReactNode> = () => {
  return (
    <div className="bg-background">
      <Navbar />
    </div>
  );
};

export default memo(Home);
