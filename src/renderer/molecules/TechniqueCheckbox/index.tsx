import { memo, useCallback, useState } from 'react';
import clsx from 'clsx';
import Icon from 'renderer/atoms/Icon';

interface TechniqueCheckboxProps extends TechniqueItem {
  onSelect: ({ label, value }: TechniqueItem) => void;
  defaultActive?: boolean;
}

const TechniqueCheckbox = ({
  onSelect,
  value,
  label,
  defaultActive = false,
}: TechniqueCheckboxProps) => {
  const [isActive, setIsActive] = useState<boolean>(defaultActive);

  const onClick = useCallback(() => {
    onSelect({ value, label });
    setIsActive(!isActive);
  }, [isActive, label, onSelect, value]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 p-1 cursor-pointer',
        isActive && 'outline-2 outline-highlight outline'
      )}
    >
      <div>
        <Icon name={value} />
      </div>
      <span className="whitespace-nowrap text-sm">{label}</span>
    </button>
  );
};

TechniqueCheckbox.defaultProps = {
  defaultActive: false,
};

export default memo(TechniqueCheckbox);
