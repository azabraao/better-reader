import { memo } from 'react';
import TextInput from '../TextInput';
import { useTrainingSessionCard } from '../TrainingSessionCard/Context';

const WordsPerPageInput = () => {
  const { wordsPerPage, setWordsPerPage } = useTrainingSessionCard();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    localStorage.setItem('wordsPerPage', value);
    setWordsPerPage(Number(value));
  };

  return (
    <div className="flex gap-2 items-center mb-5">
      <span className="text-base">Palavras por página</span>
      <TextInput
        placeholder="240"
        type="number"
        max={999}
        min={50}
        size="xs"
        defaultValue={wordsPerPage}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(WordsPerPageInput);
