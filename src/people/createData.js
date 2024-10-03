const peopleService = require('../services/peopleService');

async function createData(event) {
    const body = JSON.parse(event.body);

    try {
        await peopleService.createCharacter(body);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Personaje creado correctamente.' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al crear el personaje', error }),
        };
    }
}

module.exports.createData = createData;