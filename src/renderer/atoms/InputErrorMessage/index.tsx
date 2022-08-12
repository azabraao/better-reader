import { memo } from 'react';

interface InputErrorMessageProps {
  children: React.ReactNode;
}

const InputErrorMessage = ({ children }: InputErrorMessageProps) => {
  return <div className="text-danger-600">{children}</div>;
};

export default memo(InputErrorMessage);
