const starshipsService = require('../services/starshipsService');

module.exports.getStarshipById = async (event) => {
    const { id } = event.pathParameters;

    try {
        const starship = await starshipsService.getStarshipById(id);
        if (!starship) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Nave espacial no encontrada.' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(starship),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al recuperar nave espacial', error }),
        };
    }
};