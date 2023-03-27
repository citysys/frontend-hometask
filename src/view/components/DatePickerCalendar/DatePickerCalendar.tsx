import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../Input";
import "./DatePickerCalendar.style.scss";

const InputWrapper = styled("div")``;

const StyledInput = styled("input")`
  border-radius: 5.42px;
  padding: 0.5rem;
  font-size: 1rem;
  direction: rtl;
  text-align: right;
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
}

export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  label,
}) => {
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
        customInput={<CustomInput />}
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        disabledKeyboardNavigation
      />
    </>
  );
};

export default DatePickerCalendar;
