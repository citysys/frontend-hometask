import { RefCallBack } from "react-hook-form";

interface TextFieldProps {
  id: string;
  label: string;
  error?: string;
  inputProps?: {
    onChange?: (ev:any) => unknown;
    onBlur?: (ev:any) => unknown;
    ref?: RefCallBack;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
  type?:  'string' | 'phone-number' | 'number' | 'date';
  placeholder?:string;
}

export const Input = (props: TextFieldProps) => {
  return (
    <div>
      <div className="form-input">
        <input
          type={props.type ?? 'text'}
          placeholder={props.placeholder ?? 'text'}
          id={props.id}
          {...(props.inputProps ?? {})}
        />
        <label htmlFor={props.id}>
          <span>{props.label}</span>
        </label>
        {props.error ? <span className="error-message">{props.error}</span> : null}
      </div>
    </div>
  );
};
