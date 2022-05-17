import { memo, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface SectionProps {
  children: ReactNode;
  title: string;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="my-4">
      <h2 className="flex text-2xl text-white mb-4">
        <span className="h-2 w-2 block mr-2 bg-white" />
        <span>{title}</span>
      </h2>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(Section);
