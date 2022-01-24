'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { LibroRuta, AuthRuta, BibliotecaRuta, UsuarioRuta} = require('./routers')
const cors = require('cors')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use(AuthRuta)
app.use(LibroRuta)
app.use(BibliotecaRuta)
app.use(UsuarioRuta)

app.use(function(err, req, res, next){
    if(err){
        res.json({
            message: err.name
        })
    }
})

const port = process.env.PORT || 3000

server.listen(port, ()=>{
    console.log(`Listen to port: ${port}`)
})
