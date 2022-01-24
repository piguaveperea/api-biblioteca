const { DB_BIBLIOTECA } = require('../database/connection')
const { DataTypes } = require('sequelize')

const Rol = DB_BIBLIOTECA.define('rol',{
    rol:{
        type: DataTypes.STRING
    }
},{
    tableName: 'rol',
    createdAt: false,
    updatedAt: false
})

module.exports = Rol