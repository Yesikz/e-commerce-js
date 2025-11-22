import Usuario from "../models/Usuarios.js";
/* =======================================================
 * CREATE: Controlador de crear usuario
 * =======================================================
 * Verifica que el email exista
 * Si no existe, crea el usuario en la base de datos
 * Devuelve un mensaje de confirmación y los datos del usuario creado
 */
export const createUserController = async (userData) => {
  const {
    nombre,
    nombreUsuario,
    email,
    contraseña,
    telefono,
    activo,
    rol,
    direccion,
  } = userData;

  // Validación: verificar si el usuario ya existe [email]
  const userExist = await Usuario.findOne({ email });
  if (userExist) {
    const err = new Error("Usuario ya registrado");
    err.status = 409;
    throw err;
  }

  /*  ===== Creación del usuario =====  */
  const newUser = new Usuario({
    nombre,
    nombreUsuario,
    email,
    contraseña,
    telefono,
    activo,
    rol,
    direccion,
  });

  await newUser.save();

  /* ===== Respuesta ===== */
  return {
    message: "Usuario creado exitosamente",
    user: newUser,
  };
};
