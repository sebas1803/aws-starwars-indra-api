const { createData } = require('../../people/createData');
const { getAllData } = require('../../people/getAllData');
const { getDataById } = require('../../people/getDataById');
const peopleService = require('../../services/peopleService');
const { createTestCharacter } = require('../testFactory');

jest.mock('../../services/peopleService');

describe('People Lambdas', () => {
    it('debería crear un nuevo personaje', async () => {
        const event = { body: JSON.stringify(createTestCharacter()) };
        peopleService.createCharacter.mockResolvedValue({ message: 'Personaje creado correctamente.' });

        const response = await createData(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe('Personaje creado correctamente.');
    });

    it('debería obtener todos los personajes', async () => {
        peopleService.getAllPeopleData.mockResolvedValue([createTestCharacter()]);

        const response = await getAllData();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([createTestCharacter()]);
    });

    it('debería obtener un personaje por ID', async () => {
        peopleService.getCharacterById.mockResolvedValue(createTestCharacter());

        const event = { pathParameters: { id: '1' } };
        const response = await getDataById(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(createTestCharacter());
    });
});
