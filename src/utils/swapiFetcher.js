const axios = require('axios');

const swapiBaseUrl = process.env.SWAPI_BASE_URL;

async function fetchAllFromSwapi(endpoint) {
    let allResults = [];
    let nextUrl = `${swapiBaseUrl}/${endpoint}/`;

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
