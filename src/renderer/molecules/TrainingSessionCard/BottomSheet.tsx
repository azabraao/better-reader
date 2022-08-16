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
    <BottomSheet isOpen={isOpen} close={close}>
      <div className="px-4 max-w-screen-lg  w-full mx-auto lg:px-6">
        <div className="pt-2 pb-4 flex justify-between lg:pt-6">
          <Title>{session.name}</Title>

          <div className="hidden lg:block">
            <Icon name="close" className="cursor-pointer" onClick={close} />
          </div>
        </div>
        <WordsPerPageInput />
        <div className="flex flex-col gap-2">
          {session.units.map((unit, index) => (
            <TrainingUnit key={Math.random()} {...unit} index={index} />
          ))}
        </div>
        <Control />
      </div>
    </BottomSheet>
  );
};

export default memo(TrainingBottomSheet);
