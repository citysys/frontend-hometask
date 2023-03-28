import React, { useState } from "react";
import { Input } from "../Input";
import { ErrorMessage, useFormikContext } from "formik";

interface SearchBoxProps {
  data: any;
  label?: string;
  required?: boolean;
  chosenValue?: string;
  setChosenValue?: any;
  name: string;
  onChildValueChange: (value: string) => void;
}

interface MyFormValues {
  name: string;
  [key: string]: any; // add index signature
}

const SearchBox: React.FC<SearchBoxProps> = ({
  data,
  label,
  required,
  chosenValue,
  setChosenValue,
  name,
  onChildValueChange 
}) => {
  // console.log(data);
  // const [chosenValue, setChosenValue] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //--formik
  const { values, setFieldValue } = useFormikContext<MyFormValues>();
  //--formik

  const namesArray = data?.map((obj: any) => obj.name);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // setChosenValue(value);
    setFieldValue(name, event.target.value); // formik
    onChildValueChange(value);

    setShowSuggestions(value.length > 0);

    const filtered = namesArray.filter((item: any) => item?.includes(value));

    // console.log(filtered);
    setFilteredData(filtered);
  };

  const handleSuggestionClick = (value: string) => {
    // setChosenValue(value);
    setFieldValue(name, value);
    onChildValueChange(value);
    setShowSuggestions(false);
  };

  const renderSuggestion = (value: string) => {
    return (
      <li key={value} onClick={() => handleSuggestionClick(value)}>
        {value}
      </li>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <label className="input-label" style={{ marginRight: "-170px" }}>
        {label}
        {required && <div className="required">*</div>}
      </label>
      <input
        type="input"
        // value={chosenValue}
        value={values[name]}
        onChange={handleInputChange}
        // label={label}
        // required={required}
        name={name}
        className="input"
      />
      {showSuggestions && (
        <ul
          style={{
            background: "white",
            cursor: "pointer",
            textAlign: "right",
            listStyle: "none",
            position: "absolute",
            zIndex: 2,
            borderColor: "black",
            borderWidth: "2px",
            fontSize: "20px",
            marginTop: "38px",
            marginLeft: "70px",
          }}
        >
          {filteredData.map((item: any) => renderSuggestion(item))}
        </ul>
      )}

      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default SearchBox;
