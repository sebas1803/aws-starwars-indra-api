const starshipsService = require('../services/starshipsService');

module.exports.createStarship = async (event) => {
    const body = JSON.parse(event.body);

    try {
        await starshipsService.createStarship(body);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Nave espacial creada correctamente.' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al crear el nave espacial', error }),
        };
    }
};