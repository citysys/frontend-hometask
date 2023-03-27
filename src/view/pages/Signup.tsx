import "./Signup.style.scss";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { NewUser } from "../../model";
import { useStore } from "../../controller";

const formInputs = [
  {
    name: 'name',
    category: 'personal',
    label: 'שם מלא',
    type: 'text',
    defaultValue: '',
    require: true
  },
  {
    name: 'id',
    category: 'personal',
    label: 'ת.ז',
    type: 'text',
    defaultValue: '',
    require: true
  },
  {
    name: 'birthDate',
    category: 'personal',
    label: 'תאריך לידה',
    type: 'date',
    defaultValue: '',
    require: true
  },
  {
    name: 'phone',
    category: 'contact',
    label: 'נייד',
    type: 'phone',
    defaultValue: '',
    require: true
  },
  {
    name: 'email',
    category: 'contact',
    label: 'מייל',
    type: 'email',
    defaultValue: '',
    require: true
  },
  {
    name: 'city',
    category: 'address',
    label: 'עיר',
    type: 'data_list',
    defaultValue: '',
    require: true
  },
  {
    name: 'street',
    category: 'address',
    label: 'רחוב',
    type: 'text',
    defaultValue: '',
    require: true
  },
  {
    name: 'houseNumber',
    category: 'address',
    label: 'מספר בית',
    type: 'text',
    defaultValue: '',
    require: true
  },
  {
    name: 'emailReceive',
    category: 'end',
    label: 'אני מסכים לקבל דיוור במייל',
    type: 'checkbox',
    defaultValue: true,
    require: false
  },
  {
    name: 'agree',
    category: 'end',
    label: 'אני מסכים לתנאי השירות',
    type: 'checkbox',
    defaultValue: false,
    require: false
  },
]

const INITIAL_USER: any = {}
for (const input of formInputs) {
  INITIAL_USER[input.name] = input.defaultValue
}

const setUser = useStore(state => state.setUser)

const Signup: React.FC = () => {

  const { register, control, handleSubmit, formState } = useForm({ defaultValues: INITIAL_USER })

  const { errors } = formState

  const inputsByCategory = (category: string): JSX.Element[] => (
    formInputs
      .filter(input => input.category === category)
      .map(input =>
        <div key={input.name}>
          <label>
            <span className="strict">
              {input.require ? '*' : ''}
            </span>
            {input.label}:
          </label>
          <Input
            className={input.category}
            type={input.type}
            register={() => register(input.name)}
          />
          <div className="error">
            <h6>{errors[input.name]?.message?.toString()}</h6>
          </div>
        </div>
      )
  )

  //TODO change the type of any
  const onSave = (formValues: any): void => {
    console.log({ formValues })
    setUser(formValues)
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

      <div className="end">
        {inputsByCategory('end')}
      </div>

      <div>
        <SubmitButton className="submit" />
      </div>

    </form>
  );
};

export default Signup;
