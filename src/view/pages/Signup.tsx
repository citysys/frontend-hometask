import React, { useEffect, useCallback, useState } from "react";
import {
  Checkbox,
  DatePickerCalendar,
  Input,
  SearchBox,
  Separator,
  SubmitButton,
} from "../components";
import "./Signup.style.scss";
import axios from "axios";
import { useFormStore } from "../../controller";

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
}

const Signup: React.FC = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [streetsData, setStreetsData] = useState([]);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    idNumber: "",
    phoneNumber: "",
    birthDate: null,
    city: city,
    street: street,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("אנא מלא את שמך"),
    email: Yup.string()
      .email("כתובת מייל לא חוקית")
      .required("אנא מלא כתובת מייל"),
    idNumber: Yup.string()
      .matches(/^[0-9]{9}$/, "ת.ז חייבת לכלול 9 ספרות בלבד")
      .test("תקין", "ת.ז לא תקין", (value) => {
        const id = value?.toString()?.trim();
        let sum = 0;
        let incNum;
        for (let i = 0; i < 9; i++) {
          incNum = Number(id![i]) * ((i % 2) + 1);
          sum += incNum > 9 ? incNum - 9 : incNum;
        }
        return sum % 10 === 0;
      })
      .required("אנא מלא תעודת זהות"),
    phoneNumber: Yup.string()
      .length(10, "מס' נייד חייב לכלול 10 ספרות")
      .matches(/^[0-9]*$/, "מס' נייד חייב לכלול ספרות בלבד")
      .required("אנא מלא מספר נייד"),
    city: Yup.string().required("אנא מלא עיר"),
    street: Yup.string().required("אנא מלא שם רחוב"),
    birthDate: Yup.string().required("אנא מלא תאריך הלידה"),
  });

  const setFormValues = useFormStore((state) => state.setFormValues);

  const checkCity = citiesData?.some((c: any) => c.name === city);
  const checkStreet = streetsData?.some((c: any) => c.name === street);

  const getCities = async () => {
    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1500"
      );
      const citiesDetailsData = response?.data?.result?.records;
      const filteredCityNamesData = citiesDetailsData.map((item: any) => ({
        name: item.שם_ישוב.slice(0, -1),
      }));
      setCitiesData(filteredCityNamesData);
    } catch (error) {
      console.log(error);
    }
  };

  const getStreets = useCallback(
    async (city: string) => {
      try {
        const response = await axios.get(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&limit=100000"
        );

        const streetsDetailsData = response?.data?.result?.records;

        const filteredStreets = streetsDetailsData.filter(
          (item: any) => item.city_name.slice(0, -1) === city
        );

        const filteredStreetNameByCity = filteredStreets.map((item: any) => ({
          name: item.street_name.slice(0, -1),
        }));

        setStreetsData(filteredStreetNameByCity);
      } catch (error) {
        console.log(error);
      }
    },
    [city, street]
  );

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    getStreets(city);
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
            <div>
              <div className="label">:הרשמה</div>
              <div className="required-label">
                {" "}
                *שדות המסומנים בכוכבית הם שדות חובה
              </div>
            </div>

            {/* 1 */}

            <Separator label="פרטים אישיים" />
            <div className="section">
              <Input
                className="input"
                label="שם"
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
              <div className="date-picker-wrapper">
                <DatePickerCalendar label="תאריך לידה" name="birthDate" />
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
