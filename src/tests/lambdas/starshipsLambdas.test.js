const { createStarship } = require('../../starships/createStarship');
const { getAllStarships } = require('../../starships/getAllStarships');
const { getStarshipById } = require('../../starships/getStarshipById');
const starshipsService = require('../../services/starshipsService');
const { createTestStarship } = require('../testFactory');

jest.mock('../../services/starshipsService');

describe('Starships Lambdas', () => {
    it('debería crear una nueva nave', async () => {
        const event = { body: JSON.stringify(createTestStarship()) };
        starshipsService.createStarship.mockResolvedValue({ message: 'Nave creada correctamente.' });

        const response = await createStarship(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe('Nave espacial creada correctamente.');
    });

    it('debería obtener todas las naves', async () => {
        starshipsService.getAllStarships.mockResolvedValue([createTestStarship()]);

        const response = await getAllStarships();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([createTestStarship()]);
    });

    it('debería obtener una nave por ID', async () => {
        starshipsService.getStarshipById.mockResolvedValue(createTestStarship());

        const event = { pathParameters: { id: '1' } };
        const response = await getStarshipById(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(createTestStarship());
    });
});
