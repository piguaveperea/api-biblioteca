const  router = require('express').Router()
const { LibroContolador } = require('../controllers')
const { verificarDia, verificarHora, verificarToken, ErrorHandler }  = require('../middlewares')

router.post('/api/libro/buscar', LibroContolador.buscar)
router.post('/api/libro/pedir', [verificarToken.verificar, verificarDia.verificar, verificarHora.verificar], LibroContolador.pedir)
router.post('/api/libro/regresar', [ verificarToken.verificar, /*verificarDia.verificar,verificarHora.verificar*/], LibroContolador.regresa)

module.exports = router