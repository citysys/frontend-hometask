export default Api = {
    getCities: async () => {
        return await fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500")
                .then(res => res.json())
    },

    getStreets: async () => {
        const streetsInCity = await fetch("https://data.gov.il/api/3/action/datastore_search/a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3")
            .then(res => res.json())
        console.log(streetsInCity)
        return streetsInCity.result.records
    }
}