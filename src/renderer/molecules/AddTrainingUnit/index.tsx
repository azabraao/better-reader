/* eslint-disable react/jsx-props-no-spreading */
import { memo, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Title, AddTrainingUnitButton } from 'renderer/atoms';
import TextInput from '../TextInput';
import TechniquesSelector from '../TechniquesSelector';

const validationSchema = {
  target: {
    required: { value: true, message: 'Provide a target' },
    min: {
      value: 300,
      message: 'Target must be at least 300',
    },
    max: {
      value: 20000,
      message: 'Target must be at most 20000',
    },
    maxLength: {
      value: 5,
      message: 'Target must be between 300 and 20000',
    },
    minLength: {
      value: 3,
      message: 'Target must be between 300 and 20000',
    },
  },
  duration: {
    required: { value: true, message: 'Provide a duration' },
    maxLength: {
      value: 2,
      message: 'Duration must be between 1 and 10',
    },
    minLength: {
      value: 1,
      message: 'Duration must be between 1 and 10',
    },
  },
};

interface AddTrainingUnitProps {
  onAdd: (data: TrainingUnit) => void;
}

const AddTrainingUnit = ({ onAdd }: AddTrainingUnitProps) => {
  const [isActive, setIsActive] = useState<boolean>();
  const [techniques, setTechniques] = useState<TechniqueItem[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<TrainingUnit>();

  const onTechniqueSelected = useCallback(
    (technique: TechniqueItem) => {
      clearErrors('techniques');

      return techniques.some((item) => technique.value === item.value)
        ? setTechniques(techniques.splice(techniques.indexOf(technique), 1))
        : setTechniques([...techniques, technique]);
    },
    [clearErrors, techniques]
  );

  const onSubmit = useCallback(
    (data: TrainingUnit) => {
      data.techniques = techniques;
      if (techniques.length === 0) {
        return setError('techniques', {
          type: 'required',
          message: 'Please select at least one technique',
        });
      }

      onAdd(data);
      reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setTechniques([]);
      return setIsActive(false);
    },
    [onAdd, reset, setError, techniques]
  );

  if (!isActive)
    return <AddTrainingUnitButton onClick={() => setIsActive(true)} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-1 border-muted rounded-lg flex flex-col gap-4">
        <div className="flex gap-2 flex-col">
          <Title level={3}>Whats the PPM target?</Title>
          <div className="flex gap-2 items-start">
            <TextInput
              max={20000}
              min={300}
              size="sm"
              type="number"
              placeholder="1000"
              textComplement="PPM"
              {...register('target', validationSchema.target)}
              error={errors.target?.message}
              autoFocus
            />
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <Title level={3}>Practice duration</Title>
          <div className="flex gap-2 items-start">
            <TextInput
              max={10}
              min={1}
              size="sm"
              type="number"
              placeholder="10"
              textComplement="Minutes"
              {...register('duration', validationSchema.duration)}
              error={errors.duration?.message}
            />
          </div>
        </div>
        <TechniquesSelector
          error={errors.techniques?.message}
          onTechniqueSelected={onTechniqueSelected}
        />
        <div className="flex flex-col gap-4 pt-3">
          <Button fullWidth theme="info" size="sm" type="submit">
            Save training unit
          </Button>
          <Button
            theme="transparent"
            fullWidth
            size="sm"
            onClick={() => setIsActive(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(AddTrainingUnit);
