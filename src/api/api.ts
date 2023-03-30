import axios from "axios";

export const getCities = async () => {
  try {
    const response = await axios.get(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1500"
    );
    const citiesDetailsData = response?.data?.result?.records;
    const filteredCityNamesData = citiesDetailsData.map((item: any) => ({
      name: item.שם_ישוב.slice(0, -1),
    }));
    return filteredCityNamesData;
  } catch (error) {
    console.log(error);
  }
};

export const getStreets = async (city: string) => {
  try {
    const response = await axios.get(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&limit=100000"
    );

    const streetsDetailsData = response?.data?.result?.records;

    const filteredStreets = streetsDetailsData.filter(
      (item: any) => item.city_name.slice(0, -1) === city
    );

    const filteredStreetNameByCity = filteredStreets.map((item: any) => ({
      name: item.street_name.slice(0, -1),
    }));

    return filteredStreetNameByCity;
  } catch (error) {
    console.log(error);
  }
};
