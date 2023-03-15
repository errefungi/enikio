const mysql = require('mysql2/promise');
const connection = mysql.createPool({
host: 'localhost',
user: 'root',
password: '',
database: 'enikio'
});

async function crearPostu(orden) {
const id_apto = orden.id_apto;
const cc_postulado = orden.cc_postulado;
const fecha = orden.fecha;
const ocupacion = orden.ocupacion;
const interes = orden.interes;
const aprobacion = orden.aprobacion;
const result = await connection.query('INSERT INTO postulaciones VALUES (?, ?, Now(), ?, ?, ?)', [id_apto, cc_postulado, fecha, ocupacion, interes, aprobacion]);
return result;
} 

async function postuPorApto(id_apto2) {
    const result = await connection.query('SELECT * FROM postulaciones WHERE ide_apto = ?', id_apto2);
    return result;
}

//falta meterle la columna de estado y asi mismo el query y la parte en controller que deje de mostrar aquellos que estan en "rezhazado"


module.exports = {
    postuPorApto,
    crearPostu
};
