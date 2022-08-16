/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEventHandler, forwardRef, memo } from 'react';
import clsx from 'clsx';
import { ChangeHandler } from 'react-hook-form';
import { InputErrorMessage } from 'renderer/atoms';

interface TextInputProps {
  type?: string;
  label?: string;
  name?: string;
  error?: string;
  autoFocus?: boolean;
  placeholder: string;
  textComplement?: string;
  maxLength?: number;
  defaultValue?: string | number | undefined;
  size?: 'xs' | 'sm' | 'md';
  min?: string | number | undefined;
  max?: string | number | undefined;
  onChange?: ChangeHandler | ChangeEventHandler;
  onBlur?: ChangeHandler | ChangeEventHandler;
}

const TextInput = forwardRef(
  (
    {
      name,
      label,
      placeholder,
      size,
      type,
      error,
      maxLength,
      max,
      min,
      textComplement,
      onChange,
      onBlur,
      autoFocus,
      defaultValue,
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-1 text-base">
        {label && <label htmlFor={name}>{label}</label>}

        <div className="flex items-center gap-2">
          <input
            name={name}
            type={type}
            id={name}
            ref={ref}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            {...(max && { max })}
            {...(min && { min })}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            className={clsx(
              'placeholder:text-muted border-white bg-transparent border-1 flex-1',
              size === 'sm' && 'p-2 rounded-[0.25rem] max-w-fit',
              size === 'md' && 'p-4 rounded-lg',
              size === 'xs' && 'px-2 py-[2px] rounded-sm'
            )}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          {textComplement && <span>{textComplement}</span>}
        </div>
        {error && <InputErrorMessage>{error}</InputErrorMessage>}
      </div>
    );
  }
);

TextInput.defaultProps = {
  label: '',
  name: '',
  size: 'md',
  type: 'text',
  error: '',
  textComplement: '',
  defaultValue: '',
  autoFocus: false,
  maxLength: undefined,
  max: undefined,
  min: undefined,
  onChange: undefined,
  onBlur: undefined,
};

export default memo(TextInput);
