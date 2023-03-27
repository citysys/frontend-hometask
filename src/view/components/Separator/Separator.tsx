import React from "react";
import "./Separator.style.scss";


export interface SeparatorProps {
  label: string;
}

const Separator: React.FC<SeparatorProps> = ({ label }) => {
  return (
    <div className="separator-label">
      <div className="mini-label">:{label}</div>
      <img src='./src/assests/line.png' className="line-img"/>
    </div>
  );
};

export default Separator;
