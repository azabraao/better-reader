import { memo } from 'react';
import { Container } from 'renderer/atoms';
import { LayoutSwitchProvider } from 'renderer/contexts';
import { DashboardLayout } from 'renderer/layout';
import {
  Evolution,
  Navbar,
  TrainingSessions,
  Ranking,
} from 'renderer/organisms';

const Home = () => {
  return (
    <LayoutSwitchProvider>
      <div className="bg-background">
        <Navbar />
        <Container>
          <DashboardLayout
            ranking={<Ranking />}
            evolution={<Evolution />}
            practices={<TrainingSessions />}
          />
        </Container>
      </div>
    </LayoutSwitchProvider>
  );
};

export default memo(Home);
