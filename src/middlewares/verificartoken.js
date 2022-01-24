const jwt = require('jsonwebtoken')

exports.verificar = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    try {
      req.usuario = await jwt.verify(bearerToken, process.env.SECRET_KEY)
      next(); 
    } catch (error) {
      if(error.name === 'JsonWebTokenError'){
          res.status(500).json({
            message: 'token invalido'
          })
      }
    }
    
  } else {
    res.json({
      message: 'No se puede hacer esta operación',
      description: 'usuario no encontrado. Registrate o inicia sesión. Gracias 😊'
    });
  }
}