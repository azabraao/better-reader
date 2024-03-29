/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useState } from 'react';
import clsx from 'clsx';
import { ArrowDown } from 'renderer/atoms/Icon';
import { Backdrop } from 'renderer/atoms';
import ListItem from './components/ListItem';

type DropdownProps = React.PropsWithChildren<{
  items: DropdownItem[];
  defaultOpen?: boolean;
  onSelected: (item: string) => void;
}>;

const defaultProps = {
  defaultOpen: false,
  showButton: true,
};

const Dropdown = ({
  items,
  defaultOpen,
  onSelected,
  showButton,
}: DropdownProps & typeof defaultProps) => {
  const [selected, setSelected] = useState<DropdownItem>(items[0]);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const onSelect = useCallback(
    (item: DropdownItem) => {
      onSelected(item.value);
      setSelected(item);
      setIsOpen(false);
    },
    [onSelected]
  );

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={closeDropdown} />
      <div className={clsx('relative w-full', isOpen && 'z-20')}>
        {showButton && (
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
            <ArrowDown />
          </button>
        )}
        <ul
          className={clsx(
            'absolute py-2 bg-background shadow-elevation-2 w-full transition-[top,opacity] rounded-lg border-white border-2 z-20',
            isOpen
              ? 'top-[calc(100%+4px)] opacity-100'
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
              value={item.value}
              DropdownIsOpen={isOpen}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

Dropdown.defaultProps = defaultProps;

export default memo(Dropdown);
