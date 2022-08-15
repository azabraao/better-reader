import { memo } from 'react';
import { Title } from 'renderer/atoms';
import BottomSheet from '../BottomSheet';
import TextInput from '../TextInput';
import TrainingUnit from '../TrainingUnit';
import Control from './Control';

interface TrainingBottomSheetProps {
  session: TrainingSession;
  isOpen: boolean;
  close: () => void;
}

const TrainingBottomSheet = ({
  session,
  isOpen,
  close,
}: TrainingBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <div className="px-4 max-w-screen-lg  w-full mx-auto lg:px-6">
        <div className="mb-5">
          <Title>{session.name}</Title>
        </div>
        <div className="flex gap-2 items-center mb-5">
          <span className="text-base">Words per page</span>
          <TextInput
            placeholder="240"
            type="number"
            max={999}
            min={1000}
            size="xs"
            defaultValue={200}
          />
        </div>
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
