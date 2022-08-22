/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import { memo, MouseEventHandler } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  theme?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'transparent';
  disabled?: boolean;
}

const Button = ({
  size,
  theme,
  type,
  children,
  onClick,
  fullWidth,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        size === 'sm' && 'py-2 px-6 text-sm',
        size === 'md' && 'py-4 px-8 text-base',
        theme === 'primary' && 'bg-primary text-black',
        theme === 'info' && 'bg-info text-black hover:bg-info-700 ',
        theme === 'success' && 'bg-success text-black hover:bg-success-700',
        theme === 'warning' && 'bg-warning text-black hover:bg-warning-700',
        theme === 'danger' && 'bg-danger text-black hover:bg-danger-700',
        fullWidth && 'w-full',
        disabled && 'cursor-not-allowed opacity-90',
        'rounded-[4px] transition-colors'
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  size: 'md',
  fullWidth: false,
  onClick: () => {},
  theme: 'info',
  disabled: false,
};

export default memo(Button);
