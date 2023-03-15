const mysql = require('mysql2/promise');
const connection = mysql.createPool({
host: 'localhost',
user: 'root',
password: '',
database: 'enikio'
});


//coordenadas de universidad seleccionada

//query de localización para la universidad seleccionada

//Para que muestre los aptos de arrendador en especifico
async function traerAptoArrendador(id_arrendador) {
const result = await connection.query('SELECT * FROM aptos WHERE id_arrendador = ?',id_arrendador);
return result[0];
}

//En el mapa solo mostrará aquellos  que tienen hab_disponibles.  - Se tiene presente para el query de localizacion
//- ** este realmente dependerá de la U que se escoja, hay que ver como se hace lo de data
async function traerAptoMapa(hab_disponibles) {
    const result = await connection.query('SELECT * FROM aptos WHERE hab_disponibles != 0', hab_disponibles);
    return result[0];
    }

async function traerApto(id_apto) {
    const result = await connection.query('SELECT * FROM aptos WHERE id_apto =?', id_apto);
    return result[0];
    }

async function actualizarApto(id_apto, hab_disponibles) {
    const result = await connection.query('UPDATE productos SET hab_disponibles = ? WHERE id = ? ', [hab_disponibles, id_apto]);
    return result;
}

// solo admin x2 - **admin no manipula los aptos, lo haría arrendador, pero al final dijimos que no por el tema de que todo se hace con scrap en finca raiz"""""
async function borrarApto(id_apto) {
    const result = await connection.query('DELETE FROM aptos WHERE id= ?', id_apto);
    return result;
    }

module.exports = {
    traerAptoArrendador,
    traerApto,
    actualizarApto,
    borrarApto
};
