require("dotenv").config();
const express = require("express");

const providers = require('./geocoding-providers');
const findArea = require('./polygons');


const app = express();

const validate = (req, res, next) => {
    // todo Use joi here to validate the query string parameter -> address
    return next()
};

// Apply a recursive call to each existing provider into the array.
// Responds with success ('OK' status) only when a valuable result has been returned.
// In other case, proceeds to the next provider, if exists or responds with 'NOT_FOUND' status
const retryAcrossProviders = async (providers, address) => {
    const [currentProvider, ...rest] = providers;
    let res = await currentProvider.request(address).catch(e => e);
    if (res.status === 'OK') return res;
    return (rest.length > 0)
        ? retryAcrossProviders(rest, address)
        : res; // return predefined not find msg
};

// Function to handle the info path
app.get('/info', validate, async (req, res) => {

    // Access the provided 'address' query parameter
    let search = req.query.address;

    try {
        let response = await retryAcrossProviders(providers, encodeURI(search));
        if (response.status === 'OK'){
            let {name} = findArea([response.location.long, response.location.lat]);
            response.location.serviceArea = name;
        }
        return res.send(response);
    } catch (e) {
        console.log(e)
        res.send(500)
    }
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
});