import React from 'react';
import './SubHeader.style.scss';

export interface SubHeaderProps {
  value: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ value }) => {
  return (
    <div className='sub-header-wrapper'>
      <div className='sub-header-value'>{value}</div>
      <hr />
    </div>
  );
};

export default SubHeader;
