const express = require('express')
const router = express.Router()
const peliculaModel = require('../models/peliculaModel')
const verificarToken = require('../middlewares/auth');

//consultar
router.get('/', (req, res) => {
    peliculaModel.obtenerPeliculas((error, resultados) => {

        if (error) {
            res.status(500).send({ error: 'Error consultando las peliculas unu' })
        }
        else {
            res.json(resultados)
        }

    })
})
//crear
router.post('/', verificarToken,(req, res) => {
    const pelicula = req.body

    peliculaModel.crearPelicula(pelicula, (error, resultado) => {

        if (error) {
            res.status(500).send({ error: 'Error creando la pelicula' })
        }
        else {
            pelicula.id = resultado.insertId
            res.status(201).json(pelicula)
        }
    })
})
//actualizar
router.put('/:id', verificarToken,(req, res) => {
    const id = parseInt(req.params.id)

    const pelicula = req.body

    peliculaModel.actualizarPelicula(id, pelicula, (error, resultado) => {

        if (error) {
            res.status(500).send({ error: 'Error actualizando la pelicula' })
        }
        else {

            if (resultado.affectedRows === 0) {
                res.status(404).send({ error: 'Pelicula no encontrada' })
            }
            else {
                res.send({ msg: 'Pelicula actualizada correctamente' })
            }
        }

    })
})
//eliminar
router.delete('/:id', verificarToken,(req, res) => {
    const id = parseInt(req.params.id)

    peliculaModel.eliminarPelicula(id, (error, resultado) => {

        if (error) {
            res.status(500).send({ error: 'Error eliminando la pelicula' })
        }
        else {

            if (resultado.affectedRows === 0) {
                res.status(404).send({ error: 'Pelicula no encontrada' })
            }
            else {
                res.send({ msg: 'Pelicula eliminada correctamente' })
            }

        }

    })
})
module.exports = router
