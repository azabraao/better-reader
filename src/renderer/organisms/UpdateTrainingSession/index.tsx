import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checked, Error, Spinner } from 'renderer/atoms';
import {
  AddTrainingUnit,
  BottomSheet,
  EditableTrainingUnit,
  TextInput,
} from 'renderer/molecules';
import { updateTrainingSession } from 'renderer/services';

const validationSchema = {
  sessionName: {
    required: { value: true, message: 'Escreva um nome' },
  },
};

type TrainingSessionFormData = {
  sessionName: string;
};

const channel = new BroadcastChannel('update-training-session');

const UpdateTrainingSession = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sessionNameDefaultValue, setSessionNameDefaultValue] =
    useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  const [trainingUnits, setTrainingUnits] = useState<TrainingUnit[]>([]);
  const close = useCallback(() => setIsOpen(false), []);

  const {
    isError,
    isLoading,
    isSuccess,
    mutate,
    reset: resetMutation,
  } = useMutation(['updateTrainingSession'], updateTrainingSession);

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TrainingSessionFormData>();

  useEffect(() => {
    channel.onmessage = (event: {
      data: { session: TrainingSession; shouldOpen: boolean };
    }) => {
      setIsOpen(event.data.shouldOpen);
      setTrainingUnits(event.data.session.units);
      setSessionNameDefaultValue(event.data.session.name);
      setSessionId(event.data.session._id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddTrainingUnit = useCallback(
    (data: TrainingUnit) => {
      setTrainingUnits([...trainingUnits, data]);
    },
    [trainingUnits]
  );

  const onSubmit = useCallback(
    ({ sessionName }: TrainingSessionFormData) => {
      return mutate(
        { id: sessionId, name: sessionName, units: trainingUnits },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['getTrainingSessions']);
          },
        }
      );
    },
    [mutate, queryClient, trainingUnits, sessionId]
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
            Desculpe! Houve um erro, tente novamente depois.
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
      title="Editar Sessão de Treino"
      isOpen={isOpen}
      close={close}
      elevationLevel={2}
    >
      <div className="flex flex-col gap-4 pb-5">
        <TextInput
          label="Nomeie sua sessão:"
          placeholder="Focado em velocidade"
          defaultValue={sessionNameDefaultValue}
          {...register('sessionName', validationSchema.sessionName)}
          error={errors.sessionName?.message}
        />

        {trainingUnits.map(
          ({ target, duration, techniques, id }: TrainingUnit) => (
            <EditableTrainingUnit
              key={id}
              id={id}
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

export default memo(UpdateTrainingSession);
