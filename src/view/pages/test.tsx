import React, { useEffect, useState } from 'react'
import svg from './real-estate.svg'

// const api_url = "https://data.gov.il/api/3/action/datastore_search";
// // Cities endpoint
// const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
// // Streets endpoint
// const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";

const Test: React.FC = () => {
    let [cities, setCities] = useState(['Afula'])
    let [streets, setStreets] = useState([])

    useEffect(() => {
        (async function getCities(): Promise<void> {
            const israelCities = await fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500")
                .then(res => res.json())
            setCities(israelCities.result.records)
        })()
    }, [])

    const getStreets = async (): Promise<void> => {
        const streetsInCity = await fetch("https://data.gov.il/api/3/action/datastore_search/a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3")
            .then(res => res.json())
        console.log(streetsInCity)
        setStreets(streetsInCity.result.records)
    }


    return (
        <div>
            <div>
                <img src={svg} alt="buildings" />
            </div>
            <input type="text" list="city" onChange={getStreets} />
            <datalist id="city">
                <option value="">בחר יישוב</option>
                {cities.map(city =>
                    <option key={city['שם_ישוב']}>
                        {city['שם_ישוב']}
                    </option>)}
            </datalist>

            <input type="text" list="city" />
            <datalist>
                <option value="">בחר רחוב</option>
                {streets.map(street =>
                    <option key={street['שם_רחוב']}>
                        {street['שם_רחוב']}
                    </option>)}
            </datalist>


        </div>
    )
}

export default Test