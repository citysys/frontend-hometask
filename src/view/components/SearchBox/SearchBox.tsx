import React, { useState } from "react";
import { Input } from "../Input";

interface SearchBoxProps {
  data: any;
  label?: string;
  required?: boolean;
  chosenValue?: string;
  setChosenValue?: any;
  name: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ data, label, required, chosenValue, setChosenValue, name }) => {
  // console.log(data);
  // const [chosenValue, setChosenValue] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const namesArray = data?.map((obj: any) => obj.name);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setChosenValue(value);
    setShowSuggestions(value.length > 0);

    const filtered = namesArray.filter((item: any) => item?.includes(value));

    // console.log(filtered);
    setFilteredData(filtered);
  };

  const handleSuggestionClick = (value: string) => {
    setChosenValue(value);
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
    <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
       <label className="input-label" style={{marginRight: '-170px'}}>
        {label}
        {required && <div className="required">*</div>}
      </label>
      <input
        type="input"
        value={chosenValue}
        onChange={handleInputChange}
        // label={label}
        required={required}
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
            borderColor: 'black',
            borderWidth: '2px',
            fontSize: '20px',
            marginTop: '38px',
            marginLeft: '70px',

          }}
        >
          {filteredData.map((item: any) => renderSuggestion(item))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
