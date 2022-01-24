const router = require('express').Router()
const { UsuarioControlador } = require('../controllers')
const { verificarToken } = require('../middlewares')
router.get('/api/user', verificarToken.verificar, UsuarioControlador.profile)

module.exports = router 