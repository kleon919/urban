const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const fetch = require('node-fetch');

const wrapResponse = res => {
    return (res.status === 'OK')
        ? Object.assign({}, res, {ok: true})
        : res
}

const request = async str => {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=${API_KEY}`;
    try {
        let res = await fetch(URL).then(res => res.json());
        return wrapResponse(res);
    } catch (e) {
        return e;
    }
}

module.exports = {
    request
}