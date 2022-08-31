import { memo } from 'react';
import { Edit } from 'renderer/atoms/Icon';
import { useUpdateTrainingSession } from 'renderer/hooks';
import { ifSpaceBar } from 'renderer/utils';
import { useTrainingSessionCard } from '../Context';

const EditSession = () => {
  const { session } = useTrainingSessionCard();
  const { openUpdateTrainingSession } = useUpdateTrainingSession();

  const onClick = (
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    openUpdateTrainingSession(session);
  };

  return (
    <div
      className="flex gap-2 pt-4 pb-2 px-4 text-white text-base"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => ifSpaceBar(e, onClick)}
    >
      <Edit />
      <span>Editar sessão de treino</span>
    </div>
  );
};

export default memo(EditSession);
