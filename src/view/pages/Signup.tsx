import React, { useEffect, useCallback, useState } from "react";
import { Checkbox } from "../components/Checkbox";
import { DatePickerCalendar } from "../components/DatePickerCalendar";
import { Input } from "../components/Input";
import { SearchBox } from "../components/SearchBox";
import { Separator } from "../components/Separator";
import { SubmitButton } from "../components/SubmitButton";
import "./Signup.style.scss";
import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
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
  const [citiesData, setCitiesData] = useState();
  const [streetsData, setStreetsData] = useState();
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");


  const initialValues: FormValues = {
    fullName: fullName,
    email: email,
    idNumber: idNumber,
    phoneNumber: phoneNumber,
    birthDate: selectedDate || null,
    city: city,
    street: street,
  };
  
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("אנא מלא את שמך"),
    email: Yup.string().email("כתובת מייל לא חוקית").required("אנא מלא כתובת מייל"),
    idNumber: Yup.string().length(9, "ת.ז חייבת לכלול 9 ספרות").required(" אנא מלא תעודת זהות"),
    phoneNumber: Yup.string().length(10, "מס' נייד חייב לכלול 10 ספרות").required("אנא מלא מספר נייד"),
  });


  // ----------
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  //----------------

  // console.log(city);

  const getCities = async () => {
    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1500"
      );
      // console.log(response?.data?.result?.records);
      // console.log(response);
      const citiesDetailsData = response?.data?.result?.records;
      const filteredCityNamesData = citiesDetailsData.map((item: any) => ({
        name: item.שם_ישוב,
      }));
      // console.log({ filteredCityNamesData });
      setCitiesData(filteredCityNamesData);
    } catch (error) {
      console.log(error);
    }
  };

  const getStreets = async () => {
    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&limit=100000"
      );
      // console.log(response?.data?.result?.records);
      // console.log(response);
      const streetsDetailsData = response?.data?.result?.records;

      const filteredStreets = streetsDetailsData.filter(
        (item: any) => item.city_name === "חדרה "
      );

      // console.log({ filteredStreets });

      const filteredStreetNameByCity = filteredStreets.map((item: any) => ({
        name: item.street_name,
      }));
      // console.log({ filteredStreetNameByCity });
      setStreetsData(filteredStreetNameByCity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCities();
    getStreets();
  }, []);


  const handleExternalInputChange = (event: any) => {
    // Get Formik context
    const formik = event.currentTarget.formik;

    // Get current values of form
    const values = formik.values;

    // Handle input change here
    console.log("Current values:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values)
      console.log('hi')
      }} 
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
                  onChange={(e) => setFullName(e.target.value)}
                  name="fullName"
                />
                <Input
                  className="input"
                  label="ת.ז"
                  name="idNumber"
                  required
                  type="input"
                  onChange={(e) => setIdNumber(e.target.value)}
                />
                <div style={{ marginRight: "-4%", marginTop: "8px" }}>
                  <DatePickerCalendar
                    label="תאריך לידה"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                  className="input"
                  label="מייל"
                  name="email"
                  required
                  type="input"
                  onChange={(e) => setEmail(e.target.value)}
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
                />
                <SearchBox
                  data={streetsData}
                  label={"רחוב"}
                  chosenValue={street}
                  setChosenValue={setStreet}
                  name="street"
                />
              </div>

              <img
                src="./src/assests/buildings.png"
                style={{
                  width: "35%",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  marginBottom: "12px",
                }}
              />

              <div className="section" style={{marginTop: '50px'}}>
                <Checkbox label="אני מסכים לקבל דיוור במייל ובמסרון" />
                <br />
              </div>

              <div className="section">
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
