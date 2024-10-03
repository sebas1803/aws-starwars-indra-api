const { v4: uuidv4 } = require('uuid');

class StarWarsCharacter {
    constructor({ nombre, altura, masa, genero, color_cabello, color_piel, color_ojo, año_nacimiento, planeta_natal, peliculas, especies, vehiculos, naves_espaciales, id = null, fecha_creacion = null, fecha_edicion = null }) {
        this.id = id || uuidv4();
        this.nombre = nombre;
        this.altura = altura;
        this.masa = masa;
        this.color_cabello = color_cabello;
        this.color_piel = color_piel;
        this.color_ojo = color_ojo;
        this.año_nacimiento = año_nacimiento;
        this.genero = genero;
        this.planeta_natal = planeta_natal;
        this.peliculas = peliculas;
        this.especies = especies;
        this.vehiculos = vehiculos;
        this.naves_espaciales = naves_espaciales;
        this.fecha_creacion = fecha_creacion || new Date().toISOString();
        this.fecha_edicion = fecha_edicion || new Date().toISOString();
        this.url = "No URL";
    }

    static fromRequestBody(body) {
        return new StarWarsCharacter(body);
    }
}

module.exports = StarWarsCharacter;
