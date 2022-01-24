const nodemailer = require('nodemailer')
require('dotenv').config()
const transporte = nodemailer.createTransport({
    service: 'gmail'
},{
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

exports.Registro = async (nombres, apelllidos, cedula, correo, clave)=>{
    await transporte.sendMail({
        from: ` "Biblioteca General 📕"<${process.env.biblioteca_email}>`,
        to: correo,
        subject: 'Gracias, registro completado correctamente',
        html: `
            <div>
                <h1>Hola ${nombres} ${apelllidos} </h1>
                <div>
                    <h3>Para iniciar sesión puedes usar</h3>
                    <p>${correo}</p>
                    <p>${cedula}</p>
                    <h3>Contraseña</h3>
                    <p>${clave}</p>
                </div>
                <h2>Muchas Gracias será un placer ayudarte 🤗</h2>
            </div>
        `
    })
    .then(()=>{
        console.log('correo enviado')
    })
    .catch(()=>{
        console.log('correo no enviado')
    })
}

exports.RecuperarCuenta = async(correo, token)=>{
    await transporte.sendMail({ 
        from: ` "Biblioteca General 📕"<${process.env.biblioteca_email}>`,
        to: correo,
        subject: 'Recuperar cuenta',
        html: `
            <div>
                <h1>El enlace caducara en 3 minutos </h1>
                <div>
                    <a href="http://localhost:5000/api/auth/cambiar_clave/${token}">Cambiar contraseña</a>
                </div>
                <h2>Muchas Gracias será un placer ayudarte 🤗</h2>
            </div>
        `
    })
    .then(()=>{
        console.log('correo enviado')
    })
    .catch(()=>{
        console.log('correo no enviado')
    })
}