import jwt from "jsonwebtoken";

// Función para generar un token JWT
export const generarToken = (payload) => {
  // Primero me aseguro de que JWT_SECRET esté definido en las variables de entorno
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET no definido");

  // También verifico que la duración del token esté definida
  if (!process.env.JWT_EXPIRES_IN)
    throw new Error("JWT_EXPIRES_IN no definido");

  // Genero el token usando el payload que me pasan
  // El token se firma con JWT_SECRET y expira según JWT_EXPIRES_IN
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
