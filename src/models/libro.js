const { DB_BIBLIOTECA }  = require('../database/connection')
const { DataTypes } = require('sequelize')

const Libro = DB_BIBLIOTECA.define('libro',{
    biblioteca_id : DataTypes.INTEGER,
    categoria_id: DataTypes.INTEGER,
    codigo_barra: DataTypes.STRING,
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    editorial: DataTypes.STRING,
    pais: DataTypes.STRING,
    fecha: DataTypes.DATE,
    bloque: DataTypes. INTEGER,
    estanteria: DataTypes.INTEGER,
    nivel_estanteria: DataTypes.INTEGER,
    ocupado: DataTypes.INTEGER,
},{
    tableName: 'libro',
    updatedAt: false,
    createdAt: false
})

module.exports = Libro