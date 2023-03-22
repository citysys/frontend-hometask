import axios from 'axios';
import {Key} from 'react';

interface City {
    [x: string]: Key | null | undefined;
    שם_ישוב: string;
}

export const City = async (): Promise<City[]> => {
    const response = await axios.get(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=100000"
    );
    const cityList = response.data.result.records;
    return cityList;
  };