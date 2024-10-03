const AWS = require('aws-sdk');
const Starship = require('../models/Starship');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { translateKeys } = require('../utils/translation');
const { fetchAllFromSwapi } = require('../utils/swapiFetcher');

const tableName = process.env.DYNAMODB_TABLE_STARSHIPS;
const swapiBaseUrl = process.env.SWAPI_BASE_URL;

class StarshipService {
    static async createStarship(data) {
        const starship = Starship.fromRequestBody(data);
        const params = {
            TableName: tableName,
            Item: starship,
        };

        return dynamoDB.put(params).promise();
    }

    static async getStarshipById(id) {
        const params = {
            TableName: tableName,
            Key: { id },
        };

        const dynamoData = await dynamoDB.get(params).promise();

        if (dynamoData.Item) {
            return dynamoData.Item;
        }

        try {
            const swapiResponse = await axios.get(`${swapiBaseUrl}/starships/${id}/`);
            if (swapiResponse.status === 200) {
                const translatedData = translateKeys(swapiResponse.data, 'starships');
                return translatedData;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('Nave espacial no encontrado ni en DynamoDB ni en SWAPI.');
            }
            throw new Error('Error al buscar el nave espacial en SWAPI.');
        }
    }

    static async getAllStarships() {
        const params = {
            TableName: tableName,
        };
        const dynamoData = await dynamoDB.scan(params).promise();
        const dynamoItems = dynamoData.Items || [];

        const swapiItems = await fetchAllFromSwapi('starships');
        const translatedSwapiItems = swapiItems.map(starship => translateKeys(starship, 'starships'));

        const allStarships = [...dynamoItems, ...translatedSwapiItems];
        return allStarships;
    }
}

module.exports = StarshipService;