import React, { useEffect, useState } from 'react'

const api_url = "https://data.gov.il/api/3/action/datastore_search?resource_id=";
const cities_resource = "d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500";

export interface DataListProps { }

const DataList: React.FC<DataListProps> = () => {
    let [cities, setCities] = useState([])
    useEffect(() => {
        (async function getCities(): Promise<void> {
            const israelCities = await fetch(api_url + cities_resource)
                .then(res => res.json())
            setCities(israelCities.result.records)
        })()
    }, [])

    return (
        <datalist id="city">
            <option value="">בחר יישוב</option>
            {cities.map(city => <option key={city['סמל_ישוב']} value={city['שם_ישוב']}/>)}
        </datalist>
    )
}

export default DataList