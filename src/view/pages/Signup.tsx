import React, { useEffect, useState } from "react";
import {
  Checkbox,
  DatePickerCalendar,
  Input,
  SearchBox,
  Separator,
  SubmitButton,
} from "../components";
import "./Signup.style.scss";
import { useFormStore } from "../../controller";
import { getCities, getStreets } from "../../api";
import { useTranslation } from 'react-i18next';

import { Formik, Form } from "formik";
import * as Yup from "yup";

interface FormValues {
  fullName: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  birthDate: Date | null;
  city: string;
  street: string;
  homeNumber: string;
}

const Signup: React.FC = () => {
  const { t } = useTranslation();
  const [citiesData, setCitiesData] = useState([]);
  const [streetsData, setStreetsData] = useState([]);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    idNumber: "",
    phoneNumber: "",
    homeNumber: "",
    birthDate: null,
    city: city,
    street: street,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(`${t('yup.name')}`),
    email: Yup.string()
      .email(`${t('yup.email.invalid')}`)
      .required(`${t('yup.email.empty')}`),
    idNumber: Yup.string()
      .matches(/^[0-9]{9}$/, `${t('yup.idNumber.invalid1')}`)
      .test(`${t('yup.idNumber.valid')}`, `${t('yup.idNumber.invalid2')}`, (value) => {
        const id = value?.toString()?.trim();
        let sum = 0;
        let incNum;
        for (let i = 0; i < 9; i++) {
          incNum = Number(id![i]) * ((i % 2) + 1);
          sum += incNum > 9 ? incNum - 9 : incNum;
        }
        return sum % 10 === 0;
      })
      .required(`${t('yup.idNumber.empty')}`),
    phoneNumber: Yup.string()
      .length(10, `${t('yup.phoneNumber.invalidLen')}`)
      .matches(/^[0-9]*$/, `${t('yup.phoneNumber.invalidChar')}`)
      .required(`${t('yup.phoneNumber.empty')}`),
    homeNumber: Yup.string().required(`${t('yup.homeNumber.empty')}`),
    city: Yup.string().required(`${t('yup.city.empty')}`),
    street: Yup.string().required(`${t('yup.street.empty')}`),
    birthDate: Yup.string().required(`${t('yup.birthDate.empty')}`),
  });

  const setFormValues = useFormStore((state) => state.setFormValues);

  const checkCity = citiesData?.some((c: any) => c.name === city);
  const checkStreet = streetsData?.some((c: any) => c.name === street);

  const getCitiesData = async () => {
    const data = await getCities();
    setCitiesData(data);
  };

  const getStreetsData = async () => {
    const data = await getStreets(city);
    setStreetsData(data);
  };

  useEffect(() => {
    getCitiesData();
  }, []);

  useEffect(() => {
    getStreetsData();
  }, [city]);

  const handleSubmit = (values: any) => {
    if (checkCity && checkStreet) {
      setFormValues(values);
    } else {
      setFormValues({
        fullName: "",
        email: "",
        idNumber: "",
        phoneNumber: "",
        birthDate: null,
        city: "",
        street: "",
      });
    }

    console.log("setFormValues => ", useFormStore.getState().formValues);
  };

  const handleCityValueChange = (value: string) => {
    setCity(value);
  };

  const handleStreetValueChange = (value: string) => {
    setStreet(value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="container">
          <div className="inner-container">
            <div className="label">הרשמה:</div>
            <div className="required-label">
              {" "}
              *שדות המסומנים בכוכבית הם שדות חובה
            </div>

            {/* 1 */}

            <Separator label="פרטים אישיים" />
            <div className="section">
              <Input
                className="input"
                label="שם מלא"
                required
                type="input"
                name="fullName"
              />
              <Input
                className="input"
                label="ת.ז"
                name="idNumber"
                required
                type="input"
              />
              <div className="date-picker-wrapper input input-wrapper">
                <DatePickerCalendar
                  label="תאריך לידה"
                  name="birthDate"
                  required
                />
              </div>
            </div>

            {/* 2 */}
            <Separator label="פרטי התקשרות" />
            <div className="section">
              <Input
                className="input"
                label="נייד"
                name="phoneNumber"
                required
                type="input"
              />
              <Input
                className="input"
                label="מייל"
                name="email"
                required
                type="input"
              />
            </div>

            {/* 3 */}
            <Separator label="כתובת" />
            <div className="section">
              <SearchBox
                data={citiesData}
                label={"עיר"}
                chosenValue={city}
                setChosenValue={setCity}
                name="city"
                required
                onChildValueChange={handleCityValueChange}
                isValidName={checkCity}
                className="input"
              />
              <SearchBox
                data={streetsData}
                label={"רחוב"}
                chosenValue={street}
                setChosenValue={setStreet}
                name="street"
                required
                onChildValueChange={handleStreetValueChange}
                isValidName={checkStreet}
                className="input"
              />
              <Input
                className="input house"
                label="מספר בית‎"
                name="homeNumber"
                required
                type="input"
              />
            </div>

            <img src="./src/assests/buildings.png" className="buildings-img" />

            <div className="checkbox-separator">
              <Checkbox label="אני מסכים לקבל דיוור במייל ובמסרון" />
              <br />
            </div>

            <div className="checkbox-separator">
              <Checkbox label="אני מסכים לתנאי השירות" />
            </div>

            <SubmitButton className="send-btn" label="שלח" />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Signup;
