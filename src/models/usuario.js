const { DB_BIBLIOTECA } = require('../database/connection')
const { DataTypes } = require('sequelize')
const Usuario = DB_BIBLIOTECA.define('usuario',{
    cedula:{
        type: DataTypes.STRING
    },
    nombres:{
        type: DataTypes.STRING
    },
    apellidos:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    clave:{
        type: DataTypes.STRING
    },
    facultad:{
        type: DataTypes.STRING
    },
    carrera:{
        type: DataTypes.STRING
    },
    rol_id:{
        type: DataTypes.INTEGER
    }
},{
    tableName: 'usuario',
    createdAt: false,
    updatedAt: false
})

module.exports = Usuario