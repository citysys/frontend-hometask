import "./Signup.style.scss";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { cityValidate, NewUserSchema } from "../../model";
import { useStore } from "../../controller";
import { useEffect } from "react";


const formInputs = [
  {
    category: 'personal',
    label: 'פרטים אישיים',
    fields: [
      {
        name: 'name',
        label: 'שם מלא',
        type: 'text',
        description: '',
        defaultValue: '',
        require: true
      },
      {
        name: 'id',
        label: 'ת.ז',
        type: 'text',
        description: '',
        defaultValue: '',
        require: true
      },
      {
        name: 'birthDate',
        label: 'תאריך לידה',
        type: 'date',
        description: '',
        defaultValue: '1800-01-01',
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
        description: '',
        defaultValue: '',
        require: true
      },
      {
        name: 'email',
        label: 'מייל',
        type: 'text',
        description: '',
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
        description: '',
        defaultValue: '',
        require: true
      },
      {
        name: 'street',
        label: 'רחוב',
        type: 'data_list',
        description: '',
        defaultValue: '',
        require: true
      },
      {
        name: 'houseNumber',
        label: 'מספר בית',
        type: 'text',
        description: '',
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
        label: '',
        description: 'אני מסכים לקבל דיוור במייל',
        type: 'checkbox',
        defaultValue: true,
        require: false
      },
      {
        name: 'agree',
        label: '',
        description: 'אני מסכים לתנאי השירות',
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
  const cities = useStore(state => state.cities)
  const setCities = useStore(state => state.setCities)
  const streets = useStore(state => state.streets)
  const setStreets = useStore(state => state.setStreets)

  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: INITIAL_USER,
    resolver: zodResolver(NewUserSchema)
  })

  const currentCity = watch('city')
  const { errors } = formState

  useEffect(() => {
    setCities()
  }, [])

  useEffect(() => {
    if (cityValidate(currentCity)) {
      setStreets(currentCity)
    }
  }, [currentCity])

  const onSave = (formValues: any): void => {
    setUser(formValues)
  }

  return (
    <div className="container">

      <form
        className="signup"
        onSubmit={handleSubmit(onSave)}
      >
        <div className="fieldsContainer box">
          <div className="header">
            <h1 className="title">הרשמה</h1>
            <p className="instruction">*שדות המסומנים בכוכבית הם שדות חובה</p>
          </div>
          <div className="inputs">
            {
              formInputs.map(section =>
              (
                <div key={section.category}>
                  <h5>{section.label}</h5>
                  <hr className="hr" />
                  <div className={section.category + " section"}>
                    {
                      section.fields.map(input =>
                        <div key={input.name} className={errors[input.name] && 'invalid'}>
                          <Input
                            name={input.name}
                            label={input.label}
                            type={input.type}
                            isRequire={input.require}
                            description={input.description}
                            errors={errors}
                            register={() => register(input.name)}
                            options={input.name === 'city' ? cities :
                              (input.name === 'street' ? streets : [])}
                          />
                        </div>
                      )
                    }
                  </div>
                </div>
              ))}

            <div>
              <SubmitButton className="submit" />
            </div>
          </div>

        </div>

      </form>
      <div className="image box">
        <img src={'images/real-estate.svg'} alt="buildings" />
      </div>

    </div>

  );
};

export default Signup;
