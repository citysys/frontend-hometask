import React, { useState } from 'react';
import './Input.style.scss';
import { RefCallBack } from 'react-hook-form';

export interface InputProps {
  className: string;
  type?: 'text' | 'phone-number' | 'number' | 'dateTime' | 'date';
  label: string;
  id?: string;
  error?: string;
  inputProps?: {
    onChange?: (ev: any) => unknown;
    onBlur?: (ev: any) => unknown;
    ref?: RefCallBack;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
  PlaceholderClassName?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  PlaceholderClassName,
  type,
  label,
  id,
  error,
  inputProps,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // onchange(event);
  };

  return (
    <div className='signup__form-section'>
      <p
        className={
          error ? PlaceholderClassName + ' error-message' : PlaceholderClassName
        }
      >
        {error ? '*' : null}
        {label}
      </p>
      <input
        {...inputProps}
        type={type}
        className={error ? className + ' error-message' : className}
        id={id}
      ></input>
      {error ? <span className='error-message'>*{error}</span> : null}
    </div>
  );
};

export default Input;
