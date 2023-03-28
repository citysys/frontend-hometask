import "./Signup.style.scss";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { NewUserSchema } from "../../model";
import { useStore } from "../../controller";
import { useState } from "react";
import { Api } from "../../DAL/Api";

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
  const setUser = useStore(state => state.setUser)
  const [cities, setCities] = useState([])
  const [streets, setStreets] = useState([])
  const [currentCity, setCurrentCity] = useState([])

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: INITIAL_USER,
    resolver: zodResolver(NewUserSchema)
  })

  const { errors } = formState


  const onSave = (formValues: any): void => {
    setUser(formValues)
  }

  return (
    <form
      className="signup container"
      onSubmit={handleSubmit(onSave)}
    >
      <div className="personal">

        <h5>פרטים אישיים</h5>
        <div className="section">

          <label>
            <span>*</span> שם מלא
            <Input
              name="name"
              type="text"
              errors={errors.name}
              register={() => register('name')} />
          </label>

          <label>
            <span>*</span> ת.ז
            <Input
              name="id"
              type="text"
              errors={errors.id} 
              register={() => register('id')} />
          </label>

          <label>
            <span>*</span> תאריך לידה
            <Input
              name="birthDate"
              type="date"
              errors={errors.birthDate}
              register={() => register('birthDate')} />
          </label>

        </div>

        <div className="contact">

          <h5>פרטי התקשרות</h5>
          <div className="section">

            <label>
              <span>*</span> נייד
              <Input
                name="phone"
                type="text"
                errors={errors.email}
                register={() => register('phone')} />
            </label>

            <label>
              <span>*</span> אימייל
              <Input
                name="email"
                type="email"
                errors={errors.email}
                register={() => register('email')} />
            </label>

          </div>

          <div className="address">

            <h5>כתובת</h5>
            <div className="section">

              <label>
                <span>*</span> עיר
                <Input
                  name="city"
                  type="text"
                  errors={errors}
                  register={() => register('city')} />
              </label>

              <label>
                <span>*</span> רחוב
                <Input
                  name="street"
                  type="text"
                  errors={errors}
                  register={() => register('street')} />
              </label>

              <label>
                <span>*</span> מספר בית
                <Input
                  name="houseNumber"
                  type="text"
                  errors={errors}
                  register={() => register('houseNumber')} />
              </label>

            </div>

            <div className="rest">

              <div className="section">

                <label>
                  <Input
                    name="emailReceive"
                    type="checkbox"
                    errors={errors}
                    register={() => register('emailReceive')} />
                  אני מסכים לקבל דיוור במייל
                </label>

                <label>
                  <Input
                    name="agree"
                    type="checkbox"
                    errors={errors}
                    register={() => register('agree')} />
                  אני מסכים לתנאי השירות
                </label>


              </div>

              <div>
                <SubmitButton className="submit" />
              </div>

            </div>
          </div>
        </div>
      </div>

    </form>
  );
};

export default Signup;
