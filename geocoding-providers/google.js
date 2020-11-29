const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const fetch = require('node-fetch');

const statuses = {
    'OK': () => {},
    'ZERO_RESULTS': () => {}
}

const request = async str => {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=${API_KEY}`;
    let result = await fetch(URL).then(res => res.json());
    console.log(result);
    return result;
}

module.exports = {
    request
}