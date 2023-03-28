import React, { useEffect, useRef, useState } from 'react'

const api_url = "https://data.gov.il/api/3/action/datastore_search?resource_id=";
const cities_resource = "d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500";
const streets_resource = "9ad3862c-8391-4b2f-84a4-2d4c68625f4b&q=";


const Test: React.FC = () => {
    let [cities, setCities] = useState([])
    let [streets, setStreets] = useState([])
    const cityName = useRef({ result: { fields: { שם_ישוב: '' } } })

    useEffect(() => {
        (async function getCities(): Promise<void> {
            const israelCities = await fetch(api_url + cities_resource)
                .then(res => res.json())
            setCities(israelCities.result.records)
        })()
    }, [])

    const getStreets = async (): Promise<void> => {
        const streetsInCity = await fetch(`${api_url}${streets_resource}${cityName.current.result.fields['שם_ישוב']}`)
            .then(res => res.json())
        setStreets(streetsInCity.result.records)
    }

    return (
        <div>
            <div>
                <img src={'images/real-estate.svg'} alt="buildings" />
            </div>
            <input ref={cityName} type="text" list="city" onChange={getStreets} />
            <datalist id="city">
                <option value="">בחר יישוב</option>
                {cities.map(city =>
                    <option key={city['סמל_ישוב']}>
                        {city['שם_ישוב']}
                    </option>)}
            </datalist>

            <input type="text" list="street" />
            <datalist id='street'>
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