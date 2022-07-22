import clsx from 'clsx';
import { memo } from 'react';
import Icon, { Plus, Speed } from 'renderer/atoms/Icon';
import { useLayoutSwitch } from 'renderer/contexts';
import { Section } from 'renderer/molecules';

const sessions = [
  {
    id: 'a',
    name: 'Varredura & ponta-ponta',
    techniques: ['swiping', 'end-to-end'],
    target: 500,
  },
  {
    id: 'b',
    name: 'Somente Varredura',
    techniques: ['swiping', 'end-to-end'],
    target: 500,
  },
  {
    id: 'c',
    name: 'Varredura & ponta-ponta',
    techniques: ['swiping', 'end-to-end'],
    target: 500,
  },
  {
    id: 'd',
    name: 'Somente Varredura',
    techniques: ['swiping', 'end-to-end'],
    target: 500,
  },
  {
    id: 'e',
    name: 'Varredura & ponta-ponta',
    techniques: ['swiping', 'end-to-end'],
    target: 500,
  },

  {
    id: 'f',
    name: 'Somente Varredura',
    techniques: ['swiping', 'end-to-end'],
    target: 500,
  },
];

const TrainingSessions = () => {
  const { isRankingFocused } = useLayoutSwitch();
  return (
    <Section title="Training Sessions" actions={<Plus />}>
      <div
        className={clsx(
          'flex flex-wrap gap-4 no-scrollbar overflow-y-auto md:grid md:grid-cols-3',
          isRankingFocused ? 'lg:grid-cols-2' : 'lg:grid-cols-4'
        )}
      >
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 border-white border-1 rounded-lg w-full xs:max-w-[calc(50vw-27px)]"
          >
            <div className="flex flex-col gap-2 text-white p-2">
              <span className="font-medium whitespace-nowrap">
                {session.name}
              </span>
              <div className="flex gap-2 items-center">
                {session.techniques.map((technique) => (
                  <Icon key={session.id + Math.random()} name={technique} />
                ))}
                <div className="ml-1 flex gap-2 items-center">
                  <Speed />
                  {session.target}ppm
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default memo(TrainingSessions);
