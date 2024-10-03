const StarWarsCharacter = require('../models/StarWarsCharacter');
const Planet = require('../models/Planet');
const Starship = require('../models/Starship');

module.exports = {
    createTestCharacter() {
        return new StarWarsCharacter({
            id: '86b83b73-4694-49d7-b6c4-c65c56d97432',
            nombre: 'Luke Skywalker',
            altura: '172',
            masa: '77',
            genero: 'masculino',
            color_cabello: 'rubio',
            color_piel: 'claro',
            color_ojo: 'azul',
            año_nacimiento: '19BBY',
            planeta_natal: 'https://swapi.py4e.com/api/planets/1/',
            peliculas: ['https://swapi.py4e.com/api/films/1/'],
            especies: ['https://swapi.py4e.com/api/species/1/'],
            vehiculos: ['https://swapi.py4e.com/api/vehicles/14/'],
            naves_espaciales: ['https://swapi.py4e.com/api/starships/12/'],
            fecha_creacion: '2024-01-01T00:00:00.000Z',
            fecha_edicion: '2024-01-01T00:00:00.000Z'
        });
    },

    createTestPlanet() {
        return new Planet({
            id: 'db0dbdd9-5513-4f4c-93ba-12c316dc7f66',
            nombre: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diametro: '10465',
            clima: 'árido',
            gravedad: '1 estándar',
            terreno: 'desierto',
            superficie_agua: '1',
            poblacion: '200000',
            residentes: ['https://swapi.py4e.com/api/people/1/'],
            peliculas: ['https://swapi.py4e.com/api/films/1/'],
            fecha_creacion: '2024-01-01T00:00:00.000Z',
            fecha_edicion: '2024-01-01T00:00:00.000Z'
        });
    },

    createTestStarship() {
        return new Starship({
            id: 'e5e4c3b1-7d4f-4f5d-8b6e-9e1a9c4f5f3b',
            nombre: 'Millennium Falcon',
            modelo: 'YT-1300 light freighter',
            fabricante: 'Corellian Engineering Corporation',
            costo_en_creditos: '100000',
            longitud: '34.37',
            velocidad_atmosferica_maxima: '1050',
            tripulacion: '4',
            pasajeros: '6',
            capacidad_de_carga: '100000',
            consumibles: '2 months',
            calificacion_de_hipervelocidad: '0.5',
            MGLT: '75',
            clase_nave: 'Light freighter',
            pilotos: ['https://swapi.py4e.com/api/people/13/'],
            peliculas: ['https://swapi.py4e.com/api/films/1/'],
            fecha_creacion: '2024-01-01T00:00:00.000Z',
            fecha_edicion: '2024-01-01T00:00:00.000Z'
        });
    }
};
