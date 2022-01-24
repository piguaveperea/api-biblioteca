const router = require('express').Router()
const { BibliotecaControlador } = require('../controllers')
router.get('/api/bibliotecas', BibliotecaControlador.listar)

module.exports = router