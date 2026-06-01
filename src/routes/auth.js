const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mi-clave-super-secreta'

const usuarioModel = require('../models/usuarioModel');

router.post('/register', async (req, res) => {

    try {

        const usuario = req.body;

        const passwordHash = await bcrypt.hash(
            usuario.password,
            10
        );

        usuario.password = passwordHash;

        usuarioModel.crearUsuario(
            usuario,
            (error, resultado) => {

                if (error) {

                    return res.status(500).json({
                        error: 'Error creando usuario'
                    });

                }

                usuario.id = resultado.insertId;

                res.status(201).json({
                    id: usuario.id,
                    username: usuario.username
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            error: 'Error procesando contraseña'
        });

    }

});

router.post('/login', (req, res) => {

    const { username, password } = req.body;

    usuarioModel.buscarUsuarioPorUsername(
        username,
        async (error, resultados) => {

            if(error){

                return res.status(500).json({
                    error:'Error buscando usuario'
                });

            }

            if(resultados.length === 0){

                return res.status(404).json({
                    error:'Usuario no encontrado'
                });

            }

            const usuario =
                resultados[0];

            const passwordValida =
                await bcrypt.compare(
                    password,
                    usuario.password
                );

            if(!passwordValida){

                return res.status(401).json({
                    error:'Contraseña incorrecta'
                });

            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    username: usuario.username
                },
                JWT_SECRET,
                {
                    expiresIn:'1h'
                }
            );

            res.json({
                token
            });

        }
    );

});

module.exports = router;