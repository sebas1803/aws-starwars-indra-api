const translationMap = {
    people: {
        name: "nombre",
        height: "altura",
        mass: "masa",
        hair_color: "color_cabello",
        skin_color: "color_piel",
        eye_color: "color_ojos",
        birth_year: "año_nacimiento",
        gender: "genero",
        homeworld: "planeta_natal",
        films: "peliculas",
        species: "especies",
        vehicles: "vehiculos",
        starships: "naves_espaciales",
        created: "fecha_creacion",
        edited: "fecha_edicion",
        url: "url",
    },
    starships: {
        name: "nombre",
        model: "modelo",
        manufacturer: "fabricante",
        cost_in_credits: "costo_en_creditos",
        length: "longitud",
        max_atmosphering_speed: "velocidad_atmosferica_maxima",
        crew: "tripulacion",
        passengers: "pasajeros",
        cargo_capacity: "capacidad_de_carga",
        consumables: "consumibles",
        hyperdrive_rating: "calificacion_de_hipervelocidad",
        MGLT: "MGLT",
        starship_class: "clase_nave",
        pilots: "pilotos",
        films: "peliculas",
        created: "fecha_creacion",
        edited: "fecha_edicion",
        url: "url",
    },
    planets: {
        name: "nombre",
        diameter: "diametro",
        rotation_period: "periodo_rotacion",
        orbital_period: "periodo_orbital",
        gravity: "gravedad",
        population: "poblacion",
        climate: "clima",
        terrain: "terreno",
        surface_water: "agua_superficial",
        residents: "residentes",
        films: "peliculas",
        created: "fecha_creacion",
        edited: "fecha_edicion",
        url: "url",
    },
};

function translateKeys(data, entityType) {
    const translatedData = {};
    const map = translationMap[entityType];

    for (const key in data) {
        const translatedKey = map[key] || key;
        translatedData[translatedKey] = data[key];
    }

    return translatedData;
}

module.exports = {
    translateKeys,
};
