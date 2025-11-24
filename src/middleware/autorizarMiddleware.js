// Middleware para controlar los roles de los usuarios
export const autorizar = (...rolesPermitidos) => {
  return (req, res, next) => {
    // Primero reviso si req.user existe, lo pone el middleware de autenticación
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    // Verifico si el rol del usuario está dentro de los roles permitidos para esta ruta
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para esta acción" });
    }

    // Si todo está bien, dejo que la ruta siga ejecutándose
    next();
  };
};
