const axios = require('axios');

async function fetchAllFromSwapi(endpoint) {
    let allResults = [];
    let nextUrl = `https://swapi.py4e.com/api/${endpoint}/`;

    while (nextUrl) {
        const response = await axios.get(nextUrl);
        allResults = [...allResults, ...response.data.results];
        nextUrl = response.data.next;
    }

    return allResults;
}

module.exports = {
    fetchAllFromSwapi,
};
