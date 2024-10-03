const { createPlanet } = require('../../planets/createPlanet');
const { getAllPlanets } = require('../../planets/getAllPlanets');
const { getPlanetById } = require('../../planets/getPlanetById');
const planetsService = require('../../services/planetsService');
const { createTestPlanet } = require('../testFactory');

jest.mock('../../services/planetsService');

describe('Planets Lambdas', () => {
    it('debería crear un nuevo planeta', async () => {
        const event = { body: JSON.stringify(createTestPlanet()) };
        planetsService.createPlanet.mockResolvedValue({ message: 'Planeta creado correctamente.' });

        const response = await createPlanet(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe('Planeta creado correctamente.');
    });

    it('debería obtener todos los planetas', async () => {
        planetsService.getAllPlanets.mockResolvedValue([createTestPlanet()]);

        const response = await getAllPlanets();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([createTestPlanet()]);
    });

    it('debería obtener un planeta por ID', async () => {
        planetsService.getPlanetById.mockResolvedValue(createTestPlanet());

        const event = { pathParameters: { id: '1' } };
        const response = await getPlanetById(event);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(createTestPlanet());
    });
});
