import React from "react";
import "./Input.style.scss";

export interface InputProps {
  className?: string;
  type?: string;
  label?: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  type,
  label,
  name,
  required,
  onChange,
}) => {

  return (
    <div className={className + " " + "input-wrapper"}>
      <label className="input-label">
        {label}
        {required && <div className="required">*</div>}
      </label>
      <input
        type={type}
        className="input"
        onChange={onChange}
        id={name}
      />
    </div>
  );
};

export default Input;
