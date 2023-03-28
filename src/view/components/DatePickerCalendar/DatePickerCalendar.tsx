import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../Input";
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
}

interface MyFormValues {
  name: string;
  [key: string]: any; // add index signature
}

export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  label,
  name ="birthDate",
}) => {
  //--formik
  const { values, setFieldValue } = useFormikContext<MyFormValues>();
  //--formik

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomInput = ({ onFocus, value }: any) => (
    <InputWrapper>
      <StyledInput onClick={onFocus} value={value} onChange={() => {}} />
    </InputWrapper>
  );
  return (
    <>
      <label className="d-label">{label}</label>
      <DatePicker
        dateFormat="MM/dd/yyyy"
        popperContainer={Popper}
        customInput={<CustomInput value={values[name]}/>}
        selected={values[name]}
        // onChange={(date: Date) => setSelectedDate(date)}}
        onChange={(date: Date) => setFieldValue(name, date)} // formik
        disabledKeyboardNavigation
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}

      />
    </>
  );
};

export default DatePickerCalendar;
