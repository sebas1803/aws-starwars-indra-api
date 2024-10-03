const peopleService = require('../services/peopleService');

async function getAllData() {
    try {
        const people = await peopleService.getAllPeopleData();
        return {
            statusCode: 200,
            body: JSON.stringify(people),
        };
    } catch (error) {
        console.error('Error al recuperar los datos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al recuperar los datos', error }),
        };
    }
};

module.exports.getAllData = getAllData;