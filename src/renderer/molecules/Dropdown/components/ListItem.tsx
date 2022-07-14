import clsx from 'clsx';
import { memo } from 'react';

type Item = {
  label: string;
  icon?: React.ReactNode;
};

type ListItemProps = React.PropsWithChildren<{
  onSelect: (item: Item) => void;
  label: string;
  selected: boolean;
  icon: React.ReactNode;
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
      'px-4 py-2 text-white hover:bg-muted hover:text-black',
      selected && 'bg-muted font-bold text-black'
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

export default memo(ListItem);
