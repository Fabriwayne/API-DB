const db = require('../db')
// Obtener las peliculas
const obtenerPeliculas = (callback) => {
    const sql = 'SELECT * FROM peliculas'

    db.query(sql, callback)
}
// Crear peliculas
const crearPelicula = (pelicula, callback) => {
    const sql = 'INSERT INTO peliculas(name, director,year,gender) VALUES (?, ?,?,?)'

    db.query(
        sql,
        [pelicula.name, pelicula.director, pelicula.year, pelicula.gender],
        callback
    )
}
// Actualizar Peliculas 
const  actualizarPelicula = (id, pelicula, callback)  => {
    const sql = 'UPDATE peliculas SET name = ?, director = ?, year = ?, gender = ? WHERE id = ?'

    db.query(
        sql, 
        [pelicula.name, pelicula.director, pelicula.year,pelicula.gender, id], 
        callback
    )
}
// Eliminar Peliculas
const eliminarPelicula = (id, callback) => {
    const sql = 'DELETE FROM peliculas WHERE id = ?'

    db.query(
        sql, 
        [id], 
        callback
    )
}
module.exports = {
    obtenerPeliculas,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula
}