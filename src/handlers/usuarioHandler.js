import {
  createUserController,
  /* Get */
  getAllUsersController,
  getAllUsersStatsController,
  getUserByIdController,
  getUsersByEmailController,
  getUsersByNameController,
  getUsersByRolController,
  getUsersByStatusController,
  /* Update */
  updateUserController,
  updateUserStatusController,
  /* Delete */
  deleteUserController,
  deleteSoftUserController,
} from "../controllers/usuarioController.js";

import { validate } from "../validations/validators.js";

/* --- Crear Usuario --- */
export const createUserHandler = async (req, res, next) => {
  try {
    // Validación de datos de entrada
    const validatedData = validate("usuario", req.body);

    // Delegamos la lógica al controller
    const response = await createUserController(validatedData);

    // Respuesta exitosa
    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasamos el error al middleware global
    next(err);
  }
};

/* --- Lectura --- */
export const getAllUsersHandler = async (req, res, next) => {
  try {
    // Llamada al controller que obtiene todos los usuarios
    const response = await getAllUsersController();

    // Respuesta estandarizada para el frontend
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Enviar error al middleware global
    next(err);
  }
};

/* --- Trae las estaditicas --- */
export const getAllUserStatsHandler = async (req, res, next) => {
  try {
    // Llamada al controller que obtiene las estadísticas
    const response = await getAllUsersStatsController();

    // Respuesta estandarizada para el frontend
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Buscar por id --- */
export const getUserByIdHandler = async (req, res, next) => {
  try {
    // Obtenemos el ID del usuario desde los parámetros de la URL
    const { id } = req.params;

    // Llamamos al controller que busca al usuario por ID
    const response = await getUserByIdController(id);

    // Respondemos con la información del usuario encontrada
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Si ocurre un error, devolvemos un JSON con status y mensaje
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

/* --- Buscar por email --- */
export const getUsersByEmailHandler = async (req, res, next) => {
  try {
    const { email } = req.query;

    // Validación de parámetro
    if (!email) {
      const err = new Error("El parámetro 'email' es obligatorio");
      err.status = 400;
      throw err;
    }

    // Lógica del controller
    const response = await getUsersByEmailController(email);

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};

/* --- Buscar por nombre --- */
export const getUsersByNameHandler = async (req, res, next) => {
  try {
    const { nombre } = req.query;

    // Validación de parámetro
    if (!nombre) {
      const err = new Error("El parámetro 'nombre' es obligatorio");
      err.status = 400;
      throw err;
    }

    // Lógica del controller
    const response = await getUsersByNameController(nombre);

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};

/* --- Buscar usuarios por rol --- */
export const getUsersByRoleHandler = async (req, res, next) => {
  try {
    const { rol } = req.query;

    // Validación del parámetro
    if (!rol) {
      const err = new Error("El parámetro 'rol' es obligatorio");
      err.status = 400;
      throw err;
    }

    // Lógica del controller
    const response = await getUsersByRolController(rol);

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};

/* --- Filtrar usuarios por estado (activo/inactivo) --- */
export const getUsersByStatusHandler = async (req, res, next) => {
  try {
    const { activo } = req.query;

    // Validación del parámetro
    if (activo === undefined) {
      const err = new Error("El parámetro 'activo' es obligatorio");
      err.status = 400;
      throw err;
    }

    // Llamada al controller
    const response = await getUsersByStatusController(activo);

    // Respuesta consistente
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};

/* --- Actualizar usuario --- */
export const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    // Llamada al controller
    const response = await updateUserController(id, userData);

    // Respuesta consistente
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};

/* --- Actualizar estado de usuario --- */
export const updateUserStatusHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    // Llamada al controller
    const response = await updateUserStatusController(id, activo);

    // Respuesta consistente para frontend
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};

/* --- Delete --- */
export const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await deleteUserController(id);

    // Respuesta consistente para el frontend
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};

/* --- Soft Delete --- */
export const deleteSoftUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await deleteSoftUserController(id);

    // Respuesta consistente para el frontend
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err); // Pasamos el error al middleware global
  }
};
