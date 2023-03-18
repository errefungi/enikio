const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    port: 3307,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enkio'
});

//para que los vea el admin. Al admin no le importan los postulados como tal.
async function traerUsuarios() {
    const result = await connection.query('SELECT * FROM usuarios WHERE rol = "arrendador"');
    return result[0];
}

//Para auto-fill de postulaciones si es que existe el usuario, buscarlo con la cc.
async function traerUsuario(cc) {
    const result = await connection.query('SELECT * FROM usuarios WHERE cc = ? ', cc);
return result;
}


async function validarUsuario(email, password) {
    const result = await connection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
return result[0];
}

//Para que admin cree usuarios. Crea arrendadores, los usuarios que buscan apto no tienen usuario de login. 
async function crearUsuario(cc, nombre, email, password, celular) {
    const result = await connection.query('INSERT INTO usuarios VALUES(?,?,?,?, "arrendador")', [cc, nombre, email, password, celular]);
return result;
}

//Para que admin borre usuario de acuerdo a cc. DEBERIA PODER BORRAR AL INSTANTE TODOS LOS APTOS RELACIONADOS
async function borrarUsuario(cc) {
    const result = await connection.query('DELETE FROM usuarios WHERE cc = ?', cc);
    const result2 = await connection.query('DELETE FROM aptos WHERE id_arrendador = ?', cc);
return ("hecho");
}

//Para que cuando el postulado meta su info, ya esté su rol definido. 
async function crearPostulado(cc, nombre, email, password, celular) {
    const result = await connection.query('INSERT INTO usuarios VALUES(?,?,?,?,"postulado")', [cc, nombre, email, password, celular]);
return result;
}

module.exports = {
    traerUsuarios, traerUsuario, validarUsuario, crearUsuario, crearPostulado, borrarUsuario
};
