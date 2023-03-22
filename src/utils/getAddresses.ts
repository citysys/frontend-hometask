import axios from 'axios';

export const addresses = {} as any;

export const getAddresses = async (): Promise<void> => {
  try {
    await axios
      .get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=59695`
      )
      .then((res) => {
        const { records } = res.data.result;

        Object.values(records).map((record: any) => {
          const city = record['שם_ישוב'].trim();
          const street = record['שם_רחוב'].trim();

          if (!addresses[city]) {
            addresses[city] = [];
            addresses[city].push(street);
          } else {
            addresses[city].push(street);
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
