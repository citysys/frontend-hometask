import React, { useState } from "react";
import "./signUp.scss";
import { BiUser } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
import { z } from "zod";
import CityList from "../components/CityList";

const Signup: React.FC = () => {

  const [fullName, setFullName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [globalStatus, setGlobalStatus] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    }


    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      setGlobalStatus("Submitting form...");
      // Here you can add your code to submit the form data to the server
      setFormSubmitted(true);
    }
  };

  return (
    <div className="container">
      <div className="top">
        <h1> הרשמה :</h1>
        <span className="span"> * שדות המסומנים בכוכב הם שדות חובה </span>
      </div>
      <div className="bottom">
        <h4> פרטים אישיים :</h4>
        <div className="line" />
      </div>
      <div className="form">
        <div className="form-input">
          <input type="fullName" placeholder="שם מלא" id="fullName" value={fullName}
              onChange={handleInputChange} />
          <label htmlFor="fullName"> * שם מלא </label>
        </div>
        <div className="form-input">
          <input type="number" placeholder="שם מלא" id="id" />
          <label htmlFor="id"> * ת'ז</label>
        </div>
        <div className="form-input">
          <input type="date" placeholder="שם מלא" id="date" />
          <label htmlFor="date"> * תאריך לידה</label>
        </div>
      </div>
      <div className="bottom">
        <h4> פרטי תקשורת :</h4>
        <div className="line" />
      </div>
      <div className="form">
        <div className="form-input">
          <input type="number" placeholder="נייד" id="phone" />
          <label htmlFor="phone"> * נייד</label>
        </div>
        <div className="form-input">
          <input type="text" placeholder="שם מלא" id="email" />
          <label htmlFor="email"> * מייל</label>
        </div>
      </div>
      <div className="bottom">
        <h4> כתובת :</h4>
        <div className="line" />
      </div>
      <div className="form">
        <div className="form-input">
          <input type="text" placeholder="עיר" id="city" />
          <label htmlFor="city"> * עיר</label>
        </div>
        <div className="form-input">
          <input type="text" placeholder="שם מלא" id="street" />
          <label htmlFor="street"> * רחוב</label>
        </div>
        <div className="form-input">
          <input
            style={{ width: "50%" }}
            type="number"
            placeholder="מספר בית"
            id="homeNumber"
          />
          <label htmlFor="homeNumber"> * מספר בית</label>
        </div>
      </div>
      <div className="mui-container-fluid">
        <form>
          <div className="mui-checkbox">
            <input id="sed" type="checkbox" value="" />
            <label htmlFor="sed">אני מסכים לקבל דיוור במסרון ובמייל</label>
          </div>
        </form>
      </div>

      <div className="mui-container-fluid">
        <form>
          <div className="mui-checkbox">
            <input id="sed" type="checkbox" value="" />
            <label htmlFor="sed">אני מסכים לתנאי השירות </label>
          </div>
        </form>
      </div>
      <button className="btn">שליחה</button>
    </div>

    // <div className="container">
    //   <div className="form">
    //     <div className="header">
    //     <div className="register"><p>:הרשמה</p></div>
    //     <div className="small"><p> שדות המסומנים בכוכב הם שדות חובה*</p>
    //     </div>
    //     </div>
    //     <small> פרטים אישיים</small>
    //     <div className="stripe" />
    //     <div className="inputBox">
    //       <input type="text" />
    //       <span>שם מלא</span>
    //     </div>
    //     <div className="inputBox">
    //       <input type="text" />
    //       <span>ת"ז</span>
    //     </div>
    //     <div className="inputBox">
    //       <input className="date" type="date" />
    //       <span>תאריך לידה</span>
    //     </div>
    //     <button className="btn">שלח</button>
    //   </div>
    //   <div className="stripe" />
    // </div>
  );
};

export default Signup;
