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

  const handleExternalInputChange = (event: any) => {
    // Get Formik context
    const formik = event.currentTarget.formik;

    // Get current values of form
    const values = formik.values;

    // Handle input change here
    console.log("Current values:", values);
  };

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

        // onChange={onChange} this causes problem to my searchbox
      />

      {/* <input
        type={type}
        className="input"
        onChange={onChange}
        id={name}
        name={name}
      /> */}

      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Input;
