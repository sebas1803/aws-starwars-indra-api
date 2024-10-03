const planetsService = require('../services/planetsService');

async function getAllPlanets() {
    try {
        const planets = await planetsService.getAllPlanets();
        return {
            statusCode: 200,
            body: JSON.stringify(planets),
        };
    } catch (error) {
        console.error('Error al recuperar los planetas:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al recuperar los planetas', error }),
        };
    }
};

module.exports.getAllPlanets = getAllPlanets;