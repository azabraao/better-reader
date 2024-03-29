import clsx from 'clsx';
import { memo } from 'react';

interface SectionProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  title: string;
  justifyBetween?: boolean;
}

const Section = ({
  justifyBetween,
  title,
  actions,
  children,
}: SectionProps) => {
  return (
    <div className="my-4">
      <div
        className={clsx(
          'flex gap-6 mb-4 items-center lg:[&>[data-role=action]]:hover:opacity-100 ',
          justifyBetween && 'justify-between'
        )}
      >
        <h2 className="flex items-center text-2xl text-white">
          <span className="h-2 w-2 block mr-2 bg-white" />
          <span>{title}</span>
        </h2>

        <div
          data-role="action"
          className="lg:transition-opacity lg:opacity-0 text-white"
        >
          {actions}
        </div>
      </div>
      {children}
    </div>
  );
};

Section.defaultProps = {
  actions: null,
  justifyBetween: false,
};

export default memo(Section);
