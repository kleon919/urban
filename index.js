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
    const currentProvider = providers.shift();
    let res = await currentProvider.request(address).catch(e => e);
    if (res.ok) return res
    return (providers.length > 0)
        ? retryAcrossProviders(providers, address)
        : res; // return predefined not find msg
}

const keepWhatYouNeed = res => res.results.reduce((acc, val) => {

}, {})

// Function to handle the info path
app.get('/info', validate, async (req, res) => {

    // Access the provided 'address' query parameter
    let address = req.query.address;

    try {
        let result = await retryAcrossProviders([...providers], encodeURI(address));
        let {name} = findArea([-0.10422, 51.53196]); // todo
        return res.send({name, result});
    } catch (e) {
        console.log(e)
        res.send(500)
    }
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
});