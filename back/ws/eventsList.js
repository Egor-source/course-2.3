const fs = require('fs');
const path = require('path');
let events = {};

fs.readdirSync(path.join(__dirname, 'events'))
    .forEach(file => {
        events = {
            ...events,
            ...require(path.join(__dirname, 'events', file)),
        };
    });

module.exports = events;


