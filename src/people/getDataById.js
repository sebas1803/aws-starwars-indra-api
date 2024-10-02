const peopleService = require('../services/peopleService');

module.exports.getDataById = async (event) => {
    const { id } = event.pathParameters;

    try {
        const character = await peopleService.getCharacterById(id);
        if (!character.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Personaje no encontrado.' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al recuperar el personaje', error }),
        };
    }
};