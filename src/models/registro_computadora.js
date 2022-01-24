const { DB_BIBLIOTECA } = require('../database')
const { DataTypes } = require('sequelize')

const Registro_Computadora = DB_BIBLIOTECA.define('registro_computadora',{
    biblioteca_id: DataTypes.INTEGER,
    computadora_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    incio: DataTypes.TIME,
    final: DataTypes.TIME
},{
    tableName: 'registro_computadora',
    updatedAt: false,
    createdAt: false
})

module.exports = Registro_Computadora