const planetsService = require('../services/planetsService');

async function getPlanetById(event) {
    const { id } = event.pathParameters;

    try {
        const planet = await planetsService.getPlanetById(id);
        if (!planet) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Planeta no encontrado.' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(planet),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al recuperar el planeta', error }),
        };
    }
};

module.exports.getPlanetById = getPlanetById;