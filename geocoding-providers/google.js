const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const fetch = require('node-fetch');

const getAddressObject = components => {

    let shouldBeComponent = {
        address1: ["street_address", "route"],
        postal_code: ["postal_code"],
        region: [
            "administrative_area_level_1",
            "administrative_area_level_2",
            "administrative_area_level_3",
            "administrative_area_level_4",
            "administrative_area_level_5"
        ],
        city: [
            "locality",
            "sublocality",
            "sublocality_level_1",
            "sublocality_level_2",
            "sublocality_level_3",
            "sublocality_level_4"
        ],
        country: ["country"]
    };

    let address = {
        address1: "",
        postal_code: "",
        region: "",
        city: "",
        country: ""
    };

    components.forEach(component => {
        for (let shouldBe in shouldBeComponent) {
            if (shouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                if (shouldBe === "country") {
                    address[shouldBe] = component.short_name;
                } else {
                    address[shouldBe] = component.long_name;
                }
            }
        }
    });

    return address;
};

const keepWhatYouNeed = results => results.reduce((acc, val) => {

    let address = getAddressObject(val.address_components);
    let location = {
        ...address,
        address2: val.formatted_address,
        lat: val.geometry.location.lat,
        long: val.geometry.location.lng
    }
    acc.push(location);
    return acc;
}, []);

const request = async str => {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=${API_KEY}`;
    try {
        let res = await fetch(URL).then(res => res.json());
        return (res.status === 'OK')
            ? {status: 'OK', location: keepWhatYouNeed(res.results)[0]}
            : res

    } catch (e) {
        return e;
    }
};

module.exports = {
    request
}