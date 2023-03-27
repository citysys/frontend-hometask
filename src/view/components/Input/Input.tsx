import React from "react";
import DataList from "./DataList";
import "./Input.style.scss";

export interface InputProps {
  className: string;
  type: string;
  register: ()=> any
}

const Input: React.FC<InputProps> = ({ className, type, register }) => {
  return (
    <div className={className}>
      <input type={type} {...register()}/>
      {
      type==='data_list' &&
      (
      <DataList />
      )
      }
    </div>
  );
};

export default Input;
