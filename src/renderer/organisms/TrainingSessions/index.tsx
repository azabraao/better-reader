import { memo, ReactNode } from 'react';
import EndToEnd from 'renderer/assets/icons/white/end-to-end';
import Plus from 'renderer/assets/icons/white/plus';
import Speed from 'renderer/assets/icons/white/speed';
import Swiping from 'renderer/assets/icons/white/swiping';
import { Section } from 'renderer/atoms';

const sessions = [
  {
    name: 'Varredura & ponta-ponta',
    techniques: [<Swiping />, <EndToEnd />],
    target: 500,
  },
  {
    name: 'Somente Varredura',
    techniques: [<Swiping />, <EndToEnd />],
    target: 500,
  },
  {
    name: 'Varredura & ponta-ponta',
    techniques: [<Swiping />, <EndToEnd />],
    target: 500,
  },
  {
    name: 'Somente Varredura',
    techniques: [<Swiping />, <EndToEnd />],
    target: 500,
  },
  {
    name: 'Varredura & ponta-ponta',
    techniques: [<Swiping />, <EndToEnd />],
    target: 500,
  },
  {
    name: 'Somente Varredura',
    techniques: [<Swiping />, <EndToEnd />],
    target: 500,
  },
];

const TrainingSessions: React.FC<ReactNode> = () => {
  return (
    <Section title="Training Sessions" actions={<Plus />}>
      <div className="flex flex-wrap gap-4 no-scrollbar overflow-y-auto md:grid md:grid-cols-3 lg:grid-cols-4">
        {sessions.map((session) => (
          <div className="flex items-center gap-4 border-white border-1 rounded-lg w-full xs:max-w-[calc(50vw-27px)]">
            <div className="flex flex-col gap-2 text-white p-2">
              <span className="font-medium whitespace-nowrap">
                {session.name}
              </span>
              <div className="flex gap-2 items-center">
                {session.techniques.map((technique) => technique)}
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
