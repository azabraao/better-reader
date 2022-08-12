import { memo } from 'react';
import { InputErrorMessage, Title } from 'renderer/atoms';
import { techniques } from 'renderer/utils';
import TechniqueCheckbox from '../TechniqueCheckbox';

interface TechniquesSelectorProps {
  onTechniqueSelected: (technique: TechniqueItem) => void;
  error?: string;
  selected?: TechniqueItem[];
}

const TechniquesSelector = ({
  onTechniqueSelected,
  error,
  selected,
}: TechniquesSelectorProps) => {
  return (
    <div className="flex gap-2 flex-col">
      <Title level={3}>Techniques</Title>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2">
        {techniques.map(({ label, value }) => (
          <TechniqueCheckbox
            defaultActive={selected?.some((item) => item.value === value)}
            onSelect={onTechniqueSelected}
            key={value}
            value={value}
            label={label}
          />
        ))}
      </div>
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </div>
  );
};

TechniquesSelector.defaultProps = {
  error: undefined,
  selected: [],
};

export default memo(TechniquesSelector);
