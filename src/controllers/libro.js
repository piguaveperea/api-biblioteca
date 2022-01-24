const { Libro, Registro_Libro } = require('../models')
const { Op } = require('sequelize')
const dataformat = require('date-format')


exports.buscar = async (req, res) => {
    const { texto, biblioteca } = req.body
    try {
        const libros = await Libro.findAll({
            where: {
                [Op.or]: [
                    {
                        titulo: {
                            [Op.like]: `%${texto}%`
                        }
                    }
                    ,
                    {
                        autor: {
                            [Op.like]: `%${texto}%`
                        }
                    }
                    ,
                    {
                        editorial: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        pais:{
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        codigo_barra: {
                            [Op.eq]: texto
                        },
                    }
                ],
                biblioteca_id: biblioteca
            }
        })
        if (libros) {
            res.json({
                message: 'operación realzada correctamente',
                libros: libros
            })
        }
        else {
            res.json({
                libros: libros
            })
        }
    } catch (error) {
       console.log(error.name)
       res.json({}) 
    }
    
}

exports.pedir = async (req, res) => {
    const { libro_id } = req.body
    const usuario = req.usuario
    const libro = await Libro.findOne({ where: { id: libro_id } })
    console.log (dataformat.asString('hh:mm:ss', new Date()))
    try {
        if (libro && libro.ocupado == false ) {
            if (usuario) {
                await Libro.update({ocupado: usuario.usuario.id},{where:{ id: libro.id }})
                await Registro_Libro.create({
                    biblioteca_id: libro.biblioteca_id,
                    libro_id: libro.id,
                    usuario_id: usuario.usuario.id,
                    fecha: dataformat.asString('yyyy-MM-dd', new Date()),
                    inicio: dataformat.asString('hh:mm:ss', new Date())
                })
                res.json({
                    message: 'operacion realizada correctamente'
                })
            }
            else {
                res.json({
                    message: 'No se puede realizar esta operación',
                    description: 'usuario no existente... 😥'
                })
            }
        }
        else {
            res.json({
                message: 'No se puede realizar esta operación',
                description: 'El libro actual esta en uso'
            })
        }
    } catch (error) {
        
    }
   
}

exports.regresa = async (req, res) => {
    const { libro_id } = req.body
    const usuario = req.usuario
    const libro = await Libro.findOne({ where: { id: libro_id } })  
    if (libro && libro.ocupado == usuario.usuario.id) {
        await Registro_Libro.update({final:dataformat.asString('hh:mm:ss', new Date())},{ where: {
            [Op.and]:[
                {
                    usuario_id : usuario.usuario.id
                },
                {
                    libro_id: libro.id
                },
                {
                    final: null
                }
            ]
        }})
        await Libro.update({ ocupado: 0 }, { where: { id: libro_id } })
            .then(() => {
                res.json({
                    message: 'Operación realizada correctamente'
                })
            })
            .catch(() => {
                res.status(404).json({
                    message: 'Ocurrio un error'
                })
            })
    }
    else {
        res.json({
            message: 'No se puede realizar esta operación',
            description: 'El usuario no es portador del libro o el libro no fue seleccionado correctamente'
        })
    }
}

