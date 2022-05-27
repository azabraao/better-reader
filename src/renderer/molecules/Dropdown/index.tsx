/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useState } from 'react';
import clsx from 'clsx';
import ArrowIcon from 'renderer/assets/icons/arrow-down-white.svg';
import { Portal } from 'renderer/atoms';
import ListItem from './components/ListItem';

type ItemType = {
  label: string;
  icon?: React.ReactNode;
};

type DropdownProps = React.PropsWithChildren<{
  items: ItemType[];
  defaultOpen?: boolean;
  onSelected: (item: string) => void;
}>;

const defaultProps = {
  defaultOpen: false,
};

const Dropdown = ({
  items,
  defaultOpen,
  onSelected,
}: DropdownProps & typeof defaultProps) => {
  const [selected, setSelected] = useState(items[0]);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const onSelect = useCallback(
    (item) => {
      onSelected(item.label);
      setSelected(item);
      setIsOpen(false);
    },
    [onSelected]
  );

  return (
    <>
      <Portal isOpen={isOpen} onClick={closeDropdown} />
      <div className="relative w-full z-10">
        <button
          onClick={toggleDropdown}
          className="flex justify-between p-2 w-full rounded-lg border-white border-2 bg-background text-white cursor-pointer"
          type="button"
          tabIndex={0}
          data-testid="dropdown-button"
        >
          <div className="flex items-center">
            {selected.icon}
            <span className="ml-2">{selected.label}</span>
          </div>
          <ArrowIcon />
        </button>
        <ul
          className={clsx(
            'absolute py-2 bg-background shadow-elevation-2 rounded-lg w-full transition-[top,opacity]',
            isOpen
              ? 'top-full opacity-100'
              : 'top-0 opacity-0 pointer-events-none'
          )}
          data-testid="dropdown-list"
          aria-hidden={!isOpen}
        >
          {items.map((item, index) => (
            <ListItem
              selected={item.label === selected.label}
              key={index}
              icon={item.icon}
              onSelect={onSelect}
              label={item.label}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

Dropdown.defaultProps = defaultProps;

export default memo(Dropdown);
