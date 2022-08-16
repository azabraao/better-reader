/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEventHandler, forwardRef, memo } from 'react';
import clsx from 'clsx';
import { ChangeHandler } from 'react-hook-form';
import { InputErrorMessage } from 'renderer/atoms';
import TextareaAutosize from 'react-textarea-autosize';

interface TextAreaProps {
  label?: string;
  name?: string;
  error?: string;
  autoFocus?: boolean;
  placeholder: string;
  defaultValue?: string | number | undefined;
  size?: 'xs' | 'sm' | 'md';
  onChange?: ChangeHandler | ChangeEventHandler;
  onBlur?: ChangeHandler | ChangeEventHandler;
}

const TextArea = forwardRef(
  (
    {
      name,
      label,
      placeholder,
      size,
      error,
      onChange,
      onBlur,
      autoFocus,
      defaultValue,
    }: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div className="flex flex-col gap-1 text-base">
        {label && <label htmlFor="input">{label}</label>}

        <TextareaAutosize
          name={name}
          id="input"
          ref={ref}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
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
        />
        {error && <InputErrorMessage>{error}</InputErrorMessage>}
      </div>
    );
  }
);

TextArea.defaultProps = {
  label: '',
  name: '',
  size: 'md',
  error: '',
  defaultValue: '',
  autoFocus: false,
  onChange: undefined,
  onBlur: undefined,
};

export default memo(TextArea);
