const planetsService = require('../services/planetsService');

module.exports.getAllPlanets = async () => {
    try {
        const planets = await planetsService.getAllPlanets();
        return {
            statusCode: 200,
            body: JSON.stringify(planets.Items),
        };
    } catch (error) {
        console.error('Error al recuperar los planetas:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al recuperar los planetas', error }),
        };
    }
};
