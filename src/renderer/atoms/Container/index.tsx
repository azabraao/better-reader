import { memo } from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="px-4 max-w-screen-lg  w-full mx-auto">{children}</div>;
};

export default memo(Container);
