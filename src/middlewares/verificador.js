const { Estudiante, Usuario } = require('../models')
const { Op } = require('sequelize')

exports.verificarEstudianteUTELVT = async (req, res, next) => {
    const { cedula } = req.body
    const estudiante = await Estudiante.findOne({ where: { cedula: cedula } })
    if (estudiante) {
        const usuario = await Usuario.findOne({where:{[Op.or]:[
            {cedula: estudiante.cedula},
            {correo: estudiante.correo}
        ]}})
        if (usuario) {
            req.message = 'El estudiante ya posse una cuenta'
            req.usuario = null
            req.successful= true
            next()
        }
        else {
            req.message = 'usuario encontrado'
            req.usuario = estudiante
            req.successful = true
            next()
        }
    }
    else {
        req.message = 'usuario no encontrado'
        req.successful = true
        req.usuario = null
        next()
    }
}