import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checked, Error, Spinner } from 'renderer/atoms';
import { useAppInitialization } from 'renderer/contexts';
import {
  AddTrainingUnit,
  BottomSheet,
  EditableTrainingUnit,
  TextInput,
} from 'renderer/molecules';
import { addTrainingSession } from 'renderer/services';

const validationSchema = {
  sessionName: {
    required: { value: true, message: 'Escolha um nome' },
  },
};

type TrainingSessionFormData = {
  sessionName: string;
};

const channel = new BroadcastChannel('training-session');

const AddTrainingSession = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trainingUnits, setTrainingUnits] = useState<TrainingUnit[]>([]);
  const { registerAppInitialization } = useAppInitialization();
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    channel.onmessage = (event: { data: { shouldOpen: boolean } }) => {
      setIsOpen(event.data.shouldOpen);
    };
  }, []);

  const {
    isError,
    isLoading,
    isSuccess,
    mutate,
    reset: resetMutation,
  } = useMutation(['addTrainingSession'], addTrainingSession);

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TrainingSessionFormData>();

  const onAddTrainingUnit = useCallback(
    (data: TrainingUnit) => {
      setTrainingUnits([...trainingUnits, data]);
    },
    [trainingUnits]
  );

  const onSubmit = useCallback(
    ({ sessionName }: TrainingSessionFormData) => {
      mutate(
        { name: sessionName, units: trainingUnits },
        {
          onSuccess: () => {
            reset();
            queryClient.invalidateQueries(['getTrainingSessions']);
            registerAppInitialization();
            setTrainingUnits([]);
          },
        }
      );
    },
    [mutate, queryClient, registerAppInitialization, reset, trainingUnits]
  );

  const onEditTrainingUnit = useCallback(
    (data: TrainingUnit) => {
      const index = trainingUnits.findIndex((unit) => unit.id === data.id);
      const newTrainingUnits = [...trainingUnits];
      newTrainingUnits[index] = data;
      setTrainingUnits(newTrainingUnits);
    },
    [trainingUnits]
  );

  if (isError) {
    setTimeout(() => {
      close();
      setTimeout(() => {
        resetMutation();
      }, 1000);
    }, 2000);

    return (
      <BottomSheet
        isOpen={isOpen}
        disabled
        elevationLevel={2}
        hideDragIndicator
      >
        <div className="flex p-8 gap-4 justify-center flex-col items-center">
          <Error />
          <span className="text-base">
            Desculpe, ocorreu um erro ao tentar criar a sessão de treino.
          </span>
        </div>
      </BottomSheet>
    );
  }

  if (isSuccess) {
    setTimeout(() => {
      close();
      setTimeout(() => {
        resetMutation();
      }, 1000);
    }, 1000);

    return (
      <BottomSheet
        isOpen={isOpen}
        disabled
        elevationLevel={2}
        hideDragIndicator
      >
        <div className="flex px-3 py-8 gap-4 justify-center flex-col items-center">
          <Checked />
          <span className="text-base">Treino salvo!</span>
        </div>
      </BottomSheet>
    );
  }

  if (isLoading) {
    return (
      <BottomSheet isOpen disabled elevationLevel={2} hideDragIndicator>
        <div className="flex px-3 py-8 gap-4 justify-center flex-col items-center">
          <div>
            <Spinner />
          </div>
          <span className="text-base">Carregando</span>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      title="Add Training Session"
      isOpen={isOpen}
      close={close}
      elevationLevel={2}
    >
      <div className="flex flex-col gap-4 pb-5">
        <TextInput
          label="Nomeie sua sessão:"
          placeholder="Focado em velocidade"
          {...register('sessionName', validationSchema.sessionName)}
          error={errors.sessionName?.message}
        />

        {trainingUnits.map(
          ({ target, duration, techniques, id }: TrainingUnit) => (
            <EditableTrainingUnit
              id={id}
              key={id}
              duration={duration}
              target={target}
              techniques={techniques}
              isEditing
              onEditTrainingUnit={onEditTrainingUnit}
            />
          )
        )}

        <AddTrainingUnit onAdd={onAddTrainingUnit} />
        {trainingUnits.length > 0 && (
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            theme="primary"
          >
            Salvar sessão de treino
          </Button>
        )}
      </div>
    </BottomSheet>
  );
};

export default memo(AddTrainingSession);
