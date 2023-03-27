import React, { useEffect, useCallback, useState } from "react";
import { Checkbox } from "../components/Checkbox";
import { DatePickerCalendar } from "../components/DatePickerCalendar";
import { Input } from "../components/Input";
import { SearchBox } from "../components/SearchBox";
import { Separator } from "../components/Separator";
import { SubmitButton } from "../components/SubmitButton";
import "./Signup.style.scss";
import axios from "axios";




const Signup: React.FC = () => {

  const [citiesData, setCitiesData] = useState();
  const [streetsData, setStreetsData] = useState();
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");


  console.log(city);

  const getCities = async () => {
    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1500"
      );
      console.log(response?.data?.result?.records);
      console.log(response);
      const citiesDetailsData = response?.data?.result?.records;
      const filteredCityNamesData = citiesDetailsData.map((item: any) => ({
        name: item.שם_ישוב,
      }));
      console.log({ filteredCityNamesData });
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
      console.log(response?.data?.result?.records);
      console.log(response);
      const streetsDetailsData = response?.data?.result?.records;

      const filteredStreets = streetsDetailsData.filter(
        (item: any) => item.city_name === "חדרה "
      );

      console.log({ filteredStreets });

      const filteredStreetNameByCity = filteredStreets.map((item: any) => ({
        name: item.street_name,
      }));
      console.log({ filteredStreetNameByCity });
      setStreetsData(filteredStreetNameByCity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCities();
    getStreets();
  }, []);

  return (
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
                // validationSchema={schema.pick({ fullName: true })}
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
                name="emailAddress"
                required
                type="input"
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            {/* 3 */}
            <Separator label="כתובת" />
            <div className="section">
              {/* <Input className="input" label="עיר" required type="input" /> */}
              <SearchBox
                data={citiesData}
                label={"עיר"}
                required
                chosenValue={city}
                setChosenValue={setCity}
                name="city"
              />
              <SearchBox
                data={streetsData}
                label={"רחוב"}
                required
                chosenValue={street}
                setChosenValue={setStreet}
                name="street"
              />

              {/* <Input className="input" label="רחוב" required type="input" /> */}
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

            <div className="section">
              <Checkbox label="אני מסכים לקבל דיוור במייל ובמסרון" />
              <br />
            </div>

            <div className="section">
              <Checkbox label="אני מסכים לתנאי השירות" />
            </div>

            <SubmitButton className="send-btn" label="שלח" />
          </div>
        </div>
  );
};

export default Signup;
