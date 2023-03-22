import { Key, useEffect, useState } from "react";
import "./signUp.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/Input/Input";
import { NewUser, NewUserSchema, validateForm } from "../../model";
import { SubmitButton } from "../components/SubmitButton";
import { useStore } from "../../controller";
import SomeOtherComponent from "../components/Test";
import { City } from "../components/api/city";
import { useStreetList } from "../components/api/street";

interface City {
  [x: string]: Key | null | undefined;
  שם_ישוב: string;
}

interface Street {
  [x: string]: Key | null | undefined;
  שם_רחוב: string;
}

const Signup: React.FC = () => {
  const { setFormValid } = useStore();
  const [cityList, setCityList] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStreet, setSelectedStreet] = useState("");

  const streetList = useStreetList();

  useEffect(() => {
    City().then((data) => {
      setCityList(data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: zodResolver(NewUserSchema),
  });

  // I imported NewUser from model components
  const onFormSubmit = (data: NewUser) => {
    const isValid = validateForm(data);
    if (isValid) {
      setFormValid(true);
      console.log(data);
      handleReset();
    }
  };

  const handleReset = () => {
    // Reset the form using the reset function from react-hook-form
    // This will clear all form fields and errors
    reset();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="top">
          <h1> הרשמה :</h1>
          <span className="span"> * שדות המסומנים בכוכב הם שדות חובה </span>
        </div>
        <div className="bottom">
          <h4>פרטים אישיים :</h4>
          <div className="line" />
        </div>
        <div className="form">
          <Input
            id="fullName"
            label="*שם מלא"
            inputProps={register("fullName")}
            error={errors?.fullName?.message as string}
          />

          <Input
            id="id"
            label="*ת'ז "
            type="number"
            inputProps={register("id")}
            error={errors?.id?.message}
          />

          <Input
            id="dateOfBirth"
            label="*תאריך לידה"
            type="date"
            inputProps={register("dateOfBirth")}
            error={errors?.dateOfBirth?.message}
          />
        </div>

        <div className="bottom">
          <h4> פרטי תקשורת :</h4>
          <div className="line" />
        </div>

        <div className="form">
          <Input
            id="phone"
            label="*נייד  "
            type="number"
            inputProps={register("phone")}
            error={errors?.phone?.message}
          />
          <Input
            id="email"
            label="*אימייל "
            inputProps={register("email")}
            error={errors?.email?.message}
          />
        </div>

        <div className="bottom">
          <h4> כתובת :</h4>
          <div className="line" />
        </div>
        {/*
         I set **onChange** for the street and city field to check if the value is
          present in the array of streets/cities that came from the API.
          If it exists, it will appear in the field, if you try to write manually,
          it will be deleted 
        */}
        <div className="form">
          <div className="form-input">
            <input
              list="cities"
              placeholder="עיר"
              id="city"
              {...register("city")}
              value={selectedCity}
              onChange={(e) => {
                const value = e.target.value;
                const cityExists = cityList.some(
                  (city) => city.שם_ישוב === value
                );
                if (cityExists) {
                  setSelectedCity(value);
                } else {
                  setSelectedCity("");
                }
              }}
            />
            <label htmlFor="city"> * עיר</label>
            <datalist id="cities">
              {cityList.map((city, index) => (
                <option key={index} value={city.שם_ישוב} />
              ))}
            </datalist>
            <p className="error-message">{errors?.city?.message}</p>
          </div>
          <div className="form-input">
            <input
              list="streets"
              placeholder="רחוב"
              id="street"
              {...register("street")}
              value={selectedStreet}
              onChange={(e) => {
                const value = e.target.value;
                const streetExists = streetList.some(
                  (street) => street.שם_רחוב === value
                );
                if (streetExists) {
                  setSelectedStreet(value);
                } else {
                  setSelectedStreet("");
                }
              }}
            />
            <label htmlFor="street"> * רחוב</label>
            <datalist id="streets">
              {streetList
                .filter((street) => street.שם_ישוב === selectedCity)
                .map((street, index) => (
                  <option key={index} value={street.שם_רחוב} />
                ))}
            </datalist>
            <p className="error-message">{errors?.street?.message}</p>
          </div>

          <Input
            id="homeNumber"
            label="*מספר בית"
            type="number"
            inputProps={register("homeNumber")}
            error={errors?.homeNumber?.message}
          />
        </div>

        <div className="checkbox">
          <div className="mui-checkbox">
            <input id="sed" type="checkbox" value="" />
            <label htmlFor="sed">אני מסכים לקבל דיוור במסרון ובמייל</label>
          </div>

          <div>
            <div className="mui-checkbox">
              <input id="agree" type="checkbox" value="" />
              <label htmlFor="agree">אני מסכים לתנאי השירות </label>
            </div>
          </div>
        </div>
        <SomeOtherComponent />
        <SubmitButton className="btn" />
        <img src="/real-estate.png" alt="" className="real_estate" />
      </form>
    </div>
  );
};

export default Signup;
function setValue(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
