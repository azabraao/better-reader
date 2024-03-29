/* eslint-disable react/jsx-props-no-spreading */
import { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Title, AddTrainingUnitButton } from 'renderer/atoms';
import { minutesToMilliseconds } from 'renderer/utils';
import TextInput from '../TextInput';
import TechniquesSelector from '../TechniquesSelector';

const validationSchema = {
  target: {
    required: { value: true, message: 'Provide a target' },
    min: {
      value: 300,
      message: 'Objetivo tem de ser pelo menos 300',
    },
    max: {
      value: 20000,
      message: 'Objetivo tem de ser no máximo 20000',
    },
    maxLength: {
      value: 5,
      message: 'Objetivo tem de ser entre 300 e 20000',
    },
    minLength: {
      value: 3,
      message: 'Objetivo tem de ser entre 300 e 20000',
    },
  },
  duration: {
    required: { value: true, message: 'Forneça uma duração' },
    maxLength: {
      value: 2,
      message: 'Duração tem de ser entre 1 e 10',
    },
    minLength: {
      value: 1,
      message: 'Duração tem de ser entre 1 e 10',
    },
  },
};

interface AddTrainingUnitProps {
  onAdd: (data: TrainingUnit) => void;
}

const AddTrainingUnit = ({ onAdd }: AddTrainingUnitProps) => {
  const [isActive, setIsActive] = useState<boolean>();
  const [techniques, setTechniques] = useState<Technique[]>([]);

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

      const shouldRemoveTechnique = techniques.some(
        (item) => technique.value === item
      );

      return shouldRemoveTechnique
        ? setTechniques(
            techniques.splice(techniques.indexOf(technique.value), 1)
          )
        : setTechniques([...techniques, technique.value]);
    },
    [clearErrors, techniques]
  );

  const onSubmit = useCallback(
    (data: TrainingUnit) => {
      const payload = {
        id: Math.random().toString(),
        target: Number(data.target),
        techniques,
        duration: minutesToMilliseconds(data.duration),
      };

      if (techniques.length === 0) {
        return setError('techniques', {
          type: 'required',
          message: 'Selecione pelo menos uma técnica',
        });
      }

      onAdd(payload);
      reset();
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
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex gap-2 flex-col">
            <Title level={3}>Qual é o objetivo em PPM?</Title>
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
            <Title level={3}>Duração da prática</Title>
            <div className="flex gap-2 items-start">
              <TextInput
                max={10}
                min={1}
                size="sm"
                type="number"
                placeholder="10"
                textComplement="Minutos"
                {...register('duration', validationSchema.duration)}
                error={errors.duration?.message}
              />
            </div>
          </div>
        </div>
        <TechniquesSelector
          error={errors.techniques?.message}
          onTechniqueSelected={onTechniqueSelected}
        />
        <div className="flex flex-col gap-4 pt-3">
          <Button fullWidth theme="info" size="sm" type="submit">
            Salvar unidade de treinamento
          </Button>
          <Button
            theme="transparent"
            fullWidth
            size="sm"
            onClick={() => setIsActive(false)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(AddTrainingUnit);
