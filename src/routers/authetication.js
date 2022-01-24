const router = require('express').Router()
const { AuthController} = require('../controllers')
const { verifyMiddleware } = require('../middlewares')

router.post('/api/auth/verificar_estudiante', verifyMiddleware.verificarEstudianteUTELVT ,  AuthController.verificarEstudiante)
router.post('/api/auth/registrar', verifyMiddleware.verificarEstudianteUTELVT, AuthController.registrar  )
router.post('/api/auth/iniciar', AuthController.iniciar)
router.post('/api/auth/recuperar', AuthController.recuperarCuenta)
router.post('/api/auth/cambiar_clave/:token', AuthController.cambiarClave)

module.exports = router 