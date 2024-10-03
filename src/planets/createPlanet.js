const planetsService = require('../services/planetsService');

async function createPlanet(event) {
    const body = JSON.parse(event.body);

    try {
        await planetsService.createPlanet(body);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Planeta creado correctamente.' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al crear el planeta', error }),
        };
    }
};

module.exports.createPlanet = createPlanet;