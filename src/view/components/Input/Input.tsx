import React from "react";
import "./Input.style.scss";
import { Field, ErrorMessage } from "formik";

export interface InputProps {
  className?: string;
  type?: string;
  label?: string;
  name: string;
  required?: boolean;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  type,
  label,
  name,
  required,
}) => {
  return (
    <div className={className + " " + "input-wrapper"}>
      <label className="input-label">
        {label}
        {required && <div className="required">*</div>}
      </label>

      <Field
        as={type}
        id={name}
        name={name}
        className="input"
      />
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Input;
