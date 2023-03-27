import "./Signup.style.scss";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useState } from "react";

const user = z.object({
  name: z.string().regex(/[א-ת]+(\ [א-ת]+)+/, { message: 'שם מלא הכולל שם פרטי ושם משפחה המכיל אותיות ורווחים בלבד' }),
  id: z.string().regex(/^[0-9]{9}$/, { message: 'מספר תעודת זהות יכול להכיל 9 ספרות בלבד' }),
  birthDate: z.date(),
  phone: z.string().regex(/^0\d{9}$/, { message: 'מספר טלפון נייד חייב להכיל 9 ספרות ולהתחיל בקידומת 0' }),
  email: z.string().email({ message: 'כתובת דואר אלקטרוני אינה תקינה' }),
  city: z.string().regex(/[א-ת]+/, { message: 'עיר אינה נמצאת ברשימת הערים' }),
  street: z.string().regex(/[א-ת]+/, { message: 'עיר אינה נמצאת ברשימת הערים' }),
  houseNumber: z.string(),
  mailReceive: z.boolean().optional(),
  agree: z.boolean(),
});

const formInputs = [
  {
    name: 'name',
    category: 'personal',
    label: 'שם מלא',
    type: 'text',
    value: '',
    require: true
  },
  {
    name: 'id',
    category: 'personal',
    label: 'ת.ז',
    type: 'text',
    value: '',
    require: true
  },
  {
    name: 'birthDate',
    category: 'personal',
    label: 'תאריך לידה',
    type: 'date',
    value: '',
    require: true
  },
  {
    name: 'phone',
    category: 'contact',
    label: 'נייד',
    type: 'phone',
    value: '',
    require: true
  },
  {
    name: 'email',
    category: 'contact',
    label: 'מייל',
    type: 'email',
    value: '',
    require: true
  },
  {
    name: 'city',
    category: 'address',
    label: 'עיר',
    type: 'text',
    value: '',
    require: true
  },
  {
    name: 'street',
    category: 'address',
    label: 'רחוב',
    type: 'text',
    value: '',
    require: true
  },
  {
    name: 'houseNumber',
    category: 'address',
    label: 'מספר בית',
    type: 'text',
    value: '',
    require: true
  },
  {
    name: 'mailReceive',
    category: 'end',
    label: 'אני מסכים לקבל דיוור במייל',
    type: 'checkbox',
    value: true,
    require: false
  },
  {
    name: 'agree',
    category: 'end',
    label: 'אני מסכים לתנאי השירות',
    type: 'checkbox',
    value: false,
    require: false
  },
]

const INITIAL_USER = {
  name: '',
  id: '',
  birthDate: '',
  phone: '',
  email: '',
  city: '',
  street: '',
  houseNumber: '',
  emailReceive: true,
  agree: false
}

const Signup: React.FC = () => {

  const [userData, setUserDate] = useState(INITIAL_USER)

  const { register, control, handleSubmit } = useForm()
  console.log({ register });

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
            register = {()=> register(input.name)}
          />
        </div>
      )
  )

  const onSave = (/*values: typeof user*/): void => {
    console.log({ data: userData });
  }

  return (
    <form
      className="signup container"
      onSubmit={handleSubmit(onSave)}
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

      <div>
        <SubmitButton className="submit" />
      </div>

    </form>
  );
};

export default Signup;
