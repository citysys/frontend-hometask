import "./Signup.style.scss";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { NewUserSchema } from "../../model";
import { useStore } from "../../controller";
import { Fragment, useEffect, useState } from "react";
import { Api } from "../../DAL/Api";

interface Inputs {
  category: string,
  label: string,
  fields: 
    {
      name: string,
      label: string,
      type: string,
      defaultValue: string,
      require: boolean
    }[]
}

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
  const [cities, setCities] = useState([])
  const [currentCity, setCurrentCity] = useState('')
  const [streets, setStreets] = useState([])

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: INITIAL_USER,
    resolver: zodResolver(NewUserSchema)
  })

  const { errors } = formState
  const { field: cityField } = useController({ name: 'city', control })
  const { field: streetField } = useController({ name: 'street', control })

  useEffect(() => {
    (async function getCity() {    
      setCities(await Api.getCities())
    })()
  }, [])

  useEffect(() => {
    (async function getStreet() {
      setCities(await Api.getStreets(currentCity))
    })()
  }, [currentCity])

  const onSave = (formValues: any): void => {
    console.log({ formValues })

    setUser(formValues)
  }

  return (
    <form
      className="signup container"
      onSubmit={handleSubmit(onSave)}
    >
      <div className="box">
        {
          formInputs.map(section =>
          (
            <div key={section.category}>
              <h5>{section.label}</h5>
              <div className={section.category + " section"}>
                {
                  section.fields.map(input =>
                    <div key={input.name} className={errors[input.name] && 'invalid'}>
                      <Input
                        name={input.name}
                        label={input.label}
                        type={input.type}
                        isRequire={input.require}
                        errors={errors}
                        register={() => register(input.name)}
                        options={cities}
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

      <div className="image box rightBox">
        <img src={'images/real-estate.svg'} alt="buildings" />
      </div>
    </form>
  );
};

export default Signup;
