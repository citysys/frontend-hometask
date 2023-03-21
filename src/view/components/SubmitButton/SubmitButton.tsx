import React from "react";
import "./SubmitButton.style.scss";

export interface SubmitButtonProps {
  className: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = () => {
  return <button type="submit" className="btn">שליחה</button>;
};

export default SubmitButton;
