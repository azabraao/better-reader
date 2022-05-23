/* eslint-disable react/no-array-index-key */
import { memo, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ArrowIcon from 'renderer/assets/icons/arrow-down-white.svg';
import { usePortal } from 'renderer/contexts';

type ListItemProps = React.PropsWithChildren<{
  onSelect: (item: ItemType) => void;
  label: string;
  selected: boolean;
  icon: React.ReactNode;
}>;

type ItemType = {
  label: string;
  icon?: React.ReactNode;
};

type DropdownProps = React.PropsWithChildren<{
  items: ItemType[];
  defaultOpen?: boolean;
  onSelected: (item: string) => void;
}>;

const ListItem = ({ onSelect, selected, icon, label }: ListItemProps) => (
  <li
    onClick={() => {
      onSelect({ icon, label });
    }}
    onKeyDown={(event) => {
      if (event.keyCode === 32) {
        onSelect({ icon, label });
      }
    }}
    className={clsx(
      'px-4 py-2 text-white  hover:bg-muted',
      selected && 'bg-muted font-bold'
    )}
    role="menuitem"
    tabIndex={0}
  >
    <div className="flex items-center">
      <span>{icon}</span>
      <span className="ml-2">{label}</span>
    </div>
  </li>
);

const Dropdown = ({ items, defaultOpen, onSelected }: DropdownProps) => {
  const [selected, setSelected] = useState(items[0]);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { openPortal, closePortal, setOnPortalClick } = usePortal();

  useEffect(() => {
    setOnPortalClick(closePortal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen ? openPortal() : closePortal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
    <div className="relative w-full z-10">
      <button
        onClick={toggleDropdown}
        className="flex justify-between p-2 w-full rounded-lg border-white border-2 bg-background text-white cursor-pointer"
        type="button"
        tabIndex={0}
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
