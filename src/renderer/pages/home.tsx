import { memo } from 'react';
import { Container } from 'renderer/atoms';
import {
  AppInitializationProvider,
  LayoutSwitchProvider,
} from 'renderer/contexts';
import { DashboardLayout } from 'renderer/layout';
import { AppIntroduction } from 'renderer/molecules';
import {
  Evolution,
  Navbar,
  TrainingSessions,
  Ranking,
  AddTrainingSession,
} from 'renderer/organisms';

const Home = () => {
  return (
    <AppInitializationProvider>
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
      <AddTrainingSession />
      <AppIntroduction />
    </AppInitializationProvider>
  );
};

export default memo(Home);
