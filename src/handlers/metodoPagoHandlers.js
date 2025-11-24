import {
  createMetodoPagoController,
  getAllMetodoPagoController,
  getMetodoPagoByIdController,
  getMetodoPagoByNameController,
  updateMetodoPagoController,
  restoreMetodoPagoController,
  deleteMetodoPagoController,
  deleteSoftMetodoPagoController,
} from "../controllers/metodoPagoControllers.js";
import { validate } from "../validations/validators.js";

/* --- Crear Metodo Pago --- */
export const createMetodoPagoHandler = async (req, res, next) => {
  try {
    // Validación de datos según tu sistema
    const validatedData = validate("metodoPago", req.body);

    const response = await createMetodoPagoController(validatedData);

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Traer Todos --- */
export const getAllMetodoPagoHandler = async (req, res, next) => {
  try {
    const response = await getAllMetodoPagoController();

    res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Buscar por Id --- */
export const getMetodoPagoByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await getMetodoPagoByIdController(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Buscar Por Nombre  --- */
export const getMetodoPagoByNameHandler = async (req, res, next) => {
  try {
    const { nombre } = req.query;

    const response = await getMetodoPagoByNameController(nombre);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Actulizar  Meto de Pago --- */
export const updateMetodoPagoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validatedData = validate("metodoPago", req.body);

    const response = await updateMetodoPagoController(id, validatedData);

    res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Restaurar Meto de Pago --- */
export const restoreMetodoPagoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await restoreMetodoPagoController(id);

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Delete --- */
export const deleteMetodoPagoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await deleteMetodoPagoController(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Soft Delete --- */
export const deleteSoftMetodoPagoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await deleteSoftMetodoPagoController(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
