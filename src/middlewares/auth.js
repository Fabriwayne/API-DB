const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mi-clave-super-secreta';

const verificarToken = (
    req,
    res,
    next
) => {

    const authHeader =
        req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            error: 'Token requerido'
        });

    }

    const token =
        authHeader.split(' ')[1];

    try {

        const usuario =
            jwt.verify(
                token,
                JWT_SECRET
            );

        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error)

        return res.status(403).json({
            error: 'Token inválido'
        });

    }

}

module.exports =
    verificarToken;