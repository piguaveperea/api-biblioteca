const { DB_BIBLIOTECA } = require('../database')
const { DataTypes } = require('sequelize')

const Computadora = DB_BIBLIOTECA.define('computadora',{
    biblioteca_id: DataTypes.INTEGER,
    sistema_operativo: DataTypes.STRING,
    ocupado: DataTypes.INTEGER,
    memoria_ram: DataTypes.INTEGER,
    estado: DataTypes.STRING
})

module.exports = Computadora