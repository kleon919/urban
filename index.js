require("dotenv").config();

const express = require("express");
// const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const validate = (req, res, next) => {
    // todo Use joi here to validate the query string parameter -> address
    return next()
}

// Function to handle the info path
app.get('/info', validate, async (req, res) => {

    // Access the provided 'address' query parameter
    let address = req.query.address;
    let encoded = encodeURI(address);

    return res.send(encoded)
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
});