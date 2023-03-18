const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    port: 3307,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enkio'
});

async function crearPostulacion(id_apto, cc_postulado, ocupacion, interes) {
    const result = await connection.query('INSERT INTO postulaciones VALUES (?, ?, Now(), ?, ?, "pendiente")', [id_apto, cc_postulado, ocupacion, interes]);
    return result;
}

async function postuPorApto(id_apto2) {
    const result = await connection.query('SELECT * FROM postulaciones WHERE ide_apto = ?', id_apto2);
    return result;
}

async function getPostulaciones(id) {
    const result = await connection.query('SELECT cc_postulado, fecha, ocupacion, interes, estado FROM postulaciones WHERE id_apto = ?', id);
    return result[0];
}

//falta meterle la columna de estado y asi mismo el query y la parte en controller que deje de mostrar aquellos que estan en "rezhazado"


module.exports = {
    postuPorApto,
    crearPostulacion,
    getPostulaciones
};
