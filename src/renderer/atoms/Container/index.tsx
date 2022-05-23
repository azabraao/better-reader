import { memo } from 'react';
import PropTypes from 'prop-types';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="px-4 max-w-screen-lg  w-full mx-auto">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Container);
