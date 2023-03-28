import React from "react";
import DataList from "./DataList";
import "./Input.style.scss";

interface Ifield {
  value: string,
  onChange: (field: any) => void
}

export interface InputProps {
  name: string;
  label: string
  type: string;
  isRequire: boolean
  register: () => any
  options?: string[]
  errors: any
  field?: Ifield
}

const Input: React.FC<InputProps> = ({ name, label, type, isRequire, register, errors, options = [], field }) => {
  let list = {}
  if (type === 'data_list' || type === 'select') {
    list = {
      list: name,
      // value: options?.find(({value})=> value=== className),
      value: field?.value,
      onChange: (field: Ifield) => field?.onChange(field?.value)
    }
  }
  return (
    <div className={name}>
      <div>
        <label>
          <span className="strict">
            {isRequire ? '*' : ''}
          </span>
          {label}:
        </label>
      </div>
      <input type={type} {...list} {...register()} />
      {
        type === 'data_list' &&
        (
          <DataList
            id={name}
            options={options}
          />
        )
      }
      <div className="error">
        <h5>{errors[name]?.message?.toString()}</h5>
      </div>
    </div>
  );
};

export default Input;
