import { memo, ReactNode } from 'react';
import { Section } from 'renderer/atoms';

const Evolution: React.FC<ReactNode> = () => {
  return (
    <Section title="Evolution Over Time">
      <span />
    </Section>
  );
};

export default memo(Evolution);
