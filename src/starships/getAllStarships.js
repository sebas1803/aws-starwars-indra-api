const starshipsService = require('../services/starshipsService');

module.exports.getAllStarships = async () => {
    try {
        const starships = await starshipsService.getAllStarships();
        return {
            statusCode: 200,
            body: JSON.stringify(starships),
        };
    } catch (error) {
        console.error('Error al recuperar las naves espaciales:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al recuperar las naves espaciales', error }),
        };
    }
};
