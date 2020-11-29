const into = require('point-in-polygon');
const rawJsonFile = require('./formatted-districts.json');

// Transform the above JSON file to be easier to search into it.
const transform = file => file.features.map(polygon => ({area: polygon.geometry.coordinates[0], name: polygon.properties.Name}));

// Point should be an array of coordinates
const findArea = point => transform(rawJsonFile).find(polygon => into(point, polygon.area));

module.exports = findArea;