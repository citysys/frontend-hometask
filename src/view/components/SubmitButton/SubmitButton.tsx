import React from "react";
import "./SubmitButton.style.scss";

export interface SubmitButtonProps {
  className: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className }) => {
  return (
  <button type="submit" className={className}>שלח</button>
  );
};

export default SubmitButton;
