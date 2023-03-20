import { Key, useEffect, useState } from "react";
import "./signUp.scss";
import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/Input/Input";

const formSchema = z.object({
  fullName: z.string().min(1, "שדה זה הוא חובה"),
  id: z.string().min(9,"חייב להיות תעדות זהות תקנית").max(9,"חייב להיות תעדות זהות תקנית"),
  dateOfBirth: z.date(),
  phone: z.string().min(10,"מספר חייב להיות תיקני").max(14,"שזה זה הוא חובה").optional(),
  email: z.string().min(1, "שדה האימייל הוא חובה").email("האיימיל לא תקין "),
  city: z.string().min(1, "שדה זה הוא חובה"),
  street: z.string().min(1, "שדה זה הוא חובה"),
  homeNumber: z.string().min(1, "שדה זה הוא חובה"),
});


type FormValues = z.infer<typeof formSchema>;

interface City {
  [x: string]: Key | null | undefined;
  שם_ישוב: string;
  שם_רחוב: string;
}


const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });


  const onFormSubmit = (data: FormValues) => {
    console.log(data);
  };
  

  const [cityList, setCityList] = useState<City[]>([]);
  const [streetList, setStreetList] = useState<City[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=100000"
      )
      .then((response) => {
        setCityList(response.data.result.records);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=1000"
      )
      .then((response) => {
        setStreetList(response.data.result.records);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <form className="container" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="top">
        <h1> הרשמה :</h1>
        <span className="span"> * שדות המסומנים בכוכב הם שדות חובה </span>
      </div>
      <div className="bottom">
        <h4> פרטים אישיים :</h4>
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

        {/* <div className="form-input">
          <input
            type="date"
            placeholder="תאריך לידה*"
            id="dateOfBirth"
            {...register("dateOfBirth")}
          />
          <label htmlFor="dateOfBirth"> * תאריך לידה</label>
        </div> */}

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

      <div className="form">
        <div className="form-input">
          <input
            list="cities"
            placeholder="עיר"
            id="city"
            {...register("city")}
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
            list="cities"
            placeholder="רחוב"
            id="street"
            {...register("street")}
          />
          <label htmlFor="street"> * עיר</label>
          <datalist id="street">
            {streetList.map((street, index) => (
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
      <div className="mui-container-fluid">
        <div>
          <div className="mui-checkbox">
            <input id="sed" type="checkbox" value="" />
            <label htmlFor="sed">אני מסכים לקבל דיוור במסרון ובמייל</label>
          </div>
        </div>
      </div>

      <div className="mui-container-fluid">
        <div>
          <div className="mui-checkbox">
            <input id="sed" type="checkbox" value="" />
            <label htmlFor="sed">אני מסכים לתנאי השירות </label>
          </div>
        </div>
      </div>
      <button type="submit" className="btn">שליחה</button>
    </form>
  );
};

export default Signup;
