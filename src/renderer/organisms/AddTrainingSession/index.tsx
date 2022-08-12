import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checked, Error, Spinner, Title } from 'renderer/atoms';
import Icon from 'renderer/atoms/Icon';
import {
  AddTrainingUnit,
  BottomSheet,
  TextInput,
  TrainingUnit,
} from 'renderer/molecules';
import { addTrainingSession } from 'renderer/services';

const validationSchema = {
  sessionName: {
    required: { value: true, message: 'Provide a name' },
  },
};

type TrainingSessionFormData = {
  sessionName: string;
};

interface AddTrainingSessionProps {
  isOpen: boolean;
  close: () => void;
}

const AddTrainingSession = ({ isOpen, close }: AddTrainingSessionProps) => {
  const [trainingUnits, setTrainingUnits] = useState<TrainingUnit[]>([]);

  const { isError, isLoading, isSuccess, mutate } = useMutation(
    ['addTrainingSession'],
    addTrainingSession
  );

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
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
            queryClient.invalidateQueries(['getTrainingSessions']);
          },
        }
      );
    },
    [mutate, queryClient, trainingUnits]
  );

  if (isError) {
    setTimeout(() => {
      close();
    }, 3000);

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
            Sorry! There was an error, try again later
          </span>
        </div>
      </BottomSheet>
    );
  }

  if (isSuccess) {
    setTimeout(() => {
      close();

      // setTimeout(() => {
      //   setIsSaved(false);
      // }, 1000);
    }, 3000);

    return (
      <BottomSheet
        isOpen={isOpen}
        disabled
        elevationLevel={2}
        hideDragIndicator
      >
        <div className="flex p-8 gap-4 justify-center flex-col items-center">
          <Checked />
          <span className="text-base">Training saved!</span>
        </div>
      </BottomSheet>
    );
  }

  if (isLoading) {
    return (
      <BottomSheet isOpen disabled elevationLevel={2} hideDragIndicator>
        <div className="flex p-8 gap-4 justify-center flex-col items-center">
          <div>
            <Spinner />
          </div>
          <span className="text-base">Loading</span>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet isOpen={isOpen} close={close} elevationLevel={2}>
      <div className="px-4 max-w-screen-lg  w-full mx-auto lg:px-6">
        <div className="pt-2 pb-4 flex justify-between lg:pt-6">
          <Title level={2}>Add Training Session</Title>

          <div className="hidden lg:block">
            <Icon name="close" className="cursor-pointer" onClick={close} />
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-5">
          <TextInput
            label="Name your session:"
            placeholder="Focused on speed"
            {...register('sessionName', validationSchema.sessionName)}
            error={errors.sessionName?.message}
          />

          {trainingUnits.map(
            ({ target, duration, techniques }: TrainingUnit) => (
              <TrainingUnit
                key={target + Math.random()}
                duration={duration}
                target={target}
                techniques={techniques}
                isEditing
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
              Save training session
            </Button>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

export default memo(AddTrainingSession);