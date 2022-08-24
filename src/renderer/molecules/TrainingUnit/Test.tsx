/* eslint-disable no-nested-ternary */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'renderer/atoms';
import { addPractice } from 'renderer/services';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import { useTrainingSessionCard } from '../TrainingSessionCard/Context';

interface TestProps {
  techniques: TechniqueItem[];
  onFinish: () => void;
}

type TestFormData = {
  words: string;
  comprehension: string;
  pagesAmount: string;
};

const validationSchema = {
  words: {
    required: false,
  },
  comprehension: {
    required: {
      value: true,
      message: 'please enter a comprehension',
    },
    max: {
      value: 100,
      message: 'comprehension must be less than 101',
    },
    min: {
      value: 0,
      message: 'comprehension must be greater than 0',
    },
  },
  pagesAmount: {
    required: {
      value: true,
      message: 'please enter a pages amount',
    },
    max: {
      value: 999,
      message: 'pages amount must be less than 1000',
    },
    min: {
      value: 0,
      message: 'pages amount must be greater than 0',
    },
  },
};

const Test = ({ techniques, onFinish }: TestProps) => {
  const shouldWriteDown = techniques.some(
    (technique) => technique.value === 'writing'
  );

  const { wordsPerPage } = useTrainingSessionCard();

  const queryClient = useQueryClient();
  const { isError, isLoading, isSuccess, mutate } = useMutation(
    ['addPractice'],
    addPractice
  );

  useEffect(() => {
    if (isSuccess) {
      onFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TestFormData>();

  const onSubmit = (data: TestFormData) => {
    const words = data.words?.trim()?.split(' ')?.length;

    const ppm = wordsPerPage * Number(data.pagesAmount);

    mutate(
      {
        ppm,
        words,
        comprehension: Number(data.comprehension),
        techniques: techniques.map((technique) => technique.value),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['getRanking']);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 pt-4 lg:pt-0">
      <div className="flex flex-col md:flex-row gap-10 pb-4">
        <TextInput
          placeholder="999"
          autoFocus
          max={999}
          min={1}
          maxLength={3}
          size="sm"
          label="How many pages did you read?"
          type="number"
          textComplement="Pages"
          {...register('pagesAmount', validationSchema.pagesAmount)}
          error={errors.pagesAmount?.message}
        />
        <TextInput
          placeholder="999"
          max={100}
          maxLength={3}
          min={1}
          size="sm"
          label="Rate your comprehension:"
          type="number"
          textComplement="%"
          {...register('comprehension', validationSchema.comprehension)}
          error={errors.comprehension?.message}
        />
      </div>
      {shouldWriteDown && (
        <div className="pb-4">
          <TextArea
            placeholder="Write here..."
            size="sm"
            label="Write down the words"
            {...register('words', validationSchema.words)}
            error={errors.words?.message}
          />
        </div>
      )}
      {isError ? (
        <Button fullWidth size="sm" theme="danger">
          There was an error, please try again
        </Button>
      ) : isLoading ? (
        <Button fullWidth size="sm">
          Loading...
        </Button>
      ) : (
        <Button fullWidth size="sm" onClick={handleSubmit(onSubmit)}>
          Save this lesson
        </Button>
      )}
    </div>
  );
};

export default memo(Test);
