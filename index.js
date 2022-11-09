//dependencies
//have to run npm i dotenv, express, mongoose
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

//configuration
const app = express()
//accesses the PORT from the .env file
const PORT = process.env.PORT

//middleware
app.use(express.json())

//controller router
app.use(`/books`, require(`./book-controller`))

//routes
app.get(`/`, (req, res) => {
    res.send('Hello world')
})

//configures mongoose/mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)
//listen, keeps local server open
app.listen(PORT)