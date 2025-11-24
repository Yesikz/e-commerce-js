import Usuario from "../models/Usuarios.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    dni,
    fechaNacimiento,
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

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(contraseña, 10);

  // Creación del usuario
  const newUser = new Usuario({
    nombre,
    nombreUsuario,
    email,
    contraseña: hashedPassword,
    telefono,
    dni,
    fechaNacimiento,
    activo,
    rol,
    direccion,
  });

  await newUser.save();

  return {
    success: true,
    message: "Usuario creado exitosamente",
    data: newUser,
  };
};

/* =======================================================
 * LECTURA: Controladores de lectura de usuarios
 * =======================================================
 * - getAllUsersController: recupera todos los usuarios registrados en la DB
 * - getAllUsersStatsController: obtiene estadísticas generales de usuarios"
 * - getUserByIdController: obtiene un usuario según su ID
 * - getUsersByEmailController obtiene un usuario según su Email
 * - getUserByNameController: busca usuarios que coincidan con un nombre específico
 * - getUsersByRolController: obtiene todos los usuarios según su rol ('user' o 'admin')
 * - getUsersByStatusController: filtra usuarios por estado activo/inactivo (recibe 'true'/'false')
 *
 * En todos los casos:
 * - Si no se encuentran resultados, se lanza un error 404 (Not Found)
 * - Devuelven un mensaje de éxito junto con los datos encontrados
 */
export const getAllUsersController = async () => {
  const users = await Usuario.find();

  if (!users.length) {
    const err = new Error("No hay usuarios registrados");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Usuarios encontrados",
    data: users,
  };
};

export const getAllUsersStatsController = async () => {
  // Total de usuarios
  const total = await Usuario.countDocuments();

  // Usuarios activos e inactivos
  const active = await Usuario.countDocuments({ activo: true });
  const inactive = await Usuario.countDocuments({ activo: false });

  // Cantidad de admins y clientes
  const admins = await Usuario.countDocuments({ rol: "admin" });
  const users = await Usuario.countDocuments({ rol: "cliente" });

  if (total === 0) {
    const err = new Error("No hay usuarios registrados");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Estadísticas de usuarios obtenidas correctamente",
    data: { total, active, inactive, admins, users },
  };
};

export const getUserByIdController = async (id) => {
  // Validar que el ID sea un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de usuario no válido");
    err.status = 400;
    throw err;
  }

  const user = await Usuario.findById(id);

  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Usuario encontrado",
    data: user,
  };
};

export const getUsersByEmailController = async (email) => {
  const usersByEmail = await Usuario.find({ email });

  if (!usersByEmail.length) {
    const err = new Error(
      `No se encontró ningún usuario con el email: '${email}'`
    );
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Usuario(s) encontrado(s)",
    data: usersByEmail,
  };
};

export const getUsersByNameController = async (name) => {
  const usersByName = await Usuario.find({ nombre: name });

  if (!usersByName.length) {
    const err = new Error(
      `No se encontró ningún usuario con el nombre: '${name}'`
    );
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Usuario(s) encontrado(s)",
    data: usersByName,
  };
};

