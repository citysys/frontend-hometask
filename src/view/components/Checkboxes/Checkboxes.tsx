import React from 'react';
import './Checkboxes.style.scss';
import Checkbox from '../Checkbox/Checkbox';

const Checkboxex: React.FC = () => {
  return (
    <div className='checkboxes-wrapper'>
      <Checkbox label='אני מסכים לקבל דיוור במייל ובמסרון' checked={true} />
      <Checkbox label='אני מסכים לתנאי השירות' checked={true} />
    </div>
  );
};

export default Checkboxex;
