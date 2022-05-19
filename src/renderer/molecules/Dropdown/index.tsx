/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ArrowIcon from 'renderer/assets/icons/arrow-down-white.svg';
import SweepingIcon from 'renderer/assets/icons/sweeping.svg';

type ListItemProps = React.PropsWithChildren<{
  onSelect: (item: string) => void;
  children: string;
  selected: boolean;
}>;

type DropdownProps = React.PropsWithChildren<{
  items: string[];
  defaultOpen?: boolean;
}>;

const ListItem = ({ onSelect, selected, children }: ListItemProps) => (
  <li
    onClick={() => onSelect(children)}
    onKeyDown={(event) => {
      if (event.keyCode === 32) {
        onSelect(children);
      }
    }}
    className={clsx(
      'px-4 py-2 text-white hover:text-black hover:bg-muted',
      selected && 'bg-muted text-black'
    )}
    role="menuitem"
    tabIndex={0}
  >
    {children}
  </li>
);

const Dropdown = ({ items, defaultOpen }: DropdownProps) => {
  const [selected, setSelected] = useState(items[0]);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const onSelect = useCallback((item: string) => {
    setSelected(item);
    setIsOpen(false);
  }, []);

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="flex justify-between p-2 w-full rounded-lg border-white border-2 bg-background text-white cursor-pointer"
        type="button"
        tabIndex={0}
      >
        <div className="flex items-center">
          <SweepingIcon />
          <span className="ml-2">{selected}</span>
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
        aria-hidden={!isOpen}
      >
        {items.map((item, index) => (
          <ListItem
            selected={item === selected}
            key={index}
            onSelect={onSelect}
          >
            {item}
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultOpen: PropTypes.bool,
};

Dropdown.defaultProps = {
  defaultOpen: false,
};

export default memo(Dropdown);
