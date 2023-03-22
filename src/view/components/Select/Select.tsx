import React from 'react';
import './Select.style.scss';
import { FormData } from '../../../model';
import { UseFormRegister } from 'react-hook-form';

export interface Select {
  className: string;
  label: string;
  mandatory: boolean;
  options: string[];
  registeredValue: string | any;
  register: UseFormRegister<FormData>;
  error: string | undefined;
  onChange: any;
}

const Select: React.FC<Select> = ({
  className,
  label,
  mandatory,
  options,
  registeredValue,
  register,
  error,
  onChange,
}) => {
  return (
    <div className={className}>
      <label className='form-label'>
        {mandatory && <span>*</span>}
        {label}
      </label>
      <select
        {...register(registeredValue)}
        className={error ? 'error-input' : ''}
        onChange={onChange}
      >
        {options &&
          options.map((val, i) => {
            return <option key={i}>{val}</option>;
          })}
      </select>

      {error && <span className='error-msg'>{error}</span>}
    </div>
  );
};

export default Select;
