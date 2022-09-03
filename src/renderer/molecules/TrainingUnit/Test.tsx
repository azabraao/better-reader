/* eslint-disable no-nested-ternary */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'renderer/atoms';
import { addPractice } from 'renderer/services';
import { calculatePracticePoints } from 'renderer/utils';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import { useTrainingSessionCard } from '../TrainingSessionCard/Context';

interface TestProps {
  techniques: TechniqueItem[];
  onFinish: (results: TestResults) => void;
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
      message: 'O quanto você compreendeu?',
    },
    max: {
      value: 100,
      message: 'Compreensão precisa ser no máximo 100%',
    },
    min: {
      value: 0,
      message: 'Compreensão precisa ser no mínimo 0%',
    },
  },
  pagesAmount: {
    required: {
      value: true,
      message: 'Quantas páginas você leu?',
    },
    max: {
      value: 999,
      message: 'No máximo 999',
    },
    min: {
      value: 0,
      message: 'No mínimo 0',
    },
  },
};

const Test = ({ techniques, onFinish }: TestProps) => {
  const shouldWriteDown = techniques.some(
    (technique) => technique.value === 'writing'
  );

  const { wordsPerPage } = useTrainingSessionCard();

  const queryClient = useQueryClient();
  const { isError, isLoading, mutate } = useMutation(
    ['addPractice'],
    addPractice
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TestFormData>();

  const onSubmit = (data: TestFormData) => {
    const words = data.words?.trim()?.split(' ')?.length;

    const wpm = wordsPerPage * Number(data.pagesAmount);

    mutate(
      {
        ppm: wpm,
        words,
        comprehension: Number(data.comprehension),
        techniques: techniques.map((technique) => technique.value),
      },
      {
        onSuccess: () => {
          onFinish({
            wpm,
            pts: calculatePracticePoints({
              wpm,
              comprehension: Number(data.comprehension),
              words,
            }),
          });
          queryClient.invalidateQueries(['getRanking']);
          queryClient.invalidateQueries(['getPracticesEvolution']);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 pt-4 lg:pt-0">
      {shouldWriteDown && (
        <div className="pb-4">
          <TextArea
            placeholder="Escreva aqui..."
            size="sm"
            label="Anote as palavras"
            autoFocus
            {...register('words', validationSchema.words)}
            error={errors.words?.message}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-10 pb-4">
        <TextInput
          placeholder="999"
          max={999}
          min={1}
          maxLength={3}
          size="sm"
          label="Quantas páginas você leu?"
          type="number"
          textComplement="Páginas"
          {...register('pagesAmount', validationSchema.pagesAmount)}
          error={errors.pagesAmount?.message}
        />
        <TextInput
          placeholder="999"
          max={100}
          maxLength={3}
          min={1}
          size="sm"
          label="Avalie sua compreensão:"
          type="number"
          textComplement="%"
          {...register('comprehension', validationSchema.comprehension)}
          error={errors.comprehension?.message}
        />
      </div>
      {isError ? (
        <Button fullWidth size="sm" theme="danger">
          Houve um erro, tente novamente
        </Button>
      ) : isLoading ? (
        <Button fullWidth size="sm">
          Carregando...
        </Button>
      ) : (
        <Button fullWidth size="sm" onClick={handleSubmit(onSubmit)}>
          Salvar esta lição
        </Button>
      )}
    </div>
  );
};

export default memo(Test);
