const { DB_SIAD } = require('../database/connection')
const { DataTypes } = require('sequelize')
const Estudiante = DB_SIAD.define('estudiante',{
    cedula:{
        type: DataTypes.STRING
    },
    nombres :{
        type: DataTypes.STRING
    },
    apellidos:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    }
},{
    tableName: 'estudiante',
    createdAt: false,
    updatedAt: false
})

module.exports = Estudiante