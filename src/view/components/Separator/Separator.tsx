import React from "react";
import "./Separator.style.scss";


export interface SeparatorProps {
  label: string;
}

const Separator: React.FC<SeparatorProps> = ({ label }) => {
  return (
    <div className="separator-label">
      <div className="mini-label">{label}:</div>
      <div  className="divider"/>
    </div>
  );
};

export default Separator;
