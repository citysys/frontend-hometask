import "./Signup.style.scss";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";

const user = z.object({
  name: z.string().regex(/[א-ת]+(\ [א-ת]+)+/, { message: 'שם מלא הכולל שם פרטי ושם משפחה המכיל אותיות ורווחים בלבד' }),
  id: z.string().regex(/^[0-9]{9}$/, { message: 'מספר תעודת זהות יכול להכיל 9 ספרות בלבד' }),
  birthDate: z.date(),
  phone: z.string().regex(/^0\d{9}$/, { message: 'מספר טלפון נייד חייב להכיל 9 ספרות ולהתחיל בקידומת 0' }),
  email: z.string().email({ message: 'כתובת דואר אלקטרוני אינה תקינה' }),
});

// const { register, control, handleSubmit } = useForm()

const formInputs = [
  {
    category: 'personal',
    label: 'שם מלא',
    type: 'text',
    value: '',
    require: true
  },
  {
    category: 'personal',
    label: 'ת.ז',
    type: 'text',
    value: '',
    require: true
  },
  {
    category: 'personal',
    label: 'תאריך לידה',
    type: 'date',
    value: '',
    require: true
  },
  {
    category: 'contact',
    label: 'נייד',
    type: 'phone',
    value: '',
    require: true
  },
  {
    category: 'contact',
    label: 'מייל',
    type: 'email',
    value: '',
    require: true
  },
  {
    category: 'address',
    label: 'עיר',
    type: 'text',
    value: '',
    require: true
  },
  {
    category: 'address',
    label: 'רחוב',
    type: 'text',
    value: '',
    require: true
  },
  {
    category: 'address',
    label: 'מספר בית',
    type: 'text',
    value: '',
    require: true
  },
  {
    category: 'end',
    label: 'אני מסכים לקבל דיוור במייל',
    type: 'checkbox',
    value: true,
    require: false
  },
  {
    category: 'end',
    label: 'אני מסכים לתנאי השירות',
    type: 'checkbox',
    value: false,
    require: false
  },
]

const Signup: React.FC = () => {

  const inputsByCategory = (category: string): JSX.Element[] => (
    formInputs
      .filter(input => input.category === category)
      .map(input =>
        <div>
          <label key={input.label}>
            <span className="strict">
              {input.require ? '*' : ''}
            </span>
            {input.label}:
          </label>
          <Input
            className={input.category}
            type={input.type}
          // {...register(`${input.label}`)}
          />
        </div>
      )
  )

  const onSave = (/*values: typeof user*/): void => {
    console.log(formInputs);
  }

  return (
    <form
      className="signup container"
      // onSubmit={handleSubmit(onSave)}
    >
      <h5>פרטים אישיים</h5>
      <div className="section">
        {inputsByCategory('personal')}
      </div>

      <h5>פרטי התקשרות</h5>
      <div className="section">
        {inputsByCategory('contact')}
      </div>

      <h5>כתובת</h5>
      <div className="section">
        {inputsByCategory('address')}
      </div>

      <div className="section end">
        {inputsByCategory('end')}
      </div>
      <SubmitButton className="submit" />
    </form>
  );
};

export default Signup;
