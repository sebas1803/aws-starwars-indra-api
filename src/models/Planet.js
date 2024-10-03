const { v4: uuidv4 } = require('uuid');

class Planet {
    constructor({ nombre, rotation_period, orbital_period, diametro, clima, gravedad, terreno, superficie_agua, poblacion, residentes, peliculas, id = null, fecha_creacion = null, fecha_edicion = null }) {
        this.id = id || uuidv4();
        this.nombre = nombre;
        this.rotation_period = rotation_period;
        this.orbital_period = orbital_period;
        this.diametro = diametro;
        this.clima = clima;
        this.gravedad = gravedad;
        this.terreno = terreno;
        this.superficie_agua = superficie_agua;
        this.poblacion = poblacion;
        this.residentes = residentes;
        this.peliculas = peliculas;
        this.fecha_creacion = fecha_creacion || new Date().toISOString();
        this.fecha_edicion = fecha_edicion || new Date().toISOString();
        this.url = "No URL";
    }

    static fromRequestBody(body) {
        return new Planet(body);
    }
}

module.exports = Planet;
