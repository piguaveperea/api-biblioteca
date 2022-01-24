const { Sequelize } = require('sequelize')


const  dbSiad = new Sequelize(
    process.env.DB_NAME_1,  
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)


const dbBiblioteca = new Sequelize(
    process.env.DB_NAME_2,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)

module.exports = {
    DB_SIAD: dbSiad,
    DB_BIBLIOTECA:dbBiblioteca
}