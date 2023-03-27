import { ChangeEvent } from "react";
import React, { useState } from "react";

export interface CheckboxProps {
  className?: string;
  label: string;
  onChange?: (updateEvent: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, checked }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <div id={`checkbox-toggle${label}`} style={{ marginBottom: "15px" }}>
      <label className="checkbox-label">
        {label}
        <input type="checkbox"/>
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default Checkbox;