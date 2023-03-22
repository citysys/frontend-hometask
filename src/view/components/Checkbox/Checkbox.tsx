import React from 'react';
import './Checkbox.style.scss';

export interface CheckboxProps {
  label: string;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked }) => {
  return (
    <div className='checkbox-container'>
      <input type='checkbox' checked={checked} readOnly={true} />
      <label className='checkbox-form-label'>{label}</label>
    </div>
  );
};

export default Checkbox;
