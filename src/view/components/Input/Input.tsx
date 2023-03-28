import React from "react";
import DataList from "./DataList";
import "./Input.style.scss";

export interface InputProps {
  className: string;
  type: string;
  register: () => any
}

const Input: React.FC<InputProps> = ({ className, type, register }) => {
  const list = type === 'data_list' ? { list: className } : {}
  return (
    <div className={className}>
      <input type={type} {...list} {...register()} />
      {
        type === 'data_list' &&
        (
          <DataList />
        )
      }
    </div>
  );
};

export default Input;
