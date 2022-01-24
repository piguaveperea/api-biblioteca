const { Usuario, Rol } = require('../models')
const { Op } = require('sequelize')
const { encryptPass, Email } = require('../utils')

const jwt = require('jsonwebtoken')


exports.verificarEstudiante = async(req, res)=>{
    const message = req.message
    const usuario = req.usuario
    if(usuario){
        res.status(200).json({
            usuario : usuario,
            message: message,
            successful:req.successful
        })
    }
    else{
        res.status(200).json({
            message: message,
            usuario: usuario,
            successful:  req.successful
        })
    }
}

exports.registrar = async(req, res)=>{
    const usuario = req.usuario
    const { cedula, nombres, apellidos, correo, clave  } = req.body
    if(usuario){
        const rol = await Rol.findOne({where:{rol: 'Estudiante'}})
        await Usuario.create({
            cedula: usuario.cedula, 
            nombres: usuario.nombres, 
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            clave: encryptPass.encrypt(clave),
            rol_id: rol.id
        }).then(()=>{
            Email.Registro(usuario.nombres, usuario.apellidos, usuario.cedula, usuario.correo, clave)
            res.json({
                message:'estudiante registrado correctamente'
            })
        })
        .catch(()=>{
            res.json({
                messsage: 'estudiante no registrado'
            })
        })
    }
    else{
        if(cedula, nombres, apellidos, correo, clave){
            const nuevo_usuario = await Usuario.findOne({where:{[Op.or]:[
                 {cedula:cedula},
                 {correo:correo}
            ]}})
            if(nuevo_usuario){
                res.json({
                    message: 'el usuario ya existe o  correo esta en uso'
                })
            }
            else{
                const rol = await Rol.findOne({where:{rol: 'Invitado'}})
                await Usuario.create(
                    {
                        cedula: cedula,
                        nombres: nombres,
                        apellidos: apellidos,
                        correo:correo,
                        clave: encryptPass.encrypt(clave),
                        rol_id:rol.id             
                    }
                )
                .then(()=>{
                    Email.Registro(nombres, apellidos, cedula, correo, clave)
                    res.json({
                        message: 'usuario creado correctamente'
                    })
                })
                .catch(()=>{
                    res.json({
                        message: 'el usuario no creado'
                    })
                })
               
            }
            
        }
        else{
            res.status(300).json({
                message: 'completar todo los campos'
            })
        }
    }
}

exports.iniciar = async(req, res)=>{
    const { usuario, clave } = req.body
    const usuario_n =  await Usuario.findOne({where:{[Op.or]:[
        {cedula:usuario},
        {correo:usuario}
    ]}})

    if(usuario_n){
        if(encryptPass.compare(clave, usuario_n.clave)){
            const token = await jwt.sign({usuario: usuario_n}, process.env.SECRET_KEY,{expiresIn: '7d'})
            res.status(200).json({
                message: 'inciar sesión correctamente',
                token: token
            })
        }
        else{
            res.status(204).json({
                message: 'no se puede iniciar sesión',
                description: 'contraseña incorrecta'
            })
        }
    }
    else{
        res.status(200).json({
            message: 'usuario no existente'
        })
    }
}

exports.recuperarCuenta = async (req, res) => {
    const { correo } = req.body
    const usuario = await Usuario.findOne({ where: {correo: correo}})
    const token = await jwt.sign({usuario:usuario}, process.env.SECRET_KEY,{expiresIn: '3m'})
    Email.RecuperarCuenta(correo, token)
}

exports.cambiarClave = async (req, res) => {
    const token  = req.params.token
    const clave = req.body.clave
    try {
        const usuario = jwt.verify(token, process.env.SECRET_KEY)
        await Usuario.update({clave: encryptPass.encrypt(clave) },{where:{id: usuario.usuario.id}})
        res.json({
            message: 'Operación realizada correctamente',
            description: 'Contraseña cambiada correctamente'
        })
    } catch (error) {
        res.json({
            message: 'No se puede hacer esta operación',
            description: 'Token invalido'
        })
    }
   

    
}