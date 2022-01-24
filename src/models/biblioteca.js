const { DB_BIBLIOTECA }  = require('../database/connection')
const { DataTypes } = require('sequelize')

const Biblioteca = DB_BIBLIOTECA.define('biblioteca',{
    campus: DataTypes.STRING,
    ubicacion: DataTypes.STRING
},{
    tableName: 'biblioteca',
    updatedAt: false,
    createdAt: false
})

module.exports = Biblioteca