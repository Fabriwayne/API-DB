
const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

const peliculasRoutes = require('./routes/peliculas')

app.use('/peliculas', peliculasRoutes)

app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})

