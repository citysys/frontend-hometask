import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form/dist/useController";
import { Api } from "../../../DAL/Api";
import { Input } from "./components/Input";
import { SubmitButton } from "./components/SubmitButton";

interface Input {
  category: string,
  label: string,
  fields:
  {
    name: string,
    label: string,
    type: string,
    defaultValue: string,
    require: boolean
  }
}

interface FormProps {
    formInputs: Input[]
    onSubmit: ()=> any
    schema?: any
}

const FormComponent: React.FC<FormProps> = (formInputs, onSubmit, schema) => {

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
  const [cities, setCities] = useState([])
  const [streets, setStreets] = useState([])

  const { register, control, handleSubmit, formState, getValues } = useForm({
    defaultValues: INITIAL_USER,
    resolver: zodResolver(schema)
  })
  const currentCity = getValues('city')
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
      console.log(currentCity);
      setCities(await Api.getStreets(currentCity))
    })()
  }, [currentCity])

  const onSubmit = (formValues: any): void => {
    onSave(formValues)
  }

  return (
    <form
      className="signup container"
      onSubmit={handleSubmit(onSubmit)}
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
                        options={input.name === 'city' ? cities :
                          (input.name === 'street' ? streets : [])}
                        // field={input.name === 'city' ? cityField : streetField}
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
    </form>
  );
};

export default FormComponent;
