import React from "react";
import "./SubmitButton.style.scss";

export interface SubmitButtonProps {
  className: string;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, label }) => {
  return <button type="submit" className={`${className} basic-btn`}>{label}</button>;
};

export default SubmitButton;
