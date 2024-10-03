const AWS = require('aws-sdk-mock');
const axios = require('axios');
const starshipsService = require('../services/starshipsService');
const { createTestStarship } = require('./testFactory');

jest.mock('axios');
axios.get.mockResolvedValue({
    data: { results: [{ name: 'X-Wing', model: 'T-65' }] },
});

describe('Test all services in StarshipsService with axios Stub and AWS mock', () => {
    afterEach(() => {
        AWS.restore();
    });

    it('debería crear una nave en DynamoDB', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
            callback(null, {});
        });

        const data = createTestStarship();
        await expect(starshipsService.createStarship(data)).resolves.toEqual({});
    });

    it('debería obtener todas las naves de DynamoDB y SWAPI', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            expect(params.TableName).toBe(process.env.DYNAMODB_TABLE_STARSHIPS);
            callback(null, { Items: [createTestStarship()] });
        });

        const starships = await starshipsService.getAllStarships();
        expect(starships).toEqual([
            createTestStarship(),
            { name: 'X-Wing', model: 'T-65' },
        ]);
    });

    it('debería obtener una nave por ID desde DynamoDB o SWAPI', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
            expect(params.TableName).toBe(process.env.DYNAMODB_TABLE_STARSHIPS);
            expect(params.Key).toEqual({ id: '2' });
            callback(null, { Item: createTestStarship() });
        });

        const starship = await starshipsService.getStarshipById('1');
        expect(starship).toEqual(createTestStarship());
    });
});
