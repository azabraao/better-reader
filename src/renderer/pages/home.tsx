import { memo, ReactNode } from 'react';
import Logo from 'renderer/atoms/Logo';

const Home: React.FC<ReactNode> = () => {
  return (
    <div className="bg-background">
      <Logo />;
    </div>
  );
};

export default memo(Home);