export const getUsersByRolController = async (role) => {
  if (role !== "admin" && role !== "cliente") {
    const err = new Error("El parámetro 'role' debe ser 'admin' o 'cliente'");
    err.status = 400;
    throw err;
  }

  const users = await Usuario.find({ rol: role });

  if (!users.length) {
    const err = new Error(`No se encontraron usuarios con rol '${role}'`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: `Usuarios con rol '${role}' encontrados`,
    data: users,
  };
};

export const getUsersByStatusController = async (isActive) => {
  // Validación y conversión a boolean
  if (typeof isActive === "string") {
    if (isActive !== "true" && isActive !== "false") {
      const err = new Error("El parámetro 'activo' debe ser 'true' o 'false'");
      err.status = 400;
      throw err;
    }
    isActive = isActive === "true";
  }

  // Filtrado por activo
  const users = await Usuario.find({ activo: isActive });

  return {
    success: true,
    message: users.length
      ? `Usuarios ${isActive ? "activos" : "inactivos"} encontrados`
      : `No se encontraron usuarios ${isActive ? "activos" : "inactivos"}`,
    data: users,
  };
};

/* =======================================================
 * UPDATE: Controladores de actualización de usuarios
 * =======================================================
 * - updateUserController: actualiza todos los campos de un usuario existente.
 * - updateUserStatusController: actualiza únicamente el estado activo/inactivo del usuario.
 *
 * Ambos controladores:
 * - Verifican la existencia del usuario por ID y lanzan error 404 si no existe.
 * - Devuelven un mensaje de éxito con el usuario actualizado.
 * - updateUserController aplica el hash de la contraseña automáticamente en el hook del modelo.
 */

export const updateUserController = async (id, userData) => {
  // Validar que el ID sea un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de usuario no válido");
    err.status = 400;
    throw err;
  }

  // Buscar usuario por ID
  const userById = await Usuario.findById(id);
  if (!userById) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  // Preparación de campos a actualizar (solo los permitidos)
  const updatedFields = {};

  if (userData.nombre) updatedFields.nombre = userData.nombre;
  if (userData.nombreUsuario)
    updatedFields.nombreUsuario = userData.nombreUsuario;
  if (userData.email) updatedFields.email = userData.email;

  // --- Hash de la contraseña ---
  if (userData.contraseña) {
    // Generar salt de bcrypt
    const salt = await bcrypt.genSalt(10);
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(userData.contraseña, salt);
    updatedFields.contraseña = hashedPassword;
  }

  if (userData.telefono) updatedFields.telefono = userData.telefono;
  if (userData.activo !== undefined) updatedFields.activo = userData.activo;
  if (userData.rol) updatedFields.rol = userData.rol;
  if (userData.direccion) updatedFields.direccion = userData.direccion;

  // Actualizar el usuario en la base de datos
  const userUpdate = await Usuario.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });

  /* ===== Respuesta ===== */
  return {
    success: true,
    message: "Usuario actualizado",
    data: userUpdate,
  };
};

export const updateUserStatusController = async (id, isActive) => {
  // Validación: ID válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de usuario no válido");
    err.status = 400;
    throw err;
  }

  // Validación: convertir string a boolean
  if (typeof isActive === "string") {
    if (isActive !== "true" && isActive !== "false") {
      const err = new Error("El parámetro 'activo' debe ser 'true' o 'false'");
      err.status = 400;
      throw err;
    }
    isActive = isActive === "true";
  }

  // Validación: existencia del usuario
  const user = await Usuario.findById(id);
  if (!user) {
    const err = new Error(`No se encontró el usuario con el ID '${id}'`);
    err.status = 404;
    throw err;
  }

  // Actualizar estado
  user.activo = isActive;
  await user.save();

  /* ===== Respuesta ===== */
  return {
    success: true,
    message: "Estado de usuario actualizado",
    data: user,
  };
};

/* =======================================================
 * DELETE: Controladores de eliminación de usuarios
 * =======================================================
 * - deleteUserController: elimina físicamente un usuario de la DB
 * - deleteSoftUserController: realiza un soft delete (marca el usuario como inactivo)
 * Ambas funciones validan la existencia del usuario y manejan errores con status code
 */

export const deleteUserController = async (id) => {
  // Validación: ID válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de usuario no válido");
    err.status = 400;
    throw err;
  }

  // Buscar usuario por ID
  const user = await Usuario.findById(id);
  if (!user) {
    const err = new Error(`Usuario con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  // Eliminación permanente
  await Usuario.findByIdAndDelete(id);

  /* ===== Respuesta ===== */
  return {
    success: true,
    message: `Usuario con ID '${id}' eliminado exitosamente`,
    data: user,
  };
};

export const deleteSoftUserController = async (id) => {
  // Validación: ID válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de usuario no válido");
    err.status = 400;
    throw err;
  }

  // Buscar usuario por ID
  const user = await Usuario.findById(id);
  if (!user) {
    const err = new Error(`Usuario con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  // Verificar si ya está inactivo
  if (!user.activo) {
    const err = new Error(`El usuario con ID '${id}' ya ha sido eliminado`);
    err.status = 400;
    throw err;
  }

  // Soft delete
  user.activo = false;
  await user.save();

  /* ===== Respuesta ===== */
  return {
    success: true,
    message: `Usuario con ID '${id}' eliminado (soft delete)`,
    data: user,
  };
};
