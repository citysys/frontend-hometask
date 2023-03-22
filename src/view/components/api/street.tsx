import axios from 'axios';
import { Key, useEffect, useState } from 'react';

interface Street {
    [x: string]: Key | null | undefined;
    שם_רחוב: string;
}

export const useStreetList = () => {
    const [streetList, setStreetList] = useState<Street[]>([]);
  
    useEffect(() => {
      axios
        .get(
            "https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=90000 "    
         )
        .then((response) => {
          setStreetList(response.data.result.records);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    return streetList;
}