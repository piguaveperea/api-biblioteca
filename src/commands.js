'user strict'
require('dotenv').config()

const { program } = require('commander')
const { prompt } = require('inquirer')
const { Usuario, Rol } = require('./models')
const { encryptPass, Email } = require('./utils')



program.version('0.0.0.1').description('Herramienta de administración')

program.command('crear admin')
    .action(async () => {
        console.log(process.env.biblioteca_email)
        const admin = await prompt([
            {
                type: 'input',
                message: 'Ingresar nuemero de  cedula',
                name: 'cedula'
            },
            {
                type: 'input',
                message: 'Ingresar Nombre',
                name: 'nombres'
            },
            {
                type: 'input',
                message: 'Ingresar Apellido',
                name: 'apellidos'
            },
            {
                type: 'input',
                message: 'Ingresar correo electronico',
                name: 'correo'
            },
            {
                type: 'password',
                message: 'Ingresar contraseña',
                name: 'clave',
                mask: '*'
            }
        ])
        const usuario = await Usuario.findOne({ where: { cedula: admin.cedula } })
        if (usuario) {
            console.log('error: duplicidad de datos en correo o cedula')
        }
        else {
            const rol = await Rol.findOne({ where: { rol: 'administrador' } })
            await Usuario.create({
                cedula: admin.cedula,
                nombres: admin.nombres,
                apellidos: admin.apellidos,
                correo: admin.correo,
                clave: encryptPass.encrypt(admin.clave),
                rol_id: rol.id 
            })
            .then(()=>{
                Email.Registro(admin.cedula, admin.correo, admin.clave)
                console.log('administrador creado correctamente')
            })
            .catch(()=>{
                console.log("")
            })
        }
    });

program.command('listar')
    .action( async () => {
        const usuarios = await Usuario.findAll({where:{rol_id:1}})
        console.table(usuarios.map(usuario=>({
            id: usuario.id,
            cedula: usuario.cedula,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,   
            correo: usuario.correo
        })))
    })

program.parse(process.argv)