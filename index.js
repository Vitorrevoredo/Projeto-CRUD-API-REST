const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Importando as rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// Rota inicial
app.get('/', (_, res) => {
    res.json({ message: 'Oi, express!' })
})

// Conexão com o MongoDB
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.0h1hfur.mongodb.net/?retryWrites=true&w=majority&appName=APICluster`
)
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))
