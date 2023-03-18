const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    port: 3307,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enkio'
});


//coordenadas de universidad seleccionada

//query de localización para la universidad seleccionada

//Para que muestre los aptos de arrendador en especifico
async function traerAptoArrendador(id_arrendador) {
    const result = await connection.query('SELECT * FROM aptos WHERE id_arrendador = ?', id_arrendador);
    return result[0];
}

//En el mapa solo mostrará aquellos  que tienen hab_disponibles.  - Se tiene presente para el query de localizacion
//- ** este realmente dependerá de la U que se escoja, hay que ver como se hace lo de data
async function traerAptoMapa(hab_disponibles) {
    const result = await connection.query('SELECT * FROM aptos WHERE hab_disponibles > 2', hab_disponibles);
    return result[0];
}

async function traerApto(id_apto) {
    const result = await connection.query('SELECT * FROM aptos WHERE id_apto =?', id_apto);
    return result[0];
}

async function actualizarApto(id_apto, hab_disponibles) {
    const result = await connection.query('UPDATE aptos SET hab_disponibles = ? WHERE id_apto = ? ', [hab_disponibles, id_apto]);
    return result;
}

// solo admin x2 - **admin no manipula los aptos, lo haría arrendador, pero al final dijimos que no por el tema de que todo se hace con scrap en finca raiz"""""
async function borrarApto(id_apto) {
    const result = await connection.query('DELETE FROM aptos WHERE id= ?', id_apto);
    return result;
}

async function getPropiedadesArr(cc) {
    const result = await connection.query('SELECT id_apto, precio, cant_h, hab_disponibles, link FROM aptos WHERE id_arrendador = ? AND coord IS NOT NULL', cc);
    return result[0];
}

async function getCoords(name) {
    const result = await connection.query('SELECT coord from universidades where nombre = ?', name)
    return result[0];
}


async function getCloseAptos(coord) {
    const result = await connection.query(`SELECT   id_apto,   precio,   cant_h,   ROUND(ST_Distance_Sphere(coord, ST_GeomFromText('${coord}')) / 1000, 2) AS distance_km, link, coord FROM   aptos WHERE   ROUND(ST_Distance_Sphere(coord, ST_GeomFromText('${coord}'))) / 1000 <= 2 AND coord IS NOT NULL AND hab_disponibles > 0 ORDER BY distance_km ASC;`)
    return result[0];
}

async function getUniversidad() {
    const result = await connection.query('SELECT * from universidades')
    return result[0];
}


async function getMetrics() {
    const num_aptos = await connection.query('select count(*) as total from aptos')
    const num_postu = await connection.query('select count(*) as total from postulaciones')
    const hab_dispo = await connection.query('select count(*) as total from aptos WHERE hab_disponibles > 2')
    const resultado = {
        "num_aptos": num_aptos[0][0]["total"],
        "num_postu": num_postu[0][0]["total"],
        "aptos_over_2_hab_dispo": hab_dispo[0][0]["total"],
    };

    return resultado;
}

module.exports = {
    traerAptoArrendador,
    traerApto,
    actualizarApto,
    borrarApto,
    getPropiedadesArr,
    getCoords,
    getUniversidad,
    getMetrics,
    getCloseAptos
};
