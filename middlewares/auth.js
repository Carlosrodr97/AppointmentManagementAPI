import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Obtener el token del header Authorization
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token requerido' });
    } // Verificar que el header tenga el token

    const token = authHeader.split(' ')[1]; // El token viene en formato "Bearer TOKEN_VALUE"
    
    if (!token) {
      return res.status(401).json({ error: 'Token requerido' });
    } // Verificar que el token no esté vacío

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token

    req.user = decoded; // Agregar la información del usuario al request
    
    next(); // Continuar con el siguiente middleware o ruta
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    return res.status(500).json({ error: error.message });
  }
}

// Middleware para verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  } // Verificar que el usuario esté autenticado
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado, se requiere rol de administrador.' });
  } // Verificar que el usuario tenga el rol de administrador

  next(); // Continuar con el siguiente middleware o ruta
}