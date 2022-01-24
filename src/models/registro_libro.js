const { DB_BIBLIOTECA } = require('../database')
const { DataTypes } = require('sequelize')

const Registrar_Libro = DB_BIBLIOTECA.define('registro_libro', {
    biblioteca_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    libro_id: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    inicio: DataTypes.TIME,
    final: DataTypes.TIME
},{
    tableName: 'registro_libro',
    createdAt:false,
    updatedAt: false
})

module.exports = Registrar_Libro