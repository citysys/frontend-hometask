import React, { useState, useEffect, Key } from 'react';
import axios from 'axios';
import Select from 'react-select';

export type OptionType = {
  [x: string]: Key | null | undefined;
  שם_ישוב: string;
};

export const useCities = () => {
  const [cities, setCities] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=9999'
        );
        const cities = response.data.result.records.map((record: any) => ({
          value: record.שם_ישוב,
          label: record.שם_ישוב,
        }));
        setCities(cities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
  }, []);

  return cities;
};

export const useStreets = (selectedCity: OptionType | null) => {
  const [streets, setStreets] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchStreets = async () => {
      try {
        if (selectedCity) {
          const response = await axios.get(
            `https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&q=${selectedCity.value}&limit=9999`
          );
          const streets = response.data.result.records.map((record: any) => ({
            value: record.שם_רחוב,
            label: record.שם_רחוב,
          }));
          setStreets(streets);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStreets();
  }, [selectedCity]);

  return streets;
};
