import { memo, ReactNode } from 'react';
import { Dropdown } from 'renderer/molecules';
import { Navbar } from 'renderer/organisms';

const Home: React.FC<ReactNode> = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <Dropdown items={['Anotando', 'Anotasndo', 'Anotfando', 'Anotanbdo']} />
    </div>
  );
};

export default memo(Home);
