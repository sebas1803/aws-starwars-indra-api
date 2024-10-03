const { v4: uuidv4 } = require('uuid');

class Starship {
    constructor({ nombre, modelo, fabricante, costo_en_creditos, longitud, velocidad_atmosferica_maxima, tripulacion, pasajeros, capacidad_de_carga, consumibles, calificacion_de_hipervelocidad, MGLT, clase_nave, pilotos, peliculas, id = null, fecha_creacion = null, fecha_edicion = null }) {
        this.id = id || uuidv4();
        this.nombre = nombre;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.costo_en_creditos = costo_en_creditos;
        this.longitud = longitud;
        this.velocidad_atmosferica_maxima = velocidad_atmosferica_maxima;
        this.tripulacion = tripulacion;
        this.pasajeros = pasajeros;
        this.capacidad_de_carga = capacidad_de_carga;
        this.consumibles = consumibles;
        this.calificacion_de_hipervelocidad = calificacion_de_hipervelocidad;
        this.MGLT = MGLT;
        this.clase_nave = clase_nave;
        this.pilotos = pilotos;
        this.peliculas = peliculas;
        this.fecha_creacion = fecha_creacion || new Date().toISOString();
        this.fecha_edicion = fecha_edicion || new Date().toISOString();
        this.url = "No URL";
    }

    static fromRequestBody(body) {
        return new Starship(body);
    }
}

module.exports = Starship;