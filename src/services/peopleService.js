const AWS = require('aws-sdk');
const StarWarsCharacter = require('../models/StarWarsCharacter');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { translateKeys } = require('../utils/translation');
const { fetchAllFromSwapi } = require('../utils/swapiFetcher');

const tableName = process.env.DYNAMODB_TABLE_PEOPLE;
const swapiBaseUrl = process.env.SWAPI_BASE_URL;

class PeopleService {
    static async createCharacter(data) {
        const character = StarWarsCharacter.fromRequestBody(data);
        const params = {
            TableName: tableName,
            Item: character,
        };

        return dynamoDB.put(params).promise();
    }

    static async getCharacterById(id) {
        const params = {
            TableName: tableName,
            Key: { id },
        };

        const dynamoData = await dynamoDB.get(params).promise();

        if (dynamoData.Item) {
            return dynamoData.Item;
        }

        try {
            const swapiResponse = await axios.get(`${swapiBaseUrl}/people/${id}/`);
            if (swapiResponse.status === 200) {
                const translatedData = translateKeys(swapiResponse.data, 'people');
                return translatedData;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('Personaje no encontrado ni en DynamoDB ni en SWAPI.');
            }
            throw new Error('Error al buscar el personaje en SWAPI.');
        }
    }

    static async getAllPeopleData() {
        const params = {
            TableName: tableName,
        };
        const dynamoData = await dynamoDB.scan(params).promise();
        const dynamoItems = dynamoData.Items || [];

        const swapiItems = await fetchAllFromSwapi('people');
        const translatedSwapiItems = swapiItems.map(person => translateKeys(person, 'people'));

        const allCharacters = [...dynamoItems, ...translatedSwapiItems];
        return allCharacters;
    }
}

module.exports = PeopleService;