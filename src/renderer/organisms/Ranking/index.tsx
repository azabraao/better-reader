import { memo, ReactNode } from 'react';
import { Section } from 'renderer/atoms';

const Ranking: React.FC<ReactNode> = () => {
  return (
    <div className="">
      <Section title="Performance Ranking">
        <div className="mt-2">
          <div className="mb-2">Technique</div>
        </div>
      </Section>
    </div>
  );
};

export default memo(Ranking);
