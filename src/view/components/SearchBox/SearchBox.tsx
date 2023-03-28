import React, { useState } from "react";
import { ErrorMessage, useFormikContext } from "formik";

interface SearchBoxProps {
  data: any;
  label?: string;
  required?: boolean;
  chosenValue?: string;
  setChosenValue?: any;
  name: string;
  onChildValueChange: (value: string) => void;
  isValidName: boolean;
}

interface MyFormValues {
  name: string;
  [key: string]: any;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  data,
  label,
  required,
  name,
  onChildValueChange,
  isValidName,
}) => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [value1, setValue1] = useState("");

  const { values, setFieldValue } = useFormikContext<MyFormValues>();

  const namesArray = data?.map((obj: any) => obj.name);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue1(value);
    setFieldValue(name, event.target.value);
    onChildValueChange(value);
    setShowSuggestions(value.length > 0);
    const filtered = namesArray.filter((item: any) => item?.includes(value));
    setFilteredData(filtered);
  };

  const handleSuggestionClick = (value: string) => {
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
        value={values[name]}
        onChange={handleInputChange}
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
        {!isValidName && name === "city" && value1.length > 0 && (
          <div id={name}>שם עיר לא חוקי</div>
        )}
        {!isValidName && name === "street" && value1.length > 0 && (
          <div id={name}>שם רחוב לא חוקי</div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
