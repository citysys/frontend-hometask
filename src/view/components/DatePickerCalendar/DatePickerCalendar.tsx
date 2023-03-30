import { styled } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerCalendar.style.scss";
import { ErrorMessage, useFormikContext } from "formik";

const InputWrapper = styled("div")``;

const StyledInput = styled("input")`
  border-radius: 5.42px;
  padding: 0.5rem;
  font-size: 1rem;
  direction: center;
  text-align: center;
  border-color: var(--color-light-gray);
  border-width: 1.08px;
  margin-left: 40px;
`;

const Popper = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
`;

export interface DatePickerCalendarProps {
  selectedDate?: Date | null;
  setSelectedDate?: any;
  label?: string;
  name?: string;
  required?: boolean;
}

interface MyFormValues {
  name: string;
  [key: string]: any;
}

export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  label,
  name = "birthDate",
  required
}) => {
  const { values, setFieldValue } = useFormikContext<MyFormValues>();

  const CustomInput = ({ onFocus, value }: any) => (
    <InputWrapper>
      <StyledInput onClick={onFocus} value={value} onChange={() => {}} />
    </InputWrapper>
  );
  return (
    <>
      <label className="d-label">{label}  {required && <div className="required">*</div>}</label>
      <DatePicker
        dateFormat="MM/dd/yyyy"
        popperContainer={Popper}
        customInput={<CustomInput value={values[name]} />}
        selected={values[name]}
        onChange={(date: Date) => setFieldValue(name, date)}
        disabledKeyboardNavigation
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
      />
      <div className="d-error">
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default DatePickerCalendar;
