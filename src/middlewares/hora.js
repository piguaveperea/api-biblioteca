const res = require("express/lib/response")
const dateformat = require('date-format')

const Abierto = "08:00:00"
const Cerrado = "16:00:00"

exports.verificar = (req, res, next) => {
    if (Cerrado < dateformat.asString('hh:mm:ss', new Date()) || Abierto > dateformat.asString('hh:mm:ss', new Date)) {
        res.status(200).json({
            message: 'No se puede realizar la operción',
            description: 'El horario de atención 8:00 a 16:00, Gracias 🤗'
        })
    }
    else{
        next()
    }
}