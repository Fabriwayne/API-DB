
const express = require("express")
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

const limiter = rateLimit({

    windowMs:
        15 * 60 * 1000,

    max: 100

});
app.use(limiter);

const peliculasRoutes = require('./routes/peliculas')
const authRoutes = require('./routes/auth');

app.use('/peliculas', peliculasRoutes)
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})

