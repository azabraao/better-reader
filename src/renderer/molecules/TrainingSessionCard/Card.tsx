import { memo } from 'react';
import Icon from 'renderer/atoms/Icon';
import { ifSpaceBar } from 'renderer/utils';
import OptionsDropdown from './OptionsDropdown';

interface CardProps {
  session: TrainingSession;
  onClick: () => void;
}

const Card = ({ session, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => ifSpaceBar(e, onClick)}
      role="button"
      tabIndex={0}
      className="flex items-center gap-4 border-white border-1 rounded-lg w-full xs:max-w-[calc(50vw-27px)] cursor-pointer relative bg-black [&>[data-role=action]]:hover:opacity-100 [&>[data-role=action]]:hover:pointer-events-auto "
    >
      <div className="flex flex-col gap-2 text-white p-2">
        <span className="font-medium whitespace-nowrap">{session.name}</span>
        <div className="flex gap-2 items-center">
          {session.summary.techniques.map((technique) => (
            <Icon key={session._id + Math.random()} name={technique} />
          ))}
          <div className="ml-1 flex gap-2 items-center">
            <Icon name="speed" />
            {session.summary.target}ppm
          </div>
        </div>
      </div>
      <OptionsDropdown />
    </div>
  );
};

export default memo(Card);
