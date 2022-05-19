import { memo, ReactNode } from 'react';
import { Section } from 'renderer/atoms';

const Practices: React.FC<ReactNode> = () => {
  return (
    <Section title="Practices">
      <span />
    </Section>
  );
};

export default memo(Practices);
