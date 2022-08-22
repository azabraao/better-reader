import { memo, useCallback, useState } from 'react';
import { FloatingButton } from 'renderer/atoms';
import Icon from 'renderer/atoms/Icon';
import { BottomSheet, Section } from 'renderer/molecules';
import ListSessions from './ListSessions';
import SectionActionsIcons from './SectionActionsIcons';

interface MobileTrainingSessionsProps {
  sessions: TrainingSession[];
}

const MobileTrainingSessions = ({ sessions }: MobileTrainingSessionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div>
      <BottomSheet isOpen={isOpen} close={close}>
        <Section
          justifyBetween
          title="Training Sessions"
          actions={<SectionActionsIcons />}
        >
          <div className="flex flex-wrap gap-4 no-scrollbar overflow-y-auto md:grid md:grid-cols-3">
            <ListSessions sessions={sessions} />
          </div>
        </Section>
      </BottomSheet>
      <FloatingButton icon={<Icon name="exercise" color="" />} onClick={open} />
    </div>
  );
};

export default memo(MobileTrainingSessions);
