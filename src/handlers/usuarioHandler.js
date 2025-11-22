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

/* --- Crear --- */
export const createUserHandler = async (req, res, next) => {
  try {
    const validatedData = validate("usuario", req.body);
    const response = await createUserController(validatedData);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

/* --- Lectura --- */
export const getAllUsersHandler = async (req, res, next) => {
  try {
    const response = await getAllUsersController();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getAllUserStatsHandler = async (req, res, next) => {
  try {
    const response = await getAllUsersStatsController();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getUserByIdController(id);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getUsersByEmailHandler = async (req, res, next) => {
  try {
    const { email } = req.query;
    const response = await getUsersByEmailController(email);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getUsersByNameHandler = async (req, res, next) => {
  try {
    const { nombre } = req.query;
    const response = await getUsersByNameController(nombre);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getUsersByRoleHandler = async (req, res, next) => {
  try {
    const { rol } = req.query;
    const response = await getUsersByRolController(rol);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

/*--- Estados --- */
export const getUsersByStatusHandler = async (req, res, next) => {
  try {
    const { activo } = req.query;

    const response = await getUsersByStatusController(activo);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

/* UPdate */

export const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const response = await updateUserController(id, userData);

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateUserStatusHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const response = await updateUserStatusController(id, activo);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

/* --- Delete --- */
export const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteUserController(id);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const deleteSoftUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteSoftUserController(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
