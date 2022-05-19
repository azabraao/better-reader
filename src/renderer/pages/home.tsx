import { memo, ReactNode } from 'react';
import { Container } from 'renderer/atoms';
import { LayoutSwitchProvider } from 'renderer/contexts';
import { DashboardLayout } from 'renderer/layout';
import { Evolution, Navbar, Practices, Ranking } from 'renderer/organisms';

const Home: React.FC<ReactNode> = () => {
  return (
    <LayoutSwitchProvider>
      <div className="bg-background">
        <Navbar />
        <Container>
          <DashboardLayout
            ranking={<Ranking />}
            evolution={<Evolution />}
            practices={<Practices />}
          />
        </Container>
      </div>
    </LayoutSwitchProvider>
  );
};

export default memo(Home);
