const AWS = require('aws-sdk');
const Planet = require('../models/Planet');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { translateKeys } = require('../utils/translation');
const { fetchAllFromSwapi } = require('../utils/swapiFetcher');

const tableName = 'StarWarsPlanets';
const swapiBaseUrl = 'https://swapi.py4e.com/api';

class PlanetService {
    static async createPlanet(data) {
        const planet = Planet.fromRequestBody(data);
        const params = {
            TableName: tableName,
            Item: planet,
        };

        return dynamoDB.put(params).promise();
    }

    static async getPlanetById(id) {
        const params = {
            TableName: tableName,
            Key: { id },
        };

        const dynamoData = await dynamoDB.get(params).promise();

        if (dynamoData.Item) {
            return dynamoData.Item;
        }

        try {
            const swapiResponse = await axios.get(`${swapiBaseUrl}/planets/${id}/`);
            if (swapiResponse.status === 200) {
                const translatedData = translateKeys(swapiResponse.data, 'planets');
                return translatedData;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('Planeta no encontrado ni en DynamoDB ni en SWAPI.');
            }
            throw new Error('Error al buscar el planeta en SWAPI.');
        }
    }

    static async getAllPlanets() {
        const params = {
            TableName: tableName,
        };
        const dynamoData = await dynamoDB.scan(params).promise();
        const dynamoItems = dynamoData.Items || [];

        const swapiItems = await fetchAllFromSwapi('planets');
        const translatedSwapiItems = swapiItems.map(planet => translateKeys(planet, 'planets'));

        const allPlanets = [...dynamoItems, ...translatedSwapiItems];
        return allPlanets;
    }
}

module.exports = PlanetService;