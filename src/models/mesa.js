const { DB_BIBLIOTECA } = require('../database')

const  Mesa = DB_BIBLIOTECA.define('computadora',{
    
},{
    tableName: 'mesa',
    createdAt: false,
    updatedAt: false
})

module.exports =Mesa