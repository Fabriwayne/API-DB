const db = require('../db');

const crearUsuario = (usuario, callback) => {

    const sql = `
        INSERT INTO usuarios(username, password)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            usuario.username,
            usuario.password
        ],
        callback
    );
}

const buscarUsuarioPorUsername = (
    username,
    callback
) => {

    const sql =
        'SELECT * FROM usuarios WHERE username = ?';

    db.query(
        sql,
        [username],
        callback
    );

}

module.exports = {
    crearUsuario,
    buscarUsuarioPorUsername
}