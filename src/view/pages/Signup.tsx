import "./Signup.style.scss";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { NewUserSchema } from "../../model";
import { useStore } from "../../controller";
import { Fragment } from "react";

const formInputs = [
  {
    category: 'personal',
    label: 'פרטים אישיים',
    fields: [
      {
        name: 'name',
        label: 'שם מלא',
        type: 'text',
        defaultValue: '',
        require: true
      },
      {
        name: 'id',
        label: 'ת.ז',
        type: 'text',
        defaultValue: '',
        require: true
      },
      {
        name: 'birthDate',
        label: 'תאריך לידה',
        type: 'date',
        defaultValue: '',
        require: true
      },
    ],

  }, {
    category: 'contact',
    label: 'פרטי התקשרות',
    fields: [
      {
        name: 'phone',
        label: 'נייד',
        type: 'text',
        defaultValue: '',
        require: true
      },
      {
        name: 'email',
        label: 'מייל',
        type: 'text',
        defaultValue: '',
        require: true
      },
    ]
  },
  {
    category: 'address',
    label: 'כתובת',
    fields: [
      {
        name: 'city',
        label: 'עיר',
        type: 'data_list',
        defaultValue: '',
        require: true
      },
      {
        name: 'street',
        label: 'רחוב',
        type: 'data_list',
        defaultValue: '',
        require: true
      },
      {
        name: 'houseNumber',
        label: 'מספר בית',
        type: 'text',
        defaultValue: '',
        require: true
      },
    ],
  },
  {
    category: 'rest',
    label: '',
    fields: [
      {
        name: 'emailReceive',
        label: 'אני מסכים לקבל דיוור במייל',
        type: 'checkbox',
        defaultValue: true,
        require: false
      },
      {
        name: 'agree',
        label: 'אני מסכים לתנאי השירות',
        type: 'checkbox',
        defaultValue: false,
        require: false
      },
    ]
  },

]

//create an object of the fields with default value
const INITIAL_USER = formInputs.reduce((totalAcc: any, sectionValue: any) => {
  return {
    ...totalAcc, ...sectionValue.fields.reduce((sectionAcc: any, fieldValue: any) => {
      return {
        ...sectionAcc, [fieldValue.name]: fieldValue.defaultValue
      }
    }, {})
  }
}, {})

const Signup: React.FC = () => {
  const setUser = useStore(state => state.setUser)

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: INITIAL_USER,
    resolver: zodResolver(NewUserSchema)
  })

  const { errors } = formState

  const onSave = (formValues: any): void => {
    console.log({ formValues })
    setUser(formValues)
  }

  return (
    <form
      className="signup container"
      onSubmit={handleSubmit(onSave)}
    >
      {
        formInputs.map(section =>
        (
          <Fragment key={section.category}>
            <h5>{section.label}</h5>
            <div className="section">
              {
                section.fields.map(input =>
                  <div key={input.name}>
                    <label>
                      <span className="strict">
                        {input.require ? '*' : ''}
                      </span>
                      {input.label}:
                    </label>
                    <Input
                      className={input.name}
                      type={input.type}
                      register={() => register(input.name)}
                    />
                    <div className="error">
                      <h5>{errors[input.name]?.message?.toString()}</h5>
                    </div>
                  </div>
                )
              }
            </div>
          </Fragment>
        ))}

      <div>
        <SubmitButton className="submit" />
      </div>

    </form>
  );
};

export default Signup;
