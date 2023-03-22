import React from 'react';
import './SubmitButton.style.scss';

export interface SubmitButtonProps {
  className: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className }) => {
  return <input type='submit' value='שלח' className={className}></input>;
};

export default SubmitButton;
