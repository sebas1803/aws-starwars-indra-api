const AWS = require('aws-sdk-mock');
const axios = require('axios');
const peopleService = require('../services/peopleService');
const { createTestCharacter } = require('./testFactory');

jest.mock('axios');
axios.get.mockResolvedValue({
    data: { results: [{ name: 'Han Solo', height: '180' }] },
});

describe('Test all services in PeopleService with axios Stub and AWS mock', () => {
    afterEach(() => {
        AWS.restore();
    });

    it('deberia crear un personaje en DynamoDB', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
            callback(null, {});
        });

        const data = createTestCharacter();
        await expect(peopleService.createCharacter(data)).resolves.toEqual({});
    });

    it('debería obtener todos los personajes de DynamoDB y SWAPI', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(null, { Items: [createTestCharacter()] });
        });

        const characters = await peopleService.getAllPeopleData();
        expect(characters).toEqual([
            createTestCharacter(),
            { name: 'Han Solo', height: '180' },
        ]);
    });

    it('debería obtener un personaje por ID desde DynamoDB o SWAPI', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
            callback(null, { Item: createTestCharacter() });
        });

        const character = await peopleService.getCharacterById('1');
        expect(character).toEqual(createTestCharacter());
    });
});
