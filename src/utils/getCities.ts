import axios from 'axios';

export const cities = [''] as any;

const getCities = async (): Promise<void> => {
  try {
    await axios
      .get(
        'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1267'
      )
      .then((res) => {
        const { records } = res.data.result;

        Object.values(records).map((record: any) => {
          if (record['שם_ישוב'].trim() !== 'לא רשום') {
            cities.push(record['שם_ישוב'].trim());
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

getCities();
