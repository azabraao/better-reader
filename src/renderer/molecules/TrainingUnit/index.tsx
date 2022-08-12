import { memo, useCallback, useState } from 'react';
import Icon from 'renderer/atoms/Icon';
import EditTrainingUnit from '../EditTrainingUnit';

interface TrainingUnitProps extends TrainingUnit {
  isEditing?: boolean;
}

const TrainingUnit = ({
  target,
  duration,
  techniques,
  isEditing,
}: TrainingUnitProps) => {
  const [shouldEdit, setShouldEdit] = useState<boolean>(false);

  const onClick = useCallback(() => {
    if (isEditing) setShouldEdit(true);
  }, [isEditing]);

  const onEdit = useCallback(() => {
    setShouldEdit(false);
  }, []);

  if (shouldEdit)
    return (
      <EditTrainingUnit
        onEdit={onEdit}
        onCancel={() => setShouldEdit(false)}
        defaultValues={{
          target,
          duration,
          techniques,
        }}
      />
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-wrap gap-y-2 md:gap-y-4 gap-x-5 p-2 md:p-4 border-2 border-solid border-white rounded-lg cursor-pointer"
    >
      <div className="flex gap-2 items-center">
        <Icon name="speed" />
        <span className="text-base">{target}ppm</span>
      </div>
      <div className="flex gap-2 items-center">
        <Icon name="clock" />
        <span className="text-base">{duration}min</span>
      </div>
      {techniques.map((technique) => (
        <div
          key={technique.value + Math.random()}
          className="flex gap-2 items-center"
        >
          <Icon name={technique.value} />
          <span className="text-base">{technique.label}</span>
        </div>
      ))}
    </button>
  );
};

TrainingUnit.defaultProps = {
  isEditing: false,
};

export default memo(TrainingUnit);
