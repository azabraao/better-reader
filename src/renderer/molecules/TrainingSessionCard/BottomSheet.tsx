import { memo } from 'react';
import { Title } from 'renderer/atoms';
import Icon from 'renderer/atoms/Icon';
import BottomSheet from '../BottomSheet';
import TrainingUnit from '../TrainingUnit';
import WordsPerPageInput from '../WordsPerPageInput';
import { useTrainingUnitBottomSheet } from './BottomSheetContext';
import Control from './Control';

interface TrainingBottomSheetProps {
  session: TrainingSession;
  close: () => void;
}

const TrainingBottomSheet = ({ session, close }: TrainingBottomSheetProps) => {
  const { isOpen } = useTrainingUnitBottomSheet();
  return (
    <BottomSheet title={session.name} isOpen={isOpen} close={close}>
      <WordsPerPageInput />
      <div className="flex flex-col gap-2">
        {session.units.map((unit, index) => (
          <TrainingUnit key={Math.random()} {...unit} index={index} />
        ))}
      </div>
      <Control />
    </BottomSheet>
  );
};

export default memo(TrainingBottomSheet);
