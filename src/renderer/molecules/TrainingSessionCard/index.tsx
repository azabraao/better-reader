import { memo } from 'react';
import Icon, { Speed } from 'renderer/atoms/Icon';

interface TrainingSessionCardProps {
  session: TrainingSession;
}

const TrainingSessionCard = ({ session }: TrainingSessionCardProps) => {
  return (
    <div className="flex items-center gap-4 border-white border-1 rounded-lg w-full xs:max-w-[calc(50vw-27px)]">
      <div className="flex flex-col gap-2 text-white p-2">
        <span className="font-medium whitespace-nowrap">{session.name}</span>
        <div className="flex gap-2 items-center">
          {session.summary.techniques.map((technique) => (
            <Icon key={session.id + Math.random()} name={technique} />
          ))}
          <div className="ml-1 flex gap-2 items-center">
            <Speed />
            {session.summary.target}ppm
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TrainingSessionCard);
