import { memo } from 'react';
import { Button, Title } from 'renderer/atoms';
import { Welcome } from 'renderer/atoms/Illustration';
import { useAppInitialization } from 'renderer/contexts';
import { useAddTrainingSession } from 'renderer/hooks';

const AppIntroduction = () => {
  const { openAddTrainingSession } = useAddTrainingSession();
  const { isAppInitialized } = useAppInitialization();

  if (isAppInitialized) return null;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-white text-center">
      <div className="max-w-fit flex flex-col items-center justify-center  gap-14">
        <Title level={1}>Welcome aboard!</Title>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Welcome />
          <span className="text-base">
            Start by creating your first Training Session.
          </span>
        </div>
        <Button fullWidth onClick={openAddTrainingSession}>
          Create now
        </Button>
      </div>
    </div>
  );
};

export default memo(AppIntroduction);
