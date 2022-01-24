const {  Biblioteca } = require('../models')


exports.listar = async (req, res)=>{
    const bibliotecas = await  Biblioteca.findAll()
    res.status(200).json({
        message: 'operación realizada correctamente',
        bibliotecas: bibliotecas
    })
}