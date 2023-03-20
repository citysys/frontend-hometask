import React, { useState, useEffect } from "react";

interface City {
  name: string;
}

const CityList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=9b623a6b-bdd8-4f6d-82fe-037bdb6a307c"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCities(data.result.records);
      } catch (error) {
        setError('');
      }
    }

    fetchCities();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {cities.map((city) => (
        <li key={city.name}>{city.name}</li>
      ))}
    </ul>
  );
};

export default CityList;
