import clsx from 'clsx';
import { memo } from 'react';

type ListItemProps = React.PropsWithChildren<{
  onSelect: (item: DropdownItem) => void;
  label: string;
  selected: boolean;
  icon: React.ReactNode;
  value: string;
  DropdownIsOpen: boolean;
}>;

const ListItem = ({
  onSelect,
  selected,
  icon,
  label,
  value,
  DropdownIsOpen,
}: ListItemProps) => (
  <li
    onClick={() => {
      onSelect({ icon, label, value });
    }}
    onKeyDown={(event) => {
      if (event.key === ' ') {
        onSelect({ icon, label, value });
      }
    }}
    className={clsx(
      'px-4 py-2 text-white hover:bg-muted hover:text-black',
      selected && 'bg-muted font-bold text-black'
    )}
    role="menuitem"
    tabIndex={DropdownIsOpen ? 0 : -1}
  >
    <div className="flex items-center">
      <span>{icon}</span>
      <span className="ml-2">{label}</span>
    </div>
  </li>
);

export default memo(ListItem);
