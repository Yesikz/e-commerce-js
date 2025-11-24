import jwt from "jsonwebtoken";

// Middleware para proteger rutas
export const autenticar = (req, res, next) => {
  // Primero tomo el header Authorization
  const authHeader = req.headers.authorization;

  // Si no existe o no empieza con "Bearer ", devuelvo un 401
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No se proporcionó token" });
  }

  // Extraigo el token quitando "Bearer "
  const token = authHeader.split(" ")[1];

  // Me aseguro de que JWT_SECRET esté definido
  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "JWT_SECRET no definido en variables de entorno" });
  }

  try {
    // Verifico el token y lo decodifico
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardo la información del usuario en req.user para usarla después en el controller
    req.user = decoded;

    // Si todo está bien, paso al siguiente middleware o controller
    next();
  } catch (err) {
    // Si el token es inválido, devuelvo un 401
    return res.status(401).json({ message: "Token inválido" });
  }
};
