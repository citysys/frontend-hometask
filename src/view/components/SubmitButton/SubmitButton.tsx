import React, {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  HtmlHTMLAttributes,
} from 'react';
import './SubmitButton.style.scss';

export interface SubmitButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  className: string;
  value: string;
  containerClassName?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  className,
  value,
  containerClassName,
}) => {
  return (
    <div className={containerClassName}>
      <button type='submit' className={className}>
        {value}
      </button>
    </div>
  );
};

export default SubmitButton;
