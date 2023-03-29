import React from "react";
import DataList from "./DataList";
import "./Input.style.scss";

export interface InputProps {
  name: string;
  label: string
  type: string;
  isRequire: boolean
  description?: string
  register: () => any
  options?: string[]
  errors: any
}

const Input: React.FC<InputProps> = ({ name, label, type, isRequire, register, errors, options = [], description = '' }) => {
  let list = {}
  if (type === 'data_list' || type === 'select') {
    list = {
      list: name,
    }
  }
  return (
    <div className={name}>
      <div>
        <label>
          <span className="strict">
            {isRequire ? '*' : ''}
          </span>
          {label}{label? ":" : ""}
        </label>
      </div>

      <div className="input">
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
      {description}
      </div>

      <div className="error">
        <h5>{errors[name]?.message?.toString()}</h5>
      </div>
    </div>
  );
};

export default Input;
