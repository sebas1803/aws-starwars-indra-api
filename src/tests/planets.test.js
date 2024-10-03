const AWS = require('aws-sdk-mock');
const axios = require('axios');
const planetsService = require('../services/planetsService');
const { createTestPlanet } = require('./testFactory');

jest.mock('axios');
axios.get.mockResolvedValue({
    data: { results: [{ name: 'Alderaan', diameter: '12500' }] },
});

describe('Test all services in PlanetsService with axios Stub and AWS mock', () => {
    afterEach(() => {
        AWS.restore();
    });

    it('debería crear un planeta en DynamoDB', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
            callback(null, {});
        });

        const data = createTestPlanet();
        await expect(planetsService.createPlanet(data)).resolves.toEqual({});
    });

    it('debería obtener todos los planetas de DynamoDB y SWAPI', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(null, { Items: [createTestPlanet()] });
        });

        const planets = await planetsService.getAllPlanets();
        expect(planets).toEqual([
            createTestPlanet(),
            { name: 'Alderaan', diameter: '12500' },
        ]);
    });

    it('debería obtener un planeta por ID desde DynamoDB o SWAPI', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
            callback(null, { Item: createTestPlanet() });
        });

        const planet = await planetsService.getPlanetById('1');
        expect(planet).toEqual(createTestPlanet());
    });
});
