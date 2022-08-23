import { memo, useCallback, useState } from 'react';
import Icon from 'renderer/atoms/Icon';
import { millisecondsToMinutes, techniquesToItems } from 'renderer/utils';
import EditTrainingUnit from '../EditTrainingUnit';

interface TrainingUnitProps extends TrainingUnit {
  isEditing?: boolean;
  onEditTrainingUnit: (data: TrainingUnit) => void;
}

const EditableTrainingUnit = ({
  target,
  duration,
  techniques,
  isEditing,
  id,
  onEditTrainingUnit,
}: TrainingUnitProps) => {
  const [shouldEdit, setShouldEdit] = useState<boolean>(false);

  const onClick = useCallback(() => {
    if (isEditing) setShouldEdit(true);
  }, [isEditing]);

  const onEdit = useCallback(
    (data: TrainingUnit) => {
      onEditTrainingUnit(data);

      setShouldEdit(false);
    },
    [onEditTrainingUnit]
  );

  if (shouldEdit)
    return (
      <EditTrainingUnit
        onEdit={onEdit}
        id={id}
        onCancel={() => setShouldEdit(false)}
        defaultValues={{
          id,
          target,
          duration: millisecondsToMinutes(duration),
          techniques,
        }}
      />
    );

  const minutes = millisecondsToMinutes(duration);

  const techniquesItems = techniquesToItems(techniques);

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
        <span className="text-base">{minutes}min</span>
      </div>
      {techniquesItems.map((technique) => (
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

EditableTrainingUnit.defaultProps = {
  isEditing: false,
};

export default memo(EditableTrainingUnit);
