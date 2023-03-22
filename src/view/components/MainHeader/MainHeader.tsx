import React from 'react';
import './MainHeader.style.scss';

export interface MainHeaderProps {
  value: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ value }) => {
  return (
    <div className='main-header'>
      <div className='main-header-value'>{value}</div>
      <div className='mandatory-field-header'>
        *שדות המסומנים בכוכבית הם שדות חובה
      </div>
    </div>
  );
};

export default MainHeader;
